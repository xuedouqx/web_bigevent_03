//1.开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net"
    //     //2.测试
    //     //3.生产环境
$.ajaxPrefilter(function(options) {
    options.url = baseURL + options.url

    //为请求为/my/开头的所有Ajax，配置头信息
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            //重新登录，因为token过期时间12小时
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function(res) {
        console.log(res);
        // 判断，如果省份验证失败，跳转到登陆页面
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败')
        // 1.删除本地存储中的token
            localStorage.removeItem('token')
            //2.页面跳转
            // location.href = '/index.html';
    }
})