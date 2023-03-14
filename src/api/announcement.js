import request from '@/utils/request'

export function getAllAnnouncement() {
  return request({
    url: '/announcement/',
    method: 'post'
  })
}


export function deleteAnnouncement(announcementId){
  return request({
    url:'/announcement/delete',
    method:'post',
    data:{
      announcementId:announcementId
    }
  })
}


export function addAnnouncement(data){
  return request({
    url:'/announcement/add',
    method:'post',
    data:data
  })
}

export function updateAnnouncement(data){
  return request({
    url:'/announcement/update',
    method:'post',
    data:data
  })
}

export function getAnnouncementById(announcementId){
  return request({
    url:'/announcement/getAnnouncement',
    method:'post',
    data:{
      announcementId:announcementId
    }
  })
}
