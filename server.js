const Express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const moment = require('moment')
const path = require('path')

const app = Express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(Express.static(path.join(__dirname, 'client/build')))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    cb(null, `${moment().format('MMM-YY-h:mm:ss')}_${file.originalname}`)
  }
})

const upload = multer({storage})

app.post('/api/upload', upload.single('selectedFile'), (req, res) => {
  res.send(res.data)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

const port = process.env.PORT || 2000

app.listen(port, (a) => {
  console.log('Listening to port 2000')
})