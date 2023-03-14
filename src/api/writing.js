import request from '@/utils/request'

export function getWritingList() {
  return request({
    url: '/writing/',
    method: 'post'
  })
}


export function deleteWriting(writingId){
  return request({
    url:'/writing/delete',
    method:'post',
    data:{
      writingId:writingId
    }
  })
}


export function addWriting(data){
  return request({
    url:'/writing/add',
    method:'post',
    data:data
  })
}

export function updateWriting(data){
  return request({
    url:'/writing/update',
    method:'post',
    data:data
  })
}

export function getWritingById(writingId){
  return request({
    url:'/writing/getWriting',
    method:'post',
    data:{
      writingId:writingId
    }
  })
}
