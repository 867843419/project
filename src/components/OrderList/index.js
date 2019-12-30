import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';
import './index.scss';

@connect(({ common }) => ({
    ...common
}))
class OrderList extends Component {

    static propTypes = {
        list: PropTypes.array
    };
    
    static defaultProps = {
        list: []
    };

    render() {
        const { list, url } = this.props;
        return (
            <View className="orderList">
                <View className='settlement-page-box'>
                    {
                        list.map((item,index) => (
                        <View className='settlement-page-box-list' key={index}>
                            <View className='settlement-page-box-list-left'>
                                <Image mode="widthFix" src={url + `${item.mainImg}`}/>
                            </View>
                            <View className='settlement-page-box-list-right'>
                                <View className='a'>
                                <View className='a-l'>{item.spuName}</View>
                                <View className='a-r'>
                                    <Text>￥{item.displayPrice.toFixed(2)}</Text>
                                    <Text>×{item.qty}</Text>
                                </View>
                                </View>
                                <View className='b'>
                                    {item.skuName}
                                </View>
                                <View className='c'>
                                    <Text>合计：</Text>
                                    <Text>￥{item.paidAmt.toFixed(2)}</Text>
                                </View>
                            </View>
                        </View>
                        ))
                    }
                </View>
            </View>
        )
    }
}


export default OrderList;