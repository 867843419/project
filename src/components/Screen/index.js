import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import PropTypes, { bool } from 'prop-types';
import './index.scss';
import t from '../../images/icon/screen-top.png';
import b from '../../images/icon/screen-bottom.png';

class Screen extends Component {

    static propTypes = {
        flag:bool
    };
    
    static defaultProps = {
        flag : false
    };

    state = {
        index : 0,
        screenIndex : 0
    }

    screenList = [
        '默认',
        '价格升序',
        '价格降序'
    ]

    screenListTo = [
        '默认',
        '销量升序',
        '销量降序'
    ]

    handleList = (index) => {
        if(index != this.state.index){
            this.setState({
                screenIndex : 0
            })
        }
        this.setState({
            index
        })
        this.props.onShow({
            maskShow:false
        });
    }

    handleScreenList = (index) => {
        this.setState({
            screenIndex : index
        })
        if(this.state.index == 1){
            this.props.onValue({
                maskShow:true,
                reorder:'sale_price',
                asc: this.screenList[index] == '价格升序' ? 1 : this.screenList[index] == '价格降序' ? 0 : 2
            });
        }else{
            this.props.onValue({
                maskShow:true,
                reorder:'sale_num',
                asc:this.screenListTo[index] == '销量升序' ? 1 : this.screenListTo[index] == '销量降序' ? 0 : 2
            });
        }
    }

    render() {
        const { index, screenIndex } = this.state;
        const { flag } = this.props;
        return (
            <View className="screen">
                <View className='screen-head'>
                    <View className='screen-left screen-box' onClick={() => this.handleList(1)}>
                        <Text className='text' style={ index == 1 ? {color: '#4E7BFF'} : {} }>价格</Text>
                        <View className='imgs'>
                            <Image mode="widthFix" src={t} className='img' />
                            <Image mode="widthFix" src={b} className='img' />
                        </View>
                    </View>
                    <View className='screen-right screen-box' onClick={() => this.handleList(2)}>
                        <Text className='text' style={ index == 2 ? {color: '#4E7BFF'} : {} }>销量</Text>
                        <View className='imgs'>
                            <Image mode="widthFix" src={t} className='img' />
                            <Image mode="widthFix" src={b} className='img' />
                        </View>
                    </View>
                </View>
                <View className={['select' ,flag ? 'active' : '' ]}>
                    {
                        index == 1 ? 
                        this.screenList.map((item,index) => (
                            <View 
                                key={index} 
                                onClick={() => this.handleScreenList(index)}
                                style={ screenIndex == index ? {color: '#4E7BFF'} : {}}
                            >
                                {item}
                            </View>
                        )) :
                        this.screenListTo.map((item,index) => (
                            <View 
                                key={index} 
                                onClick={() => this.handleScreenList(index)}
                                style={ screenIndex == index ? {color: '#4E7BFF'} : {}}
                            >
                                {item}
                            </View>
                        ))
                    }
                </View>
            </View>
        )
    }
}


export default Screen;