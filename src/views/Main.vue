<template>
    <div class="Main">
        <div class="Main-head" :style="{backgroundImage:'url('+data.avatar+')',backgroundRepeat:'repeat'}">
            <div class="lr">
                <img  :src="this.data.avatar">
                <div class="right">
                    <h2><span class="col-withe">品牌</span>{{this.data.name}}</h2>
                    <p>{{this.data.description}}/{{this.data.deliveryTime}}分钟送达</p>
                    <p><span class="col-red">减</span><span>{{this.data.supports[0].description}}</span></p>
                </div>
            </div>
            <p class="bom"><span class="bac-fff">公告</span>{{this.data.bulletin}}</p>
        </div>

        <div class="Main-content">
            <div class="Main-div">
                <router-link to="goods">商品</router-link>
                <router-link to="evaluate">评价</router-link>
                <router-link to="merchant">商家</router-link>

            </div>
            <!-- 二级路由出口 -->
            <router-view/>

            <!-- //购物车 -->
            <div class="shopcar-div">
                <img src="../assets/img/shopcar.png">
                <span>￥0</span>
                <span>另需配送费4元</span>
                <span>￥20起送</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getSeller } from "../../api/apis.js";

export default {
    data() {
        return {
            data: { supports: [{ description: "" }] }
    };
  },
  created() {
      //把axios进行二次封装
    getSeller().then(res => {
        // console.log(res.data.data)
      this.data = res.data.data;
    });
    // console.log(this.data.data)
  }

};
</script>

<style lang="less" scoped>
 .Main{
     height: 100%;
    //  display: flex;
    //  justify-content: flex-start;
 } 
  
.Main-head {
    height: 143px;
          color: #767271;
          //background-image用行内方式
          // background-image: url("http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg");
          // background: rgba(255,255,255,0.82);
          height: 143px;
          .lr {
            display: flex;
            padding: 20px;
            justify-content: space-around;
            img {
              width: 80px;
              height: 80px;
              margin-right: 10px;
            }
          }
          h2 {
            color: #fff;
          }
          .col-withe {
            color: #fff;
            background: #ef1415;
            font-size: 16px;
          }
          .col-red {
            color: red;
            background: #fff;
          }
          .bom {
            // position: fixed;
            // bottom: 0;
            background: #434345;
            //以下六步是超出显示省略号
            width: 100%;
            // height: 20px;
            overflow: hidden;
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
        
            font-size: 12px;
            padding: 3px 8px;
            .bac-fff {
              background: #fff;
              color: #000;
              font-weight: 700;
              margin-right: 5px;
            }
          }
}
    
.Main-content{
    flex: 1;
    overflow: scroll;
    // height: 600px;
        .Main-div {
        flex: 1;
        display: flex;
        justify-content: space-around;
        padding: 8px 0;
        }
        .shopcar-div {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 60px;
        background: #141c27;
        line-height: 60px;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        color: #939497;
        img {
            position: absolute;
            bottom: 10px;
            left: 20px;
            width: 60px;
            height: 60px;
        }
        span:nth-of-type(1) {
            padding-left: 80px;
            font-weight: 700;
            font-size: 24px;
        }
        span:nth-of-type(2) {
            font-size: 14px;
        }
        span:nth-of-type(3) {
            display: inline-block;
            width: 100px;
            background: #2b343b;
            text-align: center;
        }
        }
    }


</style>