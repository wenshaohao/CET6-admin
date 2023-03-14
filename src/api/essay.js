import request from '@/utils/request'

export function getEssayList() {
  return request({
    url: '/essay/',
    method: 'get'
  })
}

export function getEssayById(essayId) {
  return request({
    url: '/essay/getEssay/'+essayId,
    method: 'get',

  })
}

export function addEssay(data) {
  return request({
    url: '/essay/add',
    method: 'post',
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    data:data
  })
}



export function updateEssay(data) {
  return request({
    url: '/essay/update',
    method: 'post',
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    data:data
  })
}

export function deleteEssay(essayId) {
  return request({
    url: '/essay/delete',
    method: 'post',
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    data:{
      essayId:essayId
    }
  })
}
