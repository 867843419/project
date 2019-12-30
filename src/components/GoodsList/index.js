import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';
import './index.scss';

@connect(({ common }) => ({
  ...common
}))
class GoodsList extends Component {
  static propTypes = {
    list: PropTypes.array,
    show: PropTypes.bool,
    totalPage:PropTypes.bool
  };

  static defaultProps = {
    list: [],
    show: true,
    totalPage:true
  };

  gotoDetail = e => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${e.currentTarget.dataset.id}`,
    });
  };

  handleMore = () => {
    Taro.navigateTo({
      url: '/pages/more/index',
    });
  }

  render() {
    const { list, show, totalPage, url } = this.props;
    return (
      <View className="goods-list-container">
        {
          show ? (
            <View className='title-box' >
              <Text className='title-left'>精品推荐</Text>
              <Text className='title-right' onClick={this.handleMore}>查看更多 ></Text>
            </View>
          ) : (
            <View style='height:20px;'/>
          )
        }
        {list.data ? (
          <View className="goods-ul">
            {list.data.map((item, index) => (
              <View
                key={index}
                className="goods-li"
                data-id={item.id}
                onClick={this.gotoDetail}
              >
                <View className="pos">
                  <View className="Image-container">
                    <Image src={url + item.banners[0]} />
                  </View>
                </View>
                <Text className='name'>{item.name}</Text>
                <View className='mauch'>
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
                <Text className='soldout'>已出售:{item.saleNum}套</Text>
              </View>
            ))}
          </View>
        ) : (
          <View />
        )}
        {/* {totalPage ? (
          <View className="loadMoreGif">
            <View className="zan-loading" />
            <View className="text">加载中...</View>
          </View>
        ):
        (
          <View />
        )
        } */}
      </View>
    );
  }
}

export default GoodsList;
