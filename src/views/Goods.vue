<template>
    <div class="goods-div">
        <!-- 左侧div -->
        <div class="left-div">
            <!-- 实现Better-scroll，必须再次下套一个ul class必须为content -->
            <ul class="content">
                <!-- 动态样式的写法=========================== -->
                <div  class="left-good" @click="clickLeftTitle(index)" :class="{leftGoods:true,selected:index==curSelected}" v-for="(item,index) in data" :key="item.name">
                    <img width="12px" v-show="item.type==1" src="../assets/img/decrease_1@2x.png" />
                    <img width="12px" v-show="item.type==2" src="../assets/img/discount_1@2x.png" />
                    <p>{{item.name}}</p>
                </div>
            </ul>
        </div>
        
        <div class="right-div">
            <ul class="content">
                <div :id="index" v-for="(item,index) in data" :key="item.name">
                <!-- 标题 -->
                    <p>{{ item.name}}</p>
                    <!-- 儿子 -->
                    <div v-for="item1 in item.foods" :key="item1.name">                   
                        <div class="right">
                            <img :src="item1.image" alt="" width="40px" height="40px">
                            <div>
                                <h3>{{item1.name}}</h3>
                                <p>{{item1.description}}</p>
                                <p>月售{{item1.sellCount}}份  好评率{{item1.rating}}%</p>
                                <p class="pos-rel">
                                    <span class="newprice">￥{{item1.price}}</span>
                                    <span class="oldprice">￥{{item1.oldPrice}}</span>
                                    <span class="add">+</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import { getGoods } from "../../api/apis.js";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      data: {},
      curSelected:0
    };
  },
  created() {
    //把axios进行二次封装

    getGoods().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
    });
    // console.log(this.data.data)
  },
  mounted() {
    new BScroll(document.querySelector(".left-div"),{click: true});
    //beterScroll会阻止点击事件
    this.rightDiv=new BScroll(document.querySelector(".right-div",{click: true}));
    
  },
  methods:{
        clickLeftTitle(index){
            this.curSelected=index

            //右侧滚动   queryseleted不支持数字类型的id
            this.rightDiv.scrollToElement(document.getElementById(index),600)  //用实例对象,要调用函数
    }
  },
  
};
</script>

<style lang="less" scoped>
.selected{
    background: #fff;
}
.goods-div {
  display: flex;
  justify-content: space-around;
  height: 400px;
  overflow: scroll;
  .left-div {
    width: 100px;
    height: 100%;
    background: #f4f5f7;
    text-align: center;
    //超出滚动
    overflow: scroll;
    .leftGoods {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 60px;
      border-bottom: 1px solid #ccc;
      padding: 0 10px;
    }
  }
  .right-div {
    flex: 1;
    height: 100%;
    overflow: scroll;

    ul> div > p {
      background: #f4f5f7;
      color: #b3b6bc;
      height: 30px;
      line-height: 30px;
    }
    .right {
      display: flex;
      justify-content: flex-start;
      padding: 20px 20px;
      > img {
        width: 100px;
        height: 100px;
        margin-right: 10px;
      }
      div > p {
        color: #b8bcbf;
        font-size: 12px;
      }
      .newprice {
        color: red;
        font-size: 20px;
        margin-right: 10px;
      }
      .oldprice {
        color: #ccc;
        text-decoration: line-through;
      }
      .pos-rel {
        position: relative;
      }
      .add {
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 20px;
        background: #39b4e2;
        border-radius: 10px;
        color: #fff;
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
}
</style>