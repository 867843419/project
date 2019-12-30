import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import PropTypes from 'prop-types';
import './index.scss';
import { AtInput, AtForm } from 'taro-ui';

class OrderForm extends Component {

    static propTypes = {
        list: PropTypes.object,
        show: PropTypes.bool
    };
    
    static defaultProps = {
        list: {},
        show:true
    };

    state = {
        form:{
            name:'',
            phone:'',
            sfz:'',
            num:'',
            make:''
        }
    }

    handleNameChange(value){
        const data = this.state.form;
        data.name = value;
        this.setState({
          form : data
        })
        this.props.handleChange(this.state.form)
    }
    
    handlePhomeChange(value){
        const data = this.state.form;
        data.phone = value;
        this.setState({
          form : data
        })
        this.props.handleChange(this.state.form)
    }
    
    handleSfzChange(value){
        const data = this.state.form;
        data.sfz = value;
        this.setState({
          form : data
        })
        this.props.handleChange(this.state.form)
    }
    
    handleNumChange(value){
        const data = this.state.form;
        data.num = value;
        this.setState({
          form : data
        })
        this.props.handleChange(this.state.form)
    }
    
    handleMakeChange(value){
        const data = this.state.form;
        data.make = value;
        this.setState({
          form : data
        })
        this.props.handleChange(this.state.form)
    }

    render() {
        const { form } = this.state;
        const { show, list } = this.props;
        console.log(list)
        return (
            <View className="orderForm">
                <View className='a'>订单信息</View>
                <AtForm className='b'>
                    <View className='b-box'>
                        { show && <Text className='b-text'>*</Text> }
                        <AtInput
                        name='name'
                        title='姓名'
                        type='text'
                        value={!show ? list.customerName : form.name}
                        className='b-ipt'
                        disabled={!show}
                        onChange={this.handleNameChange.bind(this)}
                        />
                    </View>
                    <View className='b-box'>
                        { show && <Text className='b-text'>*</Text> }
                        <AtInput
                        name='phone'
                        title='电话号码'
                        type='text'
                        value={!show ? list.customerPhone : form.phone}
                        className='b-ipt'
                        disabled={!show}
                        onChange={this.handlePhomeChange.bind(this)}
                        />
                    </View>
                    <View className='b-box'>
                        { show && <Text className='b-text'>*</Text> }
                        <AtInput
                        name='sfz'
                        title='身份证号'
                        type='text'
                        value={!show ? list.identity : form.sfz}
                        className='b-ipt'
                        disabled={!show}
                        onChange={this.handleSfzChange.bind(this)}
                        />
                    </View>
                    <View className='b-box'>
                        { show && <Text className='b-text'>*</Text> }
                        <AtInput
                        name='num'
                        title='业务员工号'
                        type='text'
                        value={!show ? list.staff : form.num}
                        className='b-ipt'
                        disabled={!show}
                        onChange={this.handleNumChange.bind(this)}
                        />
                    </View>
                    <View className='b-box'>
                        <AtInput
                        name='make'
                        title='备注'
                        type='text'
                        value={!show ? list.orderRemake : form.make}
                        className='b-ipt'
                        disabled={!show}
                        onChange={this.handleMakeChange.bind(this)}
                        />
                    </View>
                </AtForm>
            </View>
        )
    }
}


export default OrderForm;