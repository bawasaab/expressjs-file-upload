var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const path = require('path')
const fs = require('fs')
const multer = require('multer')
const CUST_IMG_PATH = 'public/images/customer'

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    const path = CUST_IMG_PATH
    if(!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true })
    } 
    cb(null, CUST_IMG_PATH)
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + path.extname(file.originalname)
    req.body.img = fileName
    cb(null, fileName)
  },
  limits: { fileSize: 100000000 }
})

const uploads = multer({ storage: storage, limits: { fileSize: 100000000 }})

router.post('/upload', [
  uploads.single('img'),
  (req, res, next) => {
    res.send({
      msg: 'Hi'
    })
  }
])

module.exports = router;
