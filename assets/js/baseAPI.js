//1.开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net"
    //2.测试
    //3.生产环境

//处理参数
$.ajaxPrefilter(function(params) {
    //拼接

    params.url = baseURL + params.url;

})