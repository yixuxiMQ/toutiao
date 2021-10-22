import request from '@/utils/request'

// 获取搜索联想建议
export const getSearchSuggestion = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取搜索结果
// params是添加到url的请求字符串中的，用于get请求。

// data是添加到请求体（body）中的， 用于post请求。
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}

// data是添加到请求体（body）中的， 用于post请求。
export const getSearchHistories = () => {
  return request({
    method: 'GET',
    url: '/v1_0/search/histories'
  })
}
