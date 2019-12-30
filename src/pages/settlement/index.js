import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';
import OrderList from '../../components/OrderList';
import OrderForm from '../../components/OrderForm';
import OrderTotal from '../../components/OrderTotal';

@connect(({common, cart, order}) => ({
  ...common,
  ...cart,
  ...order
}))
class Settlement extends Component {
  config = {
    navigationBarTitleText: '订单结算',
  };

  state = {
    payIndex:0,
    form:{
      name:'',
      phone:'',
      sfz:'',
      num:'',
      make:''
    }
  }

  componentDidMount = () => {
    
  };

  payList = [
    {
      name:'微信支付',
      img:`${require('../../images/icon/wx.png')}`,
      ion:`${require('../../images/icon/true.png')}`,
      noIon:`${require('../../images/icon/false.png')}`
    },
    {
      name:'银行卡支付',
      img:`${require('../../images/icon/zfb.png')}`,
      ion:`${require('../../images/icon/true.png')}`,
      noIon:`${require('../../images/icon/false.png')}`
    }
  ]

  payClick(index){
    this.setState({
      payIndex:index
    })
  }

  totalClick = () => {
    const { cartList, placeList, confirmList } = this.props;
    const { form } = this.state;
    const list = [];
    let orderId = 0;
    if(!this.$router.params.flag){
      placeList.items.forEach(item => {
        list.push({
          skuId: item.skuId,
          skuName: item.skuName,
          calNum: item.qty,
          salePrice: item.paidAmt
        })
      });
      orderId = placeList.orderId;
    }else{
      cartList.items.forEach(item => {
        list.push({
          skuId: item.skuId,
          skuName: item.skuName,
          calNum: item.qty,
          salePrice: item.paidAmt
        })
      });
      orderId = cartList.orderId;
    }
    if(form.name == '' || form.phone == '' || form.sfz == '' || form.num == ''){
      Taro.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    //校验手机号
    if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(form.phone))){
      Taro.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    //校验身份证
    if(!(/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/.test(form.sfz))){
      Taro.showToast({
        title: '请输入正确的身份证',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    this.props.dispatch({
      type: 'order/confirm',
      payload:{
        userId: this.props.userId,
        orderId,
        customerName:form.name,
        customerPhone:form.phone,
        identity:form.sfz,
        staff:form.num,
        orderRemake:form.make,
        products: list
      },
      callback:(id)=> {
        this.props.dispatch({
          type: 'order/pay',
          payload:{
            openId: this.props.userId,
            orderId,
          },
          callback:(payList)=> {
            Taro.requestPayment({
              timestamp: payList.timestamp,
              nonceStr: payList.nonceStr, 
              package: payList.package, 
              signType: 'MD5',
              paySign: payList.paySign,  
            })
            .then(res => {
              this.props.dispatch({
                type: 'order/change',
                payload:{
                  customerId:this.props.userId,
                  id,
                  cancelRemake:'支付订单',
                  orderStatus:'waiting.delivery'
                },
                callback:()=> {
                  Taro.navigateTo({
                    url: `/pages/order/index?type=${2}`
                  });
                }
              })
            })
            .catch(err => {
              Taro.navigateTo({
                url: `/pages/order/index?type=${1}`
              });
            })
          }
        })
        
      }
    })
  }

  handleChange = (value) => {
    this.setState({
      form:value
    })
  }

  render() {
    const { placeList, cartList } = this.props;
    const { payIndex } = this.state;
    return (
      <View className="settlement-page">
        <OrderList list={this.$router.params.flag ? cartList.items : placeList.items} />
        <View className='settlement-page-time'>
          <Text>预计到达时间</Text>
          <Text>预计3天内送达网点</Text>
        </View>
        <View className='settlement-page-pay'>
          <View className='a'>选择支付方式</View>
          {
            this.payList.map((item,index) => (
              <View className='b' key={index} onClick={() => this.payClick(index)}>
                <View className='b-l'>
                  <View className='b-l-ion'>
                    <Image mode="widthFix" src={item.img} />
                  </View>
                  <Text>{item.name}</Text>
                </View>
                <View className='b-r'>
                  <View className='b-r-ion'>
                    <Image mode="widthFix" src={payIndex == index ? item.ion : item.noIon} />
                  </View>
                </View>
              </View>
            ))
          }
        </View>
        <OrderForm handleChange={this.handleChange}/>
        <OrderTotal onValue={this.totalClick} total={this.$router.params.flag ? cartList.productAmt : placeList.productAmt}/>
      </View>
    )
  }
}

export default Settlement;
