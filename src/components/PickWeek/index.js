import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';
import './index.scss';


@connect(({ common }) => ({
    ...common
}))
class PickWeek extends Component {

    static propTypes = {
        list: PropTypes.array
    };
    
    static defaultProps = {
        list: []
    };

    gotoDetail = e => {
        Taro.navigateTo({
          url: `/pages/detail/index?id=${e.currentTarget.dataset.id}`,
        });
    };

    render() {
        const { list, url } = this.props;
        return (
            <View className="pick-week">
                <Text>热销商品</Text>
                <ScrollView
                    className='scrollview'
                    scrollX
                    scrollWithAnimation
                >
                {
                    list.data ? (
                        list.data.map((item,index) => (
                            <View 
                                className='scrollview-item'
                                data-id={item.id}
                                onClick={this.gotoDetail}
                                key={index}
                            >
                                <Image mode="widthFix" src={url + item.skus[0].image} className='scrollview-item-img'/>
                                <Text className='scrollview-item-text'>{item.name}</Text>
                                <View className='scrollview-item-box'>
                                <Text>￥{item.skus[0].salePrice.toFixed(2)}</Text>
                                {
                                    item.skus[0].marketPrice == item.skus[0].salePrice ? 
                                    (
                                        <Text></Text>
                                    )
                                    :
                                    (
                                        <Text>￥{item.skus[0].marketPrice.toFixed(2)}</Text>
                                    )
                                }
                                </View>
                            </View>
                        ))
                    ):null
                }
                </ScrollView>
            </View>
        )
    }
}


export default PickWeek;