import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View } from '@tarojs/components';
import ClothingsItem from '../../components/ClothingsItem';
import Total from '../../components/Total';
import './index.scss';


@connect(({ common, cart, order }) => ({
  ...order,
  ...common,
  ...cart,
}))
class Cart extends Component {
  config = {
    navigationBarTitleText: '购物车',
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'cart/page',
      payload:{
        userId:this.props.userId
      }
    });
  }

  onDeleteClick = (id) => {
    this.props.dispatch({
      type: 'cart/del',
      payload: {
        userId:this.props.userId,
        skuId:id
      }
    });
  }

  onCheckClick = (data) => {
    const { cartList } = this.props;
    this.props.dispatch({
      type: 'cart/updata',
      payload: {
        list:[
          {
            userId:this.props.userId,
            skuId:cartList[data.index].skuId,
            isCheck:data.check,
            num:0,
            catalog:cartList[data.index].catalog
          }
        ]
      },
      callback:()=>{}
    });
  }

  onNumClick = (data) => {
    const { cartList } = this.props;
    this.props.dispatch({
      type: 'cart/updata',
      payload: {
        list:[
          {
            userId:this.props.userId,
            skuId:cartList[data.index].skuId,
            isCheck:cartList[data.index].isCheck,
            num:data.num,
            catalog:cartList[data.index].catalog
          }
        ]
      },
      callback:()=>{}
    });
  }

  onTotalChange = (data) => {
    const flag = data ? 1 : 0;
    const { cartList } = this.props;
    const list = [];
    cartList.forEach(item => {
      if(item.spuInfos.isSale != 0){
        list.push({
          userId:this.props.userId,
          skuId:item.skuId,
          isCheck:flag,
          num:0,
          catalog:item.catalog
        })
      }
    });
    if(list.length > 0){
      this.props.dispatch({
        type: 'cart/updata',
        payload: {
          list
        },
        callback:()=>{}
      });
    }
  }

  onPayChange = () => {
      const { cartList } = this.props;
      if(cartList.length == 0){
        Taro.showToast({
          title: '购物车是空的哟，赶紧去选择您喜欢的商品吧',
          icon: 'none',
          duration: 2000
        })
        return false
      }
      const list = [];
      let flag = false;
      cartList.forEach(item => {
          if(item.isCheck == 1 && item.spuInfos.isSale != 0){
            list.push({
              skuId: item.skuId,
              skuName: item.spuInfos.name,
              calNum: item.num,
              salePrice: item.spuInfos.skus[0].salePrice
            })
            flag = true;
          }
      });
      if(flag){
        this.props.dispatch({
          type: 'order/place',
          payload:{
            userId: this.props.userId,
            products: list
          },
          callback:() => {
            Taro.navigateTo({
              url: '/pages/settlement/index',
            });
          }
        })
      }else{
        Taro.showToast({
          title: '请选择要购买的商品',
          icon: 'none',
          duration: 2000
        })
      }
  }

  render() {
    const { cartList } = this.props;
    return (
      <View className="cart-page">
        {
          cartList.length > 0 ? (
            <ClothingsItem
              list={cartList}
              onDeleteClothing={this.onDeleteClick}
              onCheckClothing={this.onCheckClick}
              onNumClothing={this.onNumClick}
            />
          ):(
            <View className='no'>空空如也！！！</View>
          )
        }
        <Total 
          list={cartList}
          onTotalClick={this.onTotalChange}
          onPayClick={this.onPayChange}
        />
      </View>
    );
  }
}

export default Cart;
