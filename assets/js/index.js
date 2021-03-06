$(function () {
    // 调用getUserInfo 获取用户基本信息
    getUserInfo();

    // 退出功能
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        // 提示用户是否退出
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //1、清空本地存储中的 token
            localStorage.removeItem('token');
            // 2、重新跳转到登录页面
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            } else {
                // 调用 renderAvatar 渲染用户头像
                renderAvatar(res.data);
            }
        },
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 1、获取用户名称
    var name = user.nickname || user.username;
    // 2、设置用户名称
    $('#welcome').html('欢迎&nbsp&nbsp' + name);
    // 3、按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1、渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 3.2、渲染文本头像
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase()).show();
    }
}

function setNavSelected(origin, current) {
    $(origin).addClass('layui-this');
    $(current).removeClass('layui-this');
}