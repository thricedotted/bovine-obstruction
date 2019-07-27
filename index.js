const express = require('express')
const { promisify } = require('util')
const { readdir } = require('fs')

const readDirAsync = promisify(readdir)

const app = express()
const port = 3000

app.get('/cows.json', (req, res) => {
  Promise.all([
    readDirAsync('./public/images'),
    readDirAsync('./public/sounds')
  ]).then(values => {
    const cows = {
      images: values[0].map(img => `/images/${img}`),
      sounds: values[1].map(sound => `/sounds/${sound}`)
    }
    res.send(cows)
  })
})

app.use(express.static('./public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
