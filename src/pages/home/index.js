import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtDivider } from 'taro-ui'
import MySwiper from '../../components/MySwiper';
import GoodsList from '../../components/GoodsList';
import Search from '../../components/Search';
import PickWeek from '../../components/PickWeek';
import './index.scss';

@connect(({ common, home }) => ({
  ...common,
  ...home
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
  };

  state = {
    flag:false,
    totalPageShow:true,
    userId:0
  }

  componentWillMount = () => {
    const url = window.location.search;
    if(url.indexOf("?") != -1){
      Taro.setStorageSync('user_cookie', url.split('?')[1].split('=')[1])
      this.setState({
        userId:url.split('?')[1].split('=')[1]
      })
    }else{
      Taro.showToast({
        title: '登录失败,请重新登录',
        icon: 'none',
        mask: true
      });
    }
  }

  componentDidMount = () => {
    const data = this.state.userId;
    const { page, rows } = this.props;
    if(data != 0){
      this.props.dispatch({
        type: 'home/page'
      });
      this.props.dispatch({
        type: 'home/list',
        payload:{
          page,
          isRecom:1,
          rows
        }
      });
      this.props.dispatch({
        type: 'home/list',
        payload:{
          page,
          isRecom:0,
          rows
        }
      });
    }
  };

  onChange = (value) => {
    const { page, rows } = this.props;
    this.props.dispatch({
      type: 'home/search',
      payload:{
        page,
        keyword:value,
        rows
      }
    });
  }

  //小程序上拉加载
  onReachBottom() {
    const { page, rows, products_list } = this.props;
    if(products_list.totalPage == page){
      this.setState({
        flag:true,
        totalPageShow:false
      })
      return false
    }
    this.props.dispatch({
      type: 'home/list',
      payload:{
        page:page + 1,
        isRecom:0,
        rows
      }
    });
  }

  render() {
    const { banner, products_list, recommend_products_list } = this.props;
    const { flag, totalPageShow } = this.state;
    return (
      <View className="home-page">
        <Search onValue={this.onChange}/>
        <MySwiper banner={banner} home />
        <PickWeek list={recommend_products_list}/>
        <GoodsList list={products_list} totalPage={totalPageShow}/>
        <AtDivider content='没有更多了' fontColor='#ed3f14' lineColor='#ed3f14' className={[flag ? 'block' : 'hidden']}/>
      </View>
    );
  }
}

export default Index;
