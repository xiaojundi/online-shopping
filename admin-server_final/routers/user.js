const md5 = require('blueimp-md5');

module.exports = function user(router, UserModel, RoleModel) {
  // 添加用户
  router.post('/manage/user/add', (req, res) => {
    // 读取请求参数数据
    const { username, password } = req.body;
    // 处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
    // 查询(根据username)
    UserModel.findOne({ username })
      .then((user) => {
        // 如果user有值(已存在)
        if (user) {
          // 返回提示错误的信息
          res.send({ status: 1, msg: '此用户已存在' });
          return new Promise(() => {});
        } else {
          // 没值(不存在)
          // 保存
          return UserModel.create({
            ...req.body,
            password: md5(password || 'atguigu'),
          });
        }
      })
      .then((user) => {
        // 返回包含user的json数据
        res.send({ status: 0, data: user });
      })
      .catch((error) => {
        console.error('注册异常', error);
        res.send({ status: 1, msg: '添加用户异常, 请重新尝试' });
      });
  });

  // 更新用户
  router.post('/manage/user/update', (req, res) => {
    const user = req.body;
    UserModel.findOneAndUpdate({ _id: user._id }, user)
      .then((oldUser) => {
        const data = Object.assign(oldUser, user);
        // 返回
        res.send({ status: 0, data });
      })
      .catch((error) => {
        console.error('更新用户异常', error);
        res.send({ status: 1, msg: '更新用户异常, 请重新尝试' });
      });
  });

  // 删除用户
  router.post('/manage/user/delete', (req, res) => {
    const { userId } = req.body;
    UserModel.deleteOne({ _id: userId }).then((doc) => {
      res.send({ status: 0 });
    });
  });

  //增加用户
  router.post('/manage/user/register', (req, res) => {
    UserModel.create({ ...req.body })
      .then((doc) => {
        res.send({ status: 0, data: doc });
      })
      .catch((err) => {
        console.error('增加用户异常', error);
        res.send({ status: 1, msg: '增加用户异常' });
      });
  });

  // 获取用户信息的路由(根据cookie中的userid)
  /*router.get('/user', (req, res) => {
    // 从请求的cookie得到userid
    const userid = req.cookies.userid
    // 如果不存在, 直接返回一个提示信息
    if (!userid) {
      return res.send({status: 1, msg: '请先登陆'})
    }
    // 根据userid查询对应的user
    UserModel.findOne({_id: userid}, filter)
      .then(user => {
        if (user) {
          res.send({status: 0, data: user})
        } else {
          // 通知浏览器删除userid cookie
          res.clearCookie('userid')
          res.send({status: 1, msg: '请先登陆'})
        }
      })
      .catch(error => {
        console.error('获取用户异常', error)
        res.send({status: 1, msg: '获取用户异常, 请重新尝试'})
      })
  })*/

  // 获取所有用户列表
  router.get('/manage/user/list', (req, res) => {
    UserModel.find({ username: { $ne: 'admin' } })
      .then((users) => {
        RoleModel.find().then((roles) => {
          res.send({ status: 0, data: { users, roles } });
        });
      })
      .catch((error) => {
        console.error('获取用户列表异常', error);
        res.send({ status: 1, msg: '获取用户列表异常, 请重新尝试' });
      });
  });
};
