import Taro, { Component } from '@tarojs/taro';
import { View,Text,Image, Input } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';
import { AtRate, AtImagePicker, AtTextarea } from 'taro-ui';
import { axios, PostData, FileData } from 'taro-axios';

@connect(({common, order}) => ({
  ...common,
  ...order
}))
class Evaluate extends Component {
  config = {
    navigationBarTitleText: '商品评价',
  };

  state = {
    files: [],
    list:[],
    obj:{},
    textarea:'',
    comments:[]
  }

  componentDidMount = () => {
    const id = this.$router.params.id;
    const { list } = this.props;
    const data = [];
    let ogj = {}
    list.forEach((item) => {
      if(item.id == id){
        ogj = item;
      }
    })
    ogj.items.forEach(item => {
      data.push({
        skuName:item.skuName,
        mainImg:item.mainImg,
        skuId:item.skuId,
        message:'',
        descScore:0,
        image:[],
        url:[]
      });
    })
    this.setState({
      list:data,
      obj:ogj
    })
  }

  //评价等级
  handleRateChange(index,value){
    const list = [...this.state.list];
    list[index].descScore = value;
    this.setState({
      list
    })
  }

  //多文本输入框
  handleTextareaChange(index,e){
    const list = [...this.state.list];
    list[index].message = e.detail.value;
    this.setState({
      list
    })
  }

  //上传图片
  // onChange (index,files) {
  //   var formdata = new FormData();
  //   formdata.append('file',files[0].file)
  //   axios({
  //     method: 'post',
  //     url: '/jeecg/api/goods.do?upload',
  //     data: formdata,
  //     headers: { "Content-Type": "multipart/form-data" }
  //   })
  //   .then((res)=> {
  //     console.log(res.data.code);
  //   })
  //   const list = [...this.state.list];
  //   list[index].image = files;
  //   list[index].url = [];
  //   if(files.length > 0){
  //     files.forEach(item => {
  //       list[index].url.push(item.url)
  //     })
  //   }else{
  //     list[index].url = [];
  //   }
  //   this.setState({
  //     list
  //   })
  // }

  //提交评价
  submitEvaluate = () => {
    const { obj, list } = this.state;
    const comments = [];
    list.forEach(item => {
      comments.push({
        skuId:item.skuId,
        message:item.message,
        descScore:item.descScore,
        image:item.image
      })
    })
    if(comments[0].message != ''){
      this.props.dispatch({
        type: 'order/comment',
        payload:{
          orderId: obj.id,
          userId: this.props.userId,
          comments:comments
        },
        callback:() => {
          Taro.showToast({
            title: '评价成功',
            icon: 'none',
            duration: 2000
          })
          setTimeout(()=>{
            Taro.navigateTo({
              url: `/pages/order/index?type=4`
            });
          },2000)
        }
      })
    }else{
      Taro.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
    }
  }

  onChange = (e) => {
    var index = e.target.dataset.index;
    var formdata = new FormData();
    formdata.append('file',e.target.files[0])
    axios({
      method: 'post',
      url: '/jeecg/api/goods.do?upload',
      data: formdata,
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then((res)=> {
      const img = res.data.data.split('/');
      const list = [...this.state.list];
      list[index].image.push(img[3])
      this.setState({
        list
      })
    })
  }

  render() {
    const { list } = this.state;
    const { url } = this.props;
    return (
      <View className="evaluate-page">
        {
          list.length > 0 ? (
            list.map((item,index) => (
              <View className='list' key={index}>
                <View className='evaluate-page-head'>
                    <View className='img'>
                      <Image mode="widthFix" src={url + `${item.mainImg}`}/>
                    </View>
                    <Text>{item.skuName}</Text>
                </View>
                <View className='evaluate-page-content'>
                    <View className='list'>
                      <Text className='text'>商品评价</Text>
                      <AtRate
                        value={item.descScore}
                        onChange={this.handleRateChange.bind(this,index)}
                        className='rate'
                        size='20'
                        margin='20'
                      />
                    </View>
                </View>
                <View className='evaluate-page-form'>
                  <Text className='text'>请您对这个商品进行评价</Text>
                  <View className='list'>
                    <AtTextarea
                      value={item.message}
                      onChange={this.handleTextareaChange.bind(this,index)}
                      maxLength={200}
                      placeholder='请输入您的评价内容...'
                    />
                  </View>
                  {/* <AtImagePicker
                    multiple={false}
                    files={item.image}
                    onChange={this.onChange.bind(this,index)}
                    className='imgs'
                  /> */}
                  <View className='abc'>
                    {
                      item.image.map((item,index) => (
                        <View className='files' key={index}>
                          <Image mode="widthFix" src={url + item}/>
                        </View>
                      ))
                    }
                    <View className='file'>
                      +
                      <Input type='file' data-index={index} onChange={this.onChange}/>
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View />
          )
        }
        <View className='btn' onClick={this.submitEvaluate}>
          发表评价
        </View>
      </View>
    )
  }
}

export default Evaluate
