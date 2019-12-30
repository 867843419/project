import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import PropTypes from 'prop-types';
import './index.scss';

class LeftSideTabs extends Component {

    state = {
        tabIndex:0
    }

    static propTypes = {
        list: PropTypes.array
    };
    
    static defaultProps = {
        list:[]
    };

    handTabClick = (index) => () => {
        this.setState({
            tabIndex:index
        })
        this.props.onValue(index)
    }

    render() {
        const { tabIndex } = this.state;
        const { list } = this.props;
        return (
            <View className="left-side-tabs">
                {
                    list.map((item, index) => (
                        <Text className={['list' , index == tabIndex ? 'active' : '']} key={index} onClick={this.handTabClick(index)}>{item.name}</Text>
                    ))
                }
            </View>
        )
    }
}


export default LeftSideTabs;