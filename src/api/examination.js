import request from '@/utils/request'
export function getList(){
  return request({
    url:'/examination/',
    method:'get'

  })
}


export function getExaminationById(examinationId) {
  return request({
    url: '/examination/getExamination',
    method: 'post',
    data:{
      examinationId:examinationId
    }

  })
}
export function addExamination(data) {
  return request({
    url: '/examination/add',
    method: 'post',
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    data:data
  })
}

export function updateExamination(data) {
  return request({
    url: '/examination/update',
    method: 'post',
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    data:data
  })
}


export function deleteexamination(examinationId) {
  return request({
    url: '/examination/delete',
    method: 'post',
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    data:{
      examinationId:examinationId
    }
  })
}
