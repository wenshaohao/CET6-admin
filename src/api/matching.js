import request from '@/utils/request'

export function getMatchingList() {
  return request({
    url: '/matching/',
    method: 'post'
  })
}


export function deleteMatching(matchingId){
  return request({
    url:'/matching/delete',
    method:'post',
    data:{
      matchingId:matchingId
    }
  })
}


export function addMatching(data){
  return request({
    url:'/matching/add',
    method:'post',
    data:data
  })
}

export function updateMatching(data){
  return request({
    url:'/matching/update',
    method:'post',
    data:data
  })
}

export function getMatchingById(matchingId){
  return request({
    url:'/matching/getMatching',
    method:'post',
    data:{
      matchingId:matchingId
    }
  })
}
