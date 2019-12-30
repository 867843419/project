import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Image, Text } from '@tarojs/components';
import * as detailApi from './service';
import MySwiper from '../../components/MySwiper';
import PurchaseList from '../../components/PurchaseList';
import './index.scss';

@connect(({ home, common, cart }) => ({
  ...home,
  ...common,
  ...cart
}))
class Detail extends Component {
  config = {
    navigationBarTitleText: '商品详情',
  };

  state = {
    goodsId: '',
    detail: {},
    showModal: true,
    skuId:0,
    num:0,

  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'home/page',
    });
    this.setState({
      goodsId: this.$router.params.id,
    });
    this.getGoodsInfo(this.$router.params.id);
  };

  async getGoodsInfo(goodsId) {
    const res = await detailApi.getProductInfo(goodsId);
    if (res.code == 200) {
      Taro.setNavigationBarTitle({
        title: res.data.name,
      });
      this.setState({
        detail: res.data
      });
      this.props.dispatch({
        type: 'home/set',
        payload:{
          userId:this.props.userId,
          skuId:res.data.skus[0].id,
          isCheck:0,
          num:1,
          catalog:res.data.catalogId
        }
      })
    }
  }

  //接收子组件传过来的值
  onCartValue = (value) => {
    const { userId, isCheck, catalog } = this.props.getCart;
    const { skuId, num } = this.state;
    this.setState(
      {
        skuId:value.id || skuId,
        num:value.num || num
      }
    )
    this.props.dispatch({
      type: 'home/set',
      payload:{
        userId,
        isCheck,
        skuId:value.id || skuId,
        num:value.num || num,
        catalog
      }
    })
  }

  //加入购物车
  join = () => {
    if(this.state.detail.skus.length > 0 && this.state.skuId == 0){
      this.setState({
        showModal:false,
        skuId:this.props.getCart.skuId
      })
      return false
    }
    this.props.dispatch({
      type: 'cart/updata',
      payload:{
        list:[this.props.getCart]
      },
      callback: () => {
        this.setState({
          showModal:true,
          skuId:0
        })
        Taro.showToast({
          title: '添加成功，请在购物车下单哟！',
          icon: 'success',
          duration: 2000
        })
      }
    })
  };
  
  //隐藏遮罩层
  showModalHidden = () => {
    this.setState({
      showModal:true,
      skuId : 0
    })
  }

  //显示遮罩层
  showModalBlock = () => {
    this.setState({
      showModal:false
    })
  }

  //购买
  purchase = () => {
    if(this.state.detail.skus.length > 0 && this.state.skuId == 0){
      this.setState({
        showModal:false,
        skuId:this.props.getCart.skuId
      })
      return false
    }
    this.props.dispatch({
      type:'cart/one',
      payload:{
        list:[this.props.getCart]
      },
      callback: () => {
        Taro.navigateTo({
          url: '/pages/settlement/index?flag=true',
        });
      }
    })
  }

  render() {
    const { detail, showModal } = this.state;
    const { url } = this.props;
    return (
      <View className="detail-page">
        <View className={[ 'mask' , showModal ? 'hidden' : 'block' ]} onClick={this.showModalHidden}></View>
        <PurchaseList list={detail.skus} onValue={ this.onCartValue } show={showModal} />
        <View className="image-box-wrap">
          <View className="image-box clearfix">
            <MySwiper banner={detail.banners} />
          </View>
        </View>
        {/* -- 商品信息 -- */}
        <View className="container">
          <View className="product_name">
            {detail.name}
          </View>
          <View className='container-code-left'>
              <View className="code01">正品保障</View>
              <View className="code02">无质量问题，一经售出概不退换！</View>
          </View>
          {
            detail.skus ? (
              <View className='container-code-right'>
                <View className="code01">￥{detail.skus[0].salePrice.toFixed(2)}</View>
                {
                  detail.skus[0].marketPrice == detail.skus[0].salePrice ? null : (
                    <View className="code02">原价￥{detail.skus[0].marketPrice.toFixed(2)}</View>
                  )
                }
              </View>
            )
            :
            null
          }
        </View>
        <View className='xian'></View>
        <View className='xaunze'>
          <View className='xaunze-t' onClick={this.showModalBlock}>
            <View className='text01'>选择</View>
            <View className='text02'>请选择商品 ></View>
          </View>
          <View className='xaunze-b'>
            <View className='text01'>
              {
                detail.skus ? (
                  detail.skus.map((item,index) => (
                    <View className='text-img' key={index}>
                      <Image mode="widthFix" src={url + item.image}/>
                    </View>
                  ))
                )
                :
                null
              }
            </View>
            <View className='text02'>
              <Text>共计{detail.skus ? detail.skus.length : null}款样式</Text>
            </View>
          </View>
        </View>
        <View className='xian'></View>
        {/* 详情图片 */}
        <View className='detail-imgs'>
            <View className='title'>宝贝详情</View>
            <View className='imgs'>
              {
                detail.sketch == null ? (
                  <Image mode="widthFix" src={require('../../images/public/d.png')}/>
                ) : (
                  detail.sketch.map((item,index) => (
                    <Image mode="widthFix" key={index} src={url + `${item}`}/>
                  ))
                )
              }
            </View>
        </View>
        <View className='xian'></View>
        {/* 评价 */}
        <View className='detail-evaluate'>
          <View className='title'>宝贝评价</View>
          {
            detail.commentInfos && detail.commentInfos.length > 0 ? (
              detail.commentInfos.map((item,index) => (
                <View className='content' key={index}>
                  <View className='user'>
                    <View className='user-img'>
                      <Image mode="widthFix" src={require('../../images/public/e.png')}/>
                    </View>
                    <Text>{item.displayName}</Text>
                  </View>
                  <View className='text'>
                    {item.message}
                  </View>
                  {
                    item.images.map((item,index) => (
                      <View className='imgs' key={index}>
                        <Image src={url + item} />
                      </View>
                    ))
                  }
                  <View className='time'>
                    {item.createDate}
                  </View>
                </View>
              ))
            ) : (
              <View className='no'>暂无评价</View>
            )
          }
        </View>
        {/* 底部操作栏 */}
        <View className={["detail-bottom-btns" , showModal ? 'border' : '']}>
          <View
            className='join'
            onClick={this.join}
          >
            加入购物车
          </View>
          <View
            className='join'
            onClick={this.purchase}
          >
            立即购买
          </View>
        </View>
      </View>
    );
  }
}

export default Detail;
