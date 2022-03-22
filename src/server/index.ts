import axios from 'axios'

//创建axios
const server = axios.create({
    baseURL:'http://localhost:3333',
    timeout:3000
})
//请求接口
const getApiList=()=> server.get('/api/list').then(res=> res.data)

//导出
export {
    getApiList
}