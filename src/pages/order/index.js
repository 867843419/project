import Taro, { Component } from '@tarojs/taro';
import { View, Text,Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';
import { AtModal, AtLoadMore } from "taro-ui"

@connect(({ common, order }) => ({
  ...common,
  ...order,
}))
class Order extends Component {

  config = {
    navigationBarTitleText: '我的订单',
  };

  state = {
    orderType: [
      {
        type: 0,
        name: '全部',
      },
      {
        type: 1,
        name: '待支付',
        value:'waiting.payment'
      },
      {
        type: 2,
        name: '待发货',
        value:'waiting.delivery'
      },
      {
        type: 3,
        name: '待收货',
        value:'waiting.receive'
      },
      {
        type: 4,
        name: '待评价',
        value:'complete.receive'
      },
    ],
    activeTypeIndex: 0,
    cancelShow:false,
    cancelId:0,
    trueShow:false,
    trueId:0,
    loading:'loading',
    flag:true,
    list:[],
    noFlag:false
  };

  componentWillMount = () => {
    this.setState(
      {
        activeTypeIndex: this.$router.params.type,
      },
      ()=>{
        this.props.dispatch({
          type: 'order/page',
          payload:{
            userId:this.props.userId,
            page:1,
            rows:10,
            status:this.$router.params.type == 0 ? '' : this.state.orderType[this.$router.params.type].value
          },
          callback:(b)=>{
            if(b == 1){
              this.setState({
                loading:'noMore'
              })
            }
            this.setState({
              noFlag:true
            })
          }
        })
      }
    );
    
  };

  //切换订单状态
  toggleActiveType = e => {
    Taro.navigateTo({
      url: `/pages/order/index?type=${e.currentTarget.dataset.type}`
    });
  };


  //付款
  paymentClick(e,id){
    e.stopPropagation();
    Taro.navigateTo({
      url: `/pages/orderDetail/index?id=${id}`
    });
  }


  //评价
  evaluateClick(e,id){
    e.stopPropagation();
    Taro.navigateTo({
      url: `/pages/evaluate/index?id=${id}`
    });
  }


  //显示取消订单modal
  cancelClick(e,id){
    e.stopPropagation();
    this.setState({
      cancelShow:true,
      cancelId:id
    })
  }
  //取消订单
  handleCancelConfirm = () => {
    this.props.dispatch({
      type: 'order/change',
      payload:{
        customerId:this.props.userId,
        id:this.state.cancelId,
        cancelRemake:'取消订单',
        orderStatus:'cancel'
      },
      callback:() => {
        this.setState({
          cancelShow:false,
          cancelId:0
        })
        Taro.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 2000
        })
        .then(res => {
          this.props.dispatch({
            type: 'order/page',
            payload:{
              userId:this.props.userId,
              page:1,
              rows:10,
              status:this.$router.params.type == 0 ? '' : this.state.orderType[this.$router.params.type].value
            }
          })
        })
      }
    })
  }


  //显示确认收货modal
  trueClick = (e,id) => {
    e.stopPropagation();
    this.setState({
      trueShow:true,
      trueId:id
    })
  }
  //确认收货
  handleTrueConfirm = () => {
    this.props.dispatch({
      type: 'order/change',
      payload:{
        customerId:this.props.userId,
        id:this.state.trueId,
        cancelRemake:'确认收货',
        orderStatus:'complete.receive'
      },
      callback:() => {
        this.setState({
          trueShow:false,
          trueId:0
        })
        Taro.showToast({
          title: '确认成功',
          icon: 'success',
          duration: 2000
        })
        .then(res => {
          this.props.dispatch({
            type: 'order/page',
            payload:{
              userId:this.props.userId,
              page:1,
              rows:10,
              status:this.$router.params.type == 0 ? '' : this.state.orderType[this.$router.params.type].value
            }
          })
        })
      }
    })
  }

  //再次购买
  repurchaseClick = (e,id) => {
    e.stopPropagation();
    Taro.navigateTo({
      url: `/pages/orderDetail/index?id=${id}`
    });
  }

  //订单详情
  orderDetailClick = (id) => {
    Taro.navigateTo({
      url: `/pages/orderDetail/index?id=${id}&flag=true`
    })
  }

  //上拉加载
  onReachBottom() {
    const { orderType } = this.state;
    const { page, rows, totalPage } = this.props;
    if(totalPage == page){
      this.setState({
        flag:true,
        loading:'noMore'
      })
      return false
    }
    this.setState({
      flag:true
    },()=>{
      this.props.dispatch({
        type: 'order/page',
        payload:{
          userId:this.props.userId,
          page:page + 1,
          rows,
          status:this.$router.params.type == 0 ? '' : orderType[this.$router.params.type].value
        },
        callback:(b)=>{
          
        }
      })
    })
  }

  onCancel = () => {
    this.setState({
      cancelShow:false,
      trueShow:false
    })
  }

  render() {
    const { orderType, activeTypeIndex, flag, loading, noFlag } = this.state;
    const { url, list } = this.props;
    return (
      <View className="order-page">
        <View className="toggleType">
          {orderType.map((item, index) => (
            <View
              key={index}
              className={activeTypeIndex == index ? 'active item' : 'item'}
              data-type={item.type}
              onClick={this.toggleActiveType}
            >
              {item.name}
            </View>
          ))}
        </View>
        <View className="list">
          { list.length > 0 ? (
              list.map((item,index) => (
                <View className='empty' key={index} onClick={() => this.orderDetailClick(item.id)}>
                  <View className='empty-head'>
                    <Text className='a'>订单号：{item.orderId}</Text>
                    <Text 
                      className='b'
                    >
                    {
                      item.orderStatus == 'waiting.payment' ? '待支付' : 
                      item.orderStatus == 'waiting.delivery' ? '待发货' : 
                      item.orderStatus == 'waiting.receive' ? '待收货' : 
                      item.orderStatus == 'complete.receive' ? '待评价' : 
                      item.orderStatus == 'complete.comment' ? '已评价' : 
                      item.orderStatus == 'cancel' ? '已取消' : ''
                    }
                    </Text>
                  </View>
                  {
                    item.items.map((it,idx)=> (
                      <View className='empty-content' key={idx}>
                        <View className='img'>
                          <Image mode="widthFix" src={url + it.mainImg}/>
                        </View>
                        <View className='box'>
                            <Text className='a'>{it.spuName}</Text>
                            <Text className='b'>{it.skuName}</Text>
                        </View>
                        <View className='price'>
                            <Text className='a'>￥{it.displayPrice.toFixed(2)}</Text>
                            <Text className='b'>×{it.qty}</Text>
                        </View>
                      </View>
                    ))
                  }
                  <View className='total'>
                    <Text className='a'>共{item.productCount}件商品 订单合计：</Text>
                    <Text className='b'>¥ {item.productAmt.toFixed(2)}</Text>
                  </View>
                  {
                    item.orderStatus == 'waiting.payment' ? (
                      <View className='btns'>
                        <Text className='a' onClick={(e) => this.cancelClick(e,item.id)}>取消订单</Text>
                        <Text className='b' onClick={(e) => this.paymentClick(e,item.id)}>付款</Text>
                      </View>
                    ) : item.orderStatus == 'waiting.delivery' ? (
                      <View />
                    ) : item.orderStatus == 'waiting.receive' ? (
                      <View className='btns'>
                        <Text className='b' onClick={(e) => this.trueClick(e,item.id)}>确认收货</Text>
                      </View>
                    ) : item.orderStatus == 'complete.receive' ? (
                      <View className='btns'>
                        <Text className='a' onClick={(e) => this.repurchaseClick(e,item.id)}>再次购买</Text>
                        <Text className='b' onClick={(e) => this.evaluateClick(e,item.id)}>立即评价</Text>
                      </View>
                    ) : (
                      <View />
                    )
                  }
                </View>
              ))
            ) : noFlag ? <View className='no'>您还没有相关的订单</View> : null
          }
          {
            flag && list.length > 0 ? (
              <AtLoadMore
                status={loading}
              />
            ) : null
          }
        </View>

        <AtModal
          isOpened={this.state.cancelShow}
          title='确认取消订单？'
          cancelText='取消'
          confirmText='确认'
          onConfirm={ this.handleCancelConfirm }
          onCancel={ this.onCancel }
          content='您确认要取消此订单么？'
        />
        <AtModal
          isOpened={this.state.trueShow}
          title=''
          cancelText='取消'
          confirmText='确认收货'
          onConfirm={ this.handleTrueConfirm }
          onCancel={ this.onCancel }
          content='为保障你的退货权益，请收到货确认无误后 再确认收货！'
        />
      </View>
    );
  }
}

export default Order;
