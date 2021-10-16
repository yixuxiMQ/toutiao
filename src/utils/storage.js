export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    // 将data转为字符串格式
    return JSON.parse(data)
  } catch (error) {
    // 若data不是字符串，就原样返回
    return data
  }
}

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
