const https = require('https')
const fs = require('fs')
let photos = []
let opt = 'full' // raw, full, regular, small, thumb

function getImageData (page = 1) {
  console.log('Get data from unsplash...')
  https.get(`https://unsplash.com/napi/users/doubibi/likes?page=${page}&per_page=10&order_by=lateest`, res => {
    let data = ''
    res.on('data', chunk => { data += chunk })
    res.on('end', () => {
      data = JSON.parse(data)
      if (data.length) {
        photos = photos.concat(data)
        getImageData(page + 1)
      } else {
        console.log(`Get ${photos.length} data.`)
        downloadImg()
      }
    })
  }).on("error", err => {
    console.error('Error: ' + e.message)
  })
}

function downloadImg (i = 0) {
  const img = photos[i]
  if (!img) {
    console.log('All photos has been download.')
    return
  }
  const url = img.urls[opt]
  console.log('Start download img.')
  const str = url.match(/\&s=\w+/)
  const name = str ? str[0].replace('&s=', '') : Math.random().toString(16).substr(2)
  fs.stat(`./download/${name}.jpg`, (err, stat) => {
    if (stat && stat.isFile()) {
      console.log('File already exists.')
      downloadImg(i + 1)
    } else {
      https.get(url, res => {
        let data = ''
        res.setEncoding("binary")
        res.on('data', chunk => { data += chunk })
        res.on('end', () => {
          fs.writeFile(`./download/${name}.jpg`, data, 'binary', e=> {
            if (e) console.error('Error: ' + e.message)
            else console.log(`${i + 1} photo saved.`)
            downloadImg(i + 1)
          })
        })
      }).on('error', e => {
        console.error('Error: ' + e.message)
        downloadImg(i + 1)
      })
    }
  })   
}

getImageData()
