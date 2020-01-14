let db = {
  //把数据存入localStorage
  save (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  //从localStorage查询数据
  get (key, defaultValue = {}) {
    return JSON.parse(localStorage.getItem(key)) || defaultValue
  },
  //从localStorage删除数据
  remove (key) {
    localStorage.removeItem(key)
  },
  //清空localStorage
  clear () {
    localStorage.clear()
  }
}
//供其他模块使用
export default db
