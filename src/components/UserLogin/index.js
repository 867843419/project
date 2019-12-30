import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';


@connect(({ user, common }) => ({
    ...user,
    ...common
}))
class UserLogin extends Component {
    render() {
        const { user, url } = this.props;
        return (
            <View className="user-login">
                <View className='user-login-img'>
                    <Image mode="widthFix" src={`${require('../../images/user/banner.png')}`} />
                    <View className='user-login-headPortrait'>
                        <View className='img'>
                            <Image mode="widthFix" src={user.avatarUrl ? url + user.avatarUrl : `${require('../../images/public/e.png')}`} />
                        </View>
                        <Text className='text'>{`${user.nickName ? user.nickName : '昵称'}`}</Text>
                    </View>
                </View>
                
            </View>
        )
    }
}


export default UserLogin;