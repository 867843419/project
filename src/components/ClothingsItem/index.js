import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Checkbox } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import PropTypes from 'prop-types';
import './index.scss';
import { AtList, AtSwipeAction, AtInput } from "taro-ui";


@connect(({common}) => ({
  ...common
}))
class ClothingsItem extends Component {
  static propTypes = {
    list: PropTypes.array,
    deleteClothing: PropTypes.func,
  };

  static defaultProps = {
    list: [],
    deleteClothing: function() {},
  };

  state = {
    valIndex:undefined
  }

  onDeleteClick = (value) => {
    this.props.onDeleteClothing(value)
  }

  onCheckChange = (e) => {
    this.props.onCheckClothing({
      check:e.target.checked ? 1 : 0,
      index:e.target.dataset.index
    })
  }

  jiaClick(index,num,flag,stock){
    if(num != stock && flag != 0){
      this.props.onNumClothing({
        num:1,
        index
      })
    }else{
      Taro.showToast({
        title: '不能再加了哟',
        icon: 'none',
        duration: 2000
      })
    }
  }

  jianClick(index,num,flag){
    if(num != 1 && flag != 0){
      this.props.onNumClothing({
        num:-1,
        index
      })
    }else{
      Taro.showToast({
        title: '不能再减了哟',
        icon: 'none',
        duration: 2000
      })
    }
  }

  handleChange(stock,index,num,val){
    if(val > stock){
      Taro.showToast({
        title: `不能大于库存量${stock}`,
        icon: 'none',
        duration: 2000
      })
    }else if(val < 1){
      Taro.showToast({
        title: `不能小于1`,
        icon: 'none',
        duration: 2000
      })
    }else{
      this.props.onNumClothing({
        num:val - num,
        index
      })
    }
    this.setState({
      valIndex:undefined
    })
  }

  valClick(valIndex){
    this.setState({
      valIndex
    })
  }

  render() {
    const { list, url } = this.props;
    return (
      <AtList className="ClothingsItem-page">
        {list.map((item, index) => (
          <AtSwipeAction
            key={index}
            className='clo-action'
            onClick={() => this.onDeleteClick(item.skuId)}
            options={[
              {
                className:'at-icon at-icon-trash clo-option',
                style: {
                  backgroundColor: '#4E7BFF'
                }
              }
            ]}
          >
            <View className='normal'>
                <View className='check'>
                  <Checkbox data-index={index} className='checkbox-list' checked={item.isCheck == 1 && item.spuInfos.isSale == 1} onChange={this.onCheckChange} disabled={item.spuInfos.isSale == 0}></Checkbox>
                </View>
                <View className='img'>
                  <Image src={url + item.spuInfos.skus[0].image}/>
                </View>
                <View className='box'>
                  <Text className='a'>{item.spuInfos.name}</Text>
                  <Text className='b'>{item.spuInfos.skus[0].name}</Text>
                  <Text className='c'>￥{item.spuInfos.skus[0].salePrice.toFixed(2)}</Text>
                </View>
                <View className='num'>
                  <Text className='jian' onClick={() => this.jianClick(index,item.num,item.spuInfos.isSale)}>-</Text>
                  {
                    index == this.state.valIndex ? (
                      <AtInput type='text' focus className='val' value={item.num} onBlur={this.handleChange.bind(this,item.spuInfos.skus[0].stock,index,item.num)}/>
                    ) : <Text className='valSpan' onClick={() => this.valClick(index)} >{item.num}</Text>
                  }
                  <Text className='jia' onClick={() => this.jiaClick(index,item.num,item.spuInfos.isSale,item.spuInfos.skus[0].stock)}>+</Text>
                  {
                    item.spuInfos.isSale == 0 ? (
                      <View className='isSale'>
                        商品已失效
                      </View>
                    ) : null
                  }
                </View>
            </View>
          </AtSwipeAction>
        ))}
      </AtList>
    );
  }
}

export default ClothingsItem;
