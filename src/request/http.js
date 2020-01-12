import axios from 'axios';
import Cookies from 'js-cookie'

// 超时时间
axios.defaults.timeout = 5000;

// 默认请求地址
axios.defaults.baseURL = 'http://118.31.226.206:9503';


// http request 拦截器
axios.interceptors.request.use(
    config => {
        const user_data = Cookies.get('user_info');
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type':'application/json'
        };
        if(user_data){
            config.params = {'token' : JSON.parse(user_data).token}
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);



// http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.errCode ==2){
            router.push({
                path:"/login",
                querry:{
                    redirect:router.currentRoute.fullPath
                }
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
);


/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */

export function fetch(url,params = {}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        }).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err)
        })
    })
}



/**
 * 封装post请求
 * @param url
 * @param data
 * @param context
 * @returns {Promise}
 */

export function post(url, data = {}){
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        })
    })
}



/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data).then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}


/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data).then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}