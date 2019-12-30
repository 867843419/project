import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtDivider } from 'taro-ui'
import Search from '../../components/Search';
import Screen from '../../components/Screen';
import GoodsList from '../../components/GoodsList';
import './index.scss';

@connect(({ home, cart, more, loading }) => ({
  ...home,
  ...cart,
  ...more,
  ...loading,
}))
class More extends Component {
  config = {
    navigationBarTitleText: '商品列表',
  }

  state = {
    maskShow:true,
    name:'',
    flag:false,
    totalPageShow:true,
    reorder:'',
    asc:''
  }

  componentDidMount = () => {
    const { page, rows } = this.props;
    const id = this.$router.params.id;
    if(id){
      this.props.dispatch({
        type: 'home/list',
        payload:{
          page,
          rows,
          catalogId:id
        }
      });
    }else{
      this.props.dispatch({
        type: 'home/list',
        payload:{
          page,
          rows,
          isRecom:0
        }
      });
    }
  };

  // 小程序上拉加载
  onReachBottom() {
    const { page, rows, products_list } = this.props;
    const { asc, reorder } = this.state;
    if(products_list.totalPage == page){
      this.setState({
        flag:true,
        totalPageShow:false
      })
      return false
    }
    const id = this.$router.params.id;
    if(id){
      if(asc == 2){
        this.props.dispatch({
          type: 'home/list',
          payload:{
            page,
            rows,
            catalogId:id
          }
        });
      }else{
        this.props.dispatch({
          type: 'home/list',
          payload:{
            page,
            rows,
            reorder,
            asc,
            catalogId:id
          }
        });
      }
    }else{
      if(value.asc == 2){
        this.props.dispatch({
          type: 'home/list',
          payload:{
            page,
            rows
          }
        });
      }else{
        this.props.dispatch({
          type: 'home/list',
          payload:{
            page,
            rows,
            reorder:value.reorder,
            asc:value.asc
          }
        });
      }
    }
  }

  //显示背景框
  setScreen = (value) => {
    this.setState({
      maskShow:value.maskShow
    })
  }

  //分类
  setValue = (value) => {
    const { page, rows } = this.props;
    const id = this.$router.params.id;
    if(id){
      if(value.asc == 2){
        this.props.dispatch({
          type: 'home/list',
          payload:{
            page,
            rows,
            catalogId:id
          }
        });
      }else{
        this.props.dispatch({
          type: 'home/list',
          payload:{
            page,
            rows,
            reorder:value.reorder,
            asc:value.asc,
            catalogId:id
          }
        });
      }
    }else{
      if(value.asc == 2){
        this.props.dispatch({
          type: 'home/list',
          payload:{
            page,
            rows,
            isRecom:0
          }
        });
      }else{
        this.props.dispatch({
          type: 'home/list',
          payload:{
            page,
            rows,
            reorder:value.reorder,
            asc:value.asc,
            isRecom:0
          }
        });
      }
    }
    this.setState({
      maskShow:true,
      reorder:value.reorder,
      asc:value.asc
    })
  }
  
  //隐藏背景框
  handleMask = () => {
    this.setState({
      maskShow:true
    })
  }

  //搜索
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

  render() {
    const { products_list, recommend_products_list } = this.props;
    const { maskShow, flag, totalPageShow } = this.state;
    const id = this.$router.params.id;
    return (
      <View className="more-page">
        <View className={['mask', !maskShow ? 'block' : 'hidden']} onClick={this.handleMask}></View>
        <Search onValue={this.onChange}/>
        <Screen onShow={this.setScreen} onValue={this.setValue} flag={!maskShow}/>
        <GoodsList list={ id ? recommend_products_list : products_list } show={false} totalPage={totalPageShow}/>
        {
          recommend_products_list.data && recommend_products_list.data.length == 0 ? (
            <View className='more-no'>暂无商品</View>
          ) : (
            <AtDivider content='没有更多了' fontColor='#ed3f14' lineColor='#ed3f14' className={[flag ? 'block' : 'hidden']}/>
          )
        }
      </View>
    )
  }
}

export default More
