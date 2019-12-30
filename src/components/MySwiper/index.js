import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';
import './index.scss';


@connect(({ common }) => ({
  ...common
}))
export default class MySwiper extends Component {
  static propTypes = {
    banner: PropTypes.array,
    home: PropTypes.bool,
  };

  static defaultProps = {
    banner: [],
    home: false,
  };

  activeClick = (index,id,url) => {
    if(id && url){
      Taro.navigateTo({
        url: `/pages/detail/index?id=${id}`,
      });
    }
  }

  render() {
    const { banner, home, url } = this.props;
    return (
      <View className='swiper-box'>
        <Swiper
          className={!home ? 'swiper-box-detail' : 'swiper-box-home'}
          circular
          indicatorDots
          indicatorColor="#999"
          indicatorActiveColor="#bf708f"
          autoplay
        >
          {banner.map((item, index) => (
            <SwiperItem key={index}>
              <Image mode="widthFix" src={url + (item.url ? item.url : item)} onClick={() => this.activeClick(index,item.actionUrl,item.url)} />
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    );
  }
}
