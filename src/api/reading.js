import request from '@/utils/request'

export function getReadList() {
  return request({
    url: '/reading/',
    method: 'post'
  })
}


export function deleteReading(readingId){
  return request({
    url:'/reading/delete',
    method:'post',
    data:{
      readingId:readingId
    }
  })
}


export function addReading(data){
  return request({
    url:'/reading/add',
    method:'post',
    data:data
  })
}

export function updateReading(data){
  return request({
    url:'/reading/update',
    method:'post',
    data:data
  })
}

export function getReadingById(readingId){
  return request({
    url:'/reading/getReading',
    method:'post',
    data:{
      readingId:readingId
    }
  })
}
