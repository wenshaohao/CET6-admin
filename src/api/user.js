import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/admin/login',
//     method: 'post',
//     data
//   })
// }

// export function login(usernumber,password) {
//   return request({
//     url: `/admin/login/${usernumber}/${password}`,
//     method: 'get'

//   })
// }

export function login(usernumber,password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data:{
        usernumber:usernumber,
        password:password
    }

  })
}

export function getUserById(userId) {
  return request({
    url: '/user/getUser',
    method: 'post',
    data:{
        userId:userId
    }

  })
}

export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    data:data
  })
}


export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    data:data
  })
}

export function deleteUser(userId) {
  return request({
    url: '/user/delete',
    method: 'post',
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    data:{
      userId:userId
    }
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/admin/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function getALLUser(){
  return request({
    url:'/user/',
    method:'get'

  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
