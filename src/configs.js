console.log(process.env.NODE_ENV)
let ROOT_API;
// const DEV_ROOT_API = 'http://10.2.15.14:8080/center-pre-interface';
const DEV_ROOT_API = 'http://ssbh.yshfresh.com';
const PRO_ROOT_API = 'http://ssbh.yshfresh.com';

process.env.NODE_ENV === 'production'
  ? ROOT_API = PRO_ROOT_API
  : ROOT_API = DEV_ROOT_API
// 在index.html配置
if (window.ROOT_API) {
  ROOT_API = window.ROOT_API
}
export default {
  ROOT_API: ROOT_API,
  api : ROOT_API + '/api',
  rootAPI : ROOT_API + '/api/trade/', //接口根路径
  userAPI : ROOT_API + '/api/user/',
  loginAPI : ROOT_API + '/login/login',
  prefix : 'jz_admin_', //本地存储key前缀
  imgURL : ROOT_API + '/',
  uploadURL : ROOT_API + '/api/comm/fileUpload/file',
  sysID : 7,
  cityName : 'beihuan', // 'yinchuan/linyi/yantai/beihuan/linyiAll',全局搜索
  isBeiHuan : true // 跳转注册页面
}