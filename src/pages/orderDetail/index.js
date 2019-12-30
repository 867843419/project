import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';
import OrderList from '../../components/OrderList';
import OrderForm from '../../components/OrderForm';
import OrderTotal from '../../components/OrderTotal';

@connect(({common,order}) => ({
    ...common,
    ...order
}))
class OrderDetail extends Component {
    config = {
        navigationBarTitleText: '订单详情'
    };

    componentDidMount = () => {
        this.props.dispatch({
            type: 'order/detail',
            payload:{
                id:this.$router.params.id
            }
        })
    };

    totalClick = () => {
        const { detailList } = this.props;
        const list = [];
        detailList.items.forEach(item => {
            list.push({
                skuId: item.skuId,
                skuName: item.skuName,
                calNum: item.qty,
                salePrice: item.paidAmt
            })
        });
        this.props.dispatch({
            type: 'order/confirm',
            payload:{
                userId: this.props.userId,
                orderId:detailList.orderId,
                customerName:detailList.customerName,
                customerPhone:detailList.customerPhone,
                identity:detailList.identity,
                staff:detailList.staff,
                orderRemake:detailList.orderRemake,
                products: list
            },
            callback:(id)=> {
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
              }
        })
    }

    render() {
        const { detailList } = this.props;
        return (
        <View className="settlement-page">
            <OrderList list={detailList.items} />
            <View className='settlement-page-time'>
                <Text>预计到达时间</Text>
                <Text>一一一一一一网点</Text>
            </View>
            <OrderForm show={false} list={detailList}/>
            {
                !this.$router.params.flag ? (
                    <OrderTotal onValue={this.totalClick} total={detailList.productAmt} />
                ) : (
                    <View />
                )
            }
        </View>
        )
    }
}

export default OrderDetail;
