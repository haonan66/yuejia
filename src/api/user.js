import request from './axios'

export default {
  //  用户列表
  getUserList(current, limit, searchObj) {
    return request({
      url: `/user/userManager/findPage/${current}/${limit}`,
      method: 'post',
      //  使用 json
      data: searchObj
    })
  },
  //  删除用户
  deleteUser(id) {
    return request({
      url: `/user/userManager/${id}`,
      method: 'delete'
    })
  },
  //  批量删除的方法
  batchRemoveUsers(idList) {
    return request({
      url: `/user/userManager/batchRemove`,
      method: 'delete',
      data: idList
    })
  },
  //  封禁和取消封禁
  banUser(id, status) {
    return request({
      url: `/user/userManager/banUser/${id}/${status}`,
      method: 'put'
    })
  },
  //  添加用户
  saveUser(user) {
    return request({
      url: `/user/userManager/saveUser`,
      method: 'post',
      data: user
    })
  },
  //  通过 id 查询用户
  getUser(id) {
    return request({
      url: `/user/userManager/getUser/${id}`,
      method: 'get'
    })
  },
  //  修改用户
  updateUser(user) {
    return request({
      url: `/user/userManager/updateUser`,
      method: 'post',
      data: user
    })
  },
  //  上传头像
  upload(user) {
    return request({
      url: `/user/userManager/upload`,
      method: 'post',
      data: user
    })
  }
}
