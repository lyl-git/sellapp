import axios from 'axios'//var axios=require('axios')
// import qs from 'qs'
//创建一个请求对象 //  等效写法：axios.defaults.http://localhost:3000
let req=axios.create({
    baseURL:'http://localhost:3000',
    timeout:10000 //请求超时
})

export function getSeller(){
    return req.get('/api/seller',)
}

//请求评论信息
export function getRating(){
    return req.get('/api/ratings',)
}
// 请求商品信息
export function getGoods(){
    return req.get('/api/goods')
}