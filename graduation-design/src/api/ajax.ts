import axios from "axios";

export const requests = axios.create({
  //基础路径
  baseURL: "/api",
  //响应时间
  timeout: 5000,
});

//请求拦截器
requests.interceptors.request.use((config) => {
  //读取localStorage
  const userTempId=localStorage.getItem('userTempId')
  const token=localStorage.getItem('TOKEN')
  if (userTempId) {
    //在请求头添加token 和临时id
    if (config && config.headers) { // 判断是否存在
      config.headers["userTempId"] =userTempId;     
    }
    if(token&&config.headers){ // 判断是否存在
      config.headers['token']=token
    }   
  }
  return config;
});

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    //相应成功做的事情
    return res.data;
  },
  (err) => {
    alert("服务器响应数据失败");
  }
);
