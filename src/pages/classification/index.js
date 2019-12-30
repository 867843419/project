import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import LeftSideTabs from '../../components/LeftSideTabs';
import RightSideList from '../../components/RightSideList';
import './index.scss';

@connect(({ classification }) => ({
  ...classification,
}))
class Classification extends Component {
  config = {
    navigationBarTitleText: '商品分类',
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'classification/page',
      payload:{
        index:0
      }
    });
  };

  handleList = (index) => {
    this.props.dispatch({
      type: 'classification/page',
      payload:{
        index
      }
    });
  }

  render() {
    const { classificationList, list } = this.props;
    return (
      <View className="classification-page">
        <LeftSideTabs list={ classificationList } onValue={ this.handleList }/>
        <RightSideList list={ list }/>
      </View>
    )
  }
}

export default Classification;
