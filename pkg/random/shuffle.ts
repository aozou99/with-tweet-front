export const shuffle = (arr: string[]) => {
  let n = arr.length
  let temp: any, i: number

  while (n) {
    i = Math.floor(Math.random() * n--)
    temp = arr[n]
    arr[n] = arr[i]
    arr[i] = temp
  }
  return arr
}
