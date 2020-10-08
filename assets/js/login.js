$(function() {
    //点击去注册账号，隐藏那个登陆区域，显示注册区域
    $("#link_reg").on("click", function() {
            $(".login-box").hide()
            $(".reg-box").show()
        })
        //反之
    $("#link_login").on("click", function() {
        $(".login-box").show()
        $(".reg-box").hide()
    })

    //从layui中获取form对象
    //3.自定义验证规则
    var form = layui.form
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function(value) {
            var pwd = $(".reg-box input[name=password]").val()
                //比较
            if (value !== pwd) {
                return "两次密码输入不一致！";
            }
        }

    });

    //4.注册功能
    var layer = layui.layer
    $("#form_reg").on("submit", function(e) {
        //阻止表单提交
        e.preventDefault();
        // 发送 ajax
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: function(res) {
                // 返回状态判断
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //提交成功后处理代码
                layer.msg("注册成功，请登录");
                // 手动切换到登录表单
                $("#link_login").click();

                //重置form表单
                // js快排 
                $("#form_reg")[0].reset();
            }
        });
    })

    //5.登录功能（给form标签绑定事件 button按钮触发提交事件）
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                // 返回状态判断
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //提交信息，保存token。跳转页面
                layer.msg("恭喜你，登录成功");
                // 保存token，未来的接口使用token
                localStorage.setItem("token", res.token);
                // 跳转
                location.href = "/index.html";

            }
        });
    })


})