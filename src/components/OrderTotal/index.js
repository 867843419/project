import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import PropTypes from 'prop-types';
import './index.scss';

class OrderTotal extends Component {

    static propTypes = {
        total: PropTypes.number
    };
    
    static defaultProps = {
        total: 0
    };

    setPayClick = () => {
        this.props.onValue()
    }

    render () {
        const { total } = this.props;
        return (
            <View className='order-tatol'>
                <View className='tatol-l'>
                <Text>合计:</Text>
                <Text>￥{total.toFixed(2)}</Text>
                </View>
                <View className='tatol-r'>
                <View className='btn' onClick={this.setPayClick}>结算</View>
                </View>
            </View>
        )
    }
}

export default OrderTotal;

