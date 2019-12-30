import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, Image } from '@tarojs/components';
import PropTypes from 'prop-types';
import './index.scss';
import { AtInputNumber } from 'taro-ui'

@connect(({ home, common }) => ({
    ...home,
    ...common
}))
class PurchaseList extends Component {

    static propTypes = {
        list: PropTypes.array,
        show: PropTypes.bool
    };
    
    static defaultProps = {
        list: [],
        show: false
    };

    state = {
        tabIndex:0,
        salePrice:0,
        stock:0,
        images:'',
        id:0,
        value: 1,
        num:1
    }

    componentWillReceiveProps = (props) => {
        const { list } = props;
        if(list.length > 0){
            this.setState({
                salePrice:list[0].salePrice,
                stock:list[0].stock,
                images:list[0].image,
                id:list[0].id
            })
        }
    }

    handleClick = (index,url,salePrice,stock,id) => {
        this.setState({
            tabIndex:index,
            salePrice,
            stock,
            images:url,
            id,
            value:1
        })
        this.props.onValue({
            id,
            num:this.state.num
        })
    }

    handleChange (value) {
        this.setState({
            value
        })
        this.props.onValue({
            num:value
        })
    }

    render() {
        const { list, show, url } = this.props;
        const { tabIndex, salePrice, stock, images } = this.state;
        return (
            <View className={["purchase-list", show ? 'hidden' : 'block']}>
                <View className='purchase-list-handImg'>
                    {
                        list.length > 0 ? (
                            <Image src={url + ( list[tabIndex].image )} />
                        ) : (
                            <Image src={url + images } />
                        )
                    }
                </View>
                <View className='purchase-list-handPice'>
                    {
                        list.length > 0 ? (
                            <View>
                                <Text className='a'>￥{ list[tabIndex].salePrice.toFixed(2) }</Text>
                                <Text className='b'>库存{ list[tabIndex].stock }件</Text>
                            </View>
                        ) : (
                            <View>
                                <Text className='a'>￥{salePrice.toFixed(2)}</Text>
                                <Text className='b'>库存{stock}件</Text>
                            </View>
                        )
                    }
                    <Text className='b'>选择规格</Text>
                </View>
                <View className='content'>
                    <View className='content-list'>
                        {
                            list.map((item,index) => (
                                <View 
                                    className={['content-list-dv' , tabIndex == index ? 'active' : '']}
                                    key={index}
                                    onClick={() => this.handleClick(index,item.image,item.salePrice,item.stock,item.id)}
                                >
                                    <View className='img'>
                                        <Image src={url + item.image} />
                                    </View>
                                    <Text className='text'>{item.name}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
                <View className='content ts'>
                    <View className='content-num'>
                        <View className='content-num-left'>购买数量</View>
                        <View className='content-num-right'>
                        <AtInputNumber
                            min={1}
                            max={list.length > 0 ? list[tabIndex].stock : 1}
                            step={1}
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                        />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


export default PurchaseList;