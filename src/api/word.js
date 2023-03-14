import request from '@/utils/request'

export function getWordList() {
  return request({
    url: '/word/',
    method: 'post'
  })
}

export function getWordById(wordId) {
  return request({
    url: '/word/getWord/',
    method: 'post',
    data: {
      wordId: wordId
    }
  })
}

export function addWord(data) {
  return request({
    url: '/word/add',
    method: 'post',
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    data: data
  })
}



export function updateWord(data) {
  return request({
    url: '/word/update',
    method: 'post',
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    data: data
  })
}

export function deleteWord(wordId) {
  return request({
    url: '/word/delete',
    method: 'post',
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
    data: {
      wordId: wordId
    }
  })
}
