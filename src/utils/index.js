export function debounce(delay, callback) {
  // 防止重复调用的原理
  // 将调用的方法防止setTimeout的队列当中, 如果在间隔时间内再次点击,
  // 就会把前一个task进行移除, 然后创建一个新的setTimeout
  // 也就是说同一个delay时间内, 只允许存在一个task(一个任务队列)
  let taskId
  return function () {
    clearTimeout(taskId)
    taskId = setTimeout(() => {
      callback.apply(this.arguments)
    }, delay)
  }
}
