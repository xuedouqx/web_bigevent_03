$(function() {
    //定义验证规则
    var form = layui.form;
    form.verify({
            // 所有密码验证要求
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 新旧密码不能能相同
            samePwd: function(value) {
                if (value === $('name=oldPwd').val()) {
                    return '新旧密码不能相同'
                }
            },
            // 新密码和确认密码不一致问题
            rePwd: function(value) {
                if (value !== $('[name=newPwd]').val()) {
                    return '两次密码不一致'
                }
            }

        })
        // 2.表单提交
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('修改密码成功');
                $('.layui-form')[0].reset();
            }
        })
    })

})