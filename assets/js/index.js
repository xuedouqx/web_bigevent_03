$(function() {
    getUserInof();

    // 退出登录功能
    $('#btnLogout').on('click', function() {

        // 带图标的询问
        layer.confirm('is not?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 删除本地存储中的token
            localStorage.removeItem('token')
                //2.页面跳转
            location.href = '/login.html';
            //3.layui自己提示框的关闭功能
            layer.close(index);
        });
    })
})

//获取用户信息（封装到函数外面）
//原因：后面的其他页面也要用到
function getUserInof() {
    //发送ajax
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     //重新登录，因为token过期时间12小时
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data);
        },
        // 不论成功还是是失败。都是触发complete方法
        complete: function(res) {
            console.log(res);
            // 判断，如果省份验证失败，跳转到登陆页面
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败')
            // 删除本地存储中的token
                localStorage.removeItem('token')
                //2.页面跳转
            location.href = '/login.html';
        }
    })
}

//渲染用户头像
// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
        // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}