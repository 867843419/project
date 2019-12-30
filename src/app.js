import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import Home from './pages/home';
import dva from './utils/dva';
import models from './models';
import { Provider } from '@tarojs/redux';
import 'taro-ui/dist/style/index.scss'
import './styles/base.scss';

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {
  config = {
    pages: [
      'pages/home/index',
      'pages/cart/index',
      'pages/user/index',
      'pages/detail/index',
      'pages/login/index',
      'pages/order/index',
      'pages/more/index',
      'pages/message/index',
      'pages/evaluate/index',
      'pages/settlement/index',
      'pages/orderDetail/index',
      'pages/classification/index'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '贵金属交易',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: './images/tab/home.png',
          selectedIconPath: './images/tab/home-active.png',
        },
        {
          pagePath: 'pages/classification/index',
          text: '分类',
          iconPath: './images/tab/classification.png',
          selectedIconPath: './images/tab/classification-active.png',
        },
        {
          pagePath: 'pages/cart/index',
          text: '购物车',
          iconPath: './images/tab/cart.png',
          selectedIconPath: './images/tab/cart-active.png',
        },
        {
          pagePath: 'pages/user/index',
          text: '我的',
          iconPath: './images/tab/user.png',
          selectedIconPath: './images/tab/user-active.png',
        },
      ],
      color: '#989898',
      selectedColor: '#4E7BFF',
      backgroundColor: '#fff',
      borderStyle: 'black',
    },
  };
  
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
