const md5 = require('blueimp-md5');

module.exports = function login(router, UserModel, RoleModel) {
  // 登陆
  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
    UserModel.findOne({ username, password: md5(password) })
      .then((user) => {
        if (user) {
          // 登陆成功
          // 生成一个cookie(userid: user._id), 并交给浏览器保存
          res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 });
          if (user.role_id) {
            RoleModel.findOne({ _id: user.role_id }).then((role) => {
              user._doc.role = role;
              console.log('role user', user);
              res.send({ status: 0, data: user });
            });
          } else {
            user._doc.role = { menus: [] };
            // 返回登陆成功信息(包含user)
            res.send({ status: 0, data: user });
          }
        } else {
          // 登陆失败
          res.send({ status: 1, msg: '用户名或密码不正确!' });
        }
      })
      .catch((error) => {
        console.error('登陆异常', error);
        res.send({ status: 1, msg: '登陆异常, 请重新尝试' });
      });
  });
};
