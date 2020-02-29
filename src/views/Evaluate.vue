<template>
    <div class="box">      
        <div class="evaluate-box">
            <!-- 综合评价 -->
            <div class="score">
                <div class="left-score">
                    <p>{{data1.score}}</p>
                    <p>综合评分</p>
                    <p>高于周边商家{{data1.rankRate}}%</p>
                </div>
                <div class="right-score">
                    <p>                  
                        <template>
                            服务态度<Rate clearable v-model="value1" />{{data1.serviceScore}}<br>
                            服务态度<Rate v-model="value2" />{{data1.foodScore}}
                        </template>  
                                        
                    </p>
                    <p>送达时间 {{data1.deliveryTime}}分钟</p>
                </div>
            </div>
            <!-- //评价统计 -->
            <div class="score-count">
                <template>
                    <Button type="primary">全部57</Button>
                    <Button type="info">满意47</Button>
                    <Button type="Default">满意10</Button>  
                </template>         
                <div>
                    <span><img src="../assets/img/gou.png" alt=""></span>
                    <span>只显示有文字的评价</span>
                </div>
            </div>
            <!-- //详细评价 -->
            <div class="score-detail">
                <div v-for="item in data" :key="item.usename" style="padding:10px 0">
                    <img :src="item.avatar"> 
                    <div class="right-detail">
                        <p>{{item.username}} <span>{{item.rateTime}}</span> </p>
                        <p><Rate clearable v-model="value1" /><span>{{item.deliveryTime}}分钟送达</span></p>
                        <p style="fontWeight:700;fontSize:16px">{{item.text}}</p>                   
                        <p class="over-f-h">{{item.recommend}}</p>
                    </div>              
                    
                </div>
            </div>
        </div>
    </div>
 
</template>

<script>
import {getRating, getSeller} from '../../api/apis.js'
import BScroll from "better-scroll";
    export default {
        data(){
            return{
                data:{},
                data1:{},
                value1: 3.9,
                value2: 4
            }
        },
        created(){
            getRating().then(res=>{
                this.data=res.data.data;
                console.log(this.data)
            }),
            getSeller().then(res=>{
                this.data1=res.data.data;
                console.log(this.data1)
            })
        },
        mounted(){
            new BScroll(document.querySelector(".box"),{click: true});
        }
    }

</script>

<style lang="less" scoped>
.evaluate-box{
    height: 400px;
    
    background: #F4F5F7;
    .score{
        display: flex;
        justify-content: space-around;
        background: #fff;
        margin-bottom: 20px;
        text-align: center;
        .left-score{
            border-right: 1px solid #ccc;
            padding-right: 10px;
            >p:first-child{
                color:gold;
                font-size: 26px;
            }
        }
        .right-score{
            text-align: left;
            // padding: 20px 0 20px 20px;
        }
    }
    .score-count{
        background: #fff;
        border-bottom: 1px solid #ccc;
        padding: 20px 0 0 20px;
        >button{
            margin-right: 20px;
        }
        >div{
            padding: 5px 0;
            border-top: 1px solid #ccc;
            margin-top: 20px;
            >span{
                display: inline-block;
                text-align: center;
                margin-right: 20px;
                vertical-align: middle;
                img{
                    width: 34px;
                }
                
            }
        }
    }
    // 详细描述
    .score-detail{
        padding: 20px;
        background: #fff;
        >div{
            display: flex;
            justify-content: space-between;
            >img{
                width: 30px;
                height: 30px;
                margin-right: 10px;
            }
            .right-detail{
                >p:nth-of-type(1){
                    display: flex;
                    justify-content: space-between;
                }
                .over-f-h{
                    width:295px;
                    display: block;
                    height: 20px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }

    }
}
</style>