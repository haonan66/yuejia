//  二次封装 axios 拦截器
import axios from 'axios'
import config from '../config/index'
//  设置配置 
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest{
    constructor(baseURL){
        this.baseURL = baseURL
    }

    getInsideConfig(){
        const config = {
            baseURL: this.baseURL,
            header: {

            }
        }
        return config
    }
    interceptors(instance) {
        instance.interceptors.request.use(function(config){
            //  在发送请求之前做些什么
            return config
        },function(error){
            //  对请求错误做些什么
            return Promise.reject(error)
        })
        instance.interceptors.response.use(function(response){
            //  对响应数据些什么
            return response.data
        },function(error){
            //  对响应错误做些什么
            return Promise.reject(error)
        })
    }

    request(options){
        //  请求
        const instance = axios.create()
        options = {...(this.getInsideConfig()),...options}
        this.interceptors(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)