import request from '@/utils/request'

export function getTranslationList() {
  return request({
    url: '/translation/',
    method: 'post'
  })
}


export function deleteTranslation(translationId){
  return request({
    url:'/translation/delete',
    method:'post',
    data:{
      translationId:translationId
    }
  })
}


export function addTranslation(data){
  return request({
    url:'/translation/add',
    method:'post',
    data:data
  })
}

export function updateTranslation(data){
  return request({
    url:'/translation/update',
    method:'post',
    data:data
  })
}

export function getTranslationById(translationId){
  return request({
    url:'/translation/getTranslation',
    method:'post',
    data:{
      translationId:translationId
    }
  })
}
