import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import PropTypes from 'prop-types';
import './index.scss';
import { AtSearchBar } from 'taro-ui'

class Search extends Component {

    state = {
        value: ''
    }

    onChange (e) {
        this.setState({
            value:e.detail.value
        })
        this.props.onValue(e.detail.value)
    }

    onClear = () => {
        this.setState({
            value:''
        })
        this.props.onValue('')
    }

    render() {
        return (
            <View className="search">
                <AtSearchBar
                    placeholder='新品上架'
                    value={this.state.value}
                    onClear={this.onClear}
                    onBlur={this.onChange.bind(this)}
                />
            </View>
        )
    }
}


export default Search;