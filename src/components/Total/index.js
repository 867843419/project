import Taro, { Component } from '@tarojs/taro';
import { View, Text, Checkbox, Button } from '@tarojs/components';
import PropTypes from 'prop-types';
import './index.scss';

class Total extends Component {

    static propTypes = {
        list: PropTypes.array
    };
    
    static defaultProps = {
        list: []
    };

    onCheckChange = (e) => {
        this.props.onTotalClick(e.target.checked)
    }

    buy = () => {
        this.props.onPayClick();
    }

    render() {
        const { list } = this.props;
        let totalPrice = 0;
        let conut = 0;
        let num = []
        list.forEach(item => {
            if(item.isCheck == 1 && item.spuInfos.isSale == 1){
                num.push(item)
                totalPrice += item.spuInfos.skus[0].salePrice * item.num
                conut += 1
            }
        });
        return (
            <View className="total">
                <View className="bottom-count">
                    <View className="fj">
                        <View className='fj-left'>
                            <Checkbox className='checkbox-list' checked={ list.length == 0 || conut == 0 ? false : conut == list.length } onChange={this.onCheckChange}>全选</Checkbox>
                        </View>
                        <View className='fj-right'>
                            <View className='total'>
                                合计：
                                <Text className='disabled price'>
                                {totalPrice}
                                </Text>
                            </View>
                        <Button
                            className="cart-btn"
                            onClick={this.buy}
                        >
                            去结算({conut})
                        </Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


export default Total;