import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';
import { AtGrid } from "taro-ui"
import './index.scss';
import b from '../../images/public/b.png';

@connect(({ common }) => ({
    ...common
}))
class RightSideList extends Component {

    static propTypes = {
        list: PropTypes.array
    };
    
    static defaultProps = {
        list:[]
    };

    handleClick = (value) => {
        Taro.navigateTo({
            url: `/pages/more/index?id=${value.id}`,
        });
    }

    render() {
        const { list, url } = this.props;
        const data = [];
        if(list){
            list.forEach(item=>{
                data.push({
                    image:url + item.image,
                    value:item.name,
                    id:item.id
                })
            })
        }
        return (
            <View className="right-side-list">
                <AtGrid
                    className='grid'
                    hasBorder={false}
                    onClick={this.handleClick}
                    data={data} 
                />
            </View>
        )
    }
}


export default RightSideList;