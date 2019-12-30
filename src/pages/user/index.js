import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Icon } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';
import UserLogin from '../../components/UserLogin';
import UserOrder from '../../components/UserOrder';

@connect(({ user, common }) => ({
  ...user,
  ...common,
}))
class User extends Component {
  
  config = {
    navigationBarTitleText: '我的',
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'user/page',
      payload:{
        openid:this.props.userId
      }
    });
  }

  goToPage = e => {
    Taro.navigateTo({
      url: e.currentTarget.dataset.url,
    });
  };

  render() {
    const { list } = this.props;
    return (
      <View className="user-page">
        <UserLogin />
        <UserOrder />
        <View className='order-all'>
          <Text className='a'>我的订单</Text>
          <Text className='b' data-url={`/pages/order/index?type=0`} onClick={this.goToPage}>查看全部订单  ></Text>
        </View>
        <View className="not-login">
          <View className="list">
            {list &&
              list.map((item, index) => (
                <View
                  className="item"
                  key={index}
                  data-url={`/pages/order/index?type=${index + 1}`}
                  onClick={this.goToPage}
                >
                  <Image mode="widthFix" src={item.img} />
                  <Text>{item.txt}</Text>
                  {item.num > 0 && <Icon className="num">{item.num}</Icon>}
                </View>
              ))}
          </View>
        </View>
      </View>
    );
  }
}

export default User
