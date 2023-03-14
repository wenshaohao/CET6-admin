import request from '@/utils/request'

export function getReadList() {
  return request({
    url: '/cloze/',
    method: 'post'
  })
}


export function deleteCloze(clozeId){
  return request({
    url:'/cloze/delete',
    method:'post',
    data:{
      clozeId:clozeId
    }
  })
}


export function addCloze(data){
  return request({
    url:'/cloze/add',
    method:'post',
    data:data
  })
}

export function updateCloze(data){
  return request({
    url:'/cloze/update',
    method:'post',
    data:data
  })
}

export function getClozeById(clozeId){
  return request({
    url:'/cloze/getCloze',
    method:'post',
    data:{
      clozeId:clozeId
    }
  })
}
