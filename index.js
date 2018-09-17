const axios = require('axios')
const fs = require('fs')
let page = 1



// 获取图片分页数据
function getImageDataByPage () {
  axios.get('https://unsplash.com/napi/users/doubibi/likes', {
    params: { page: page, per_page: 10, order_by: 'lateest' }
  }).then(res => {
    console.log(`Get ${res.data.length} data.`)
  }).catch(e => {
    console.error('Error: ' + e.message)
  })
}
// 获取图片
function getImg (url) {
  return axios.get(url, { responseType: 'blob' }).then(res => {
    console.log(url)
  }).catch(e => {
    console.error('Error: ' + e.message)
  })
}
// 保存图片
function saveImg (imgData) {
  fs.writeFile('./download/', imgData, 'binary', e => {
    if (e) console.error('Error: ' + e.message)
    else console.log('Image saved.')
  })
}

// function getImgDataByPage () {
//   https.get(`https://unsplash.com/napi/users/doubibi/likes?page=${page}&order_by=latest`, res => {
//     let data = ''
//     res.on('data', chunk => { data += chunk })
//     res.on('end', () => {
//       data = JSON.parse(data)
//       if (data.length) {
//         saveImg(data, () => {
//           page += 1
//           getImgData()
//         })
//       } else {
//         console.log('Saved all img.')
//       }
//     })
//   }).on('error', err => {
//     console.log('ERROR: ' + err.message)
//   })
// }

getImageDataByPage()


    // fs.writeFile('like.html', data, e => {
    //   if (e) return console.error(e)
    //   console.log('Html saved.')
    // })
