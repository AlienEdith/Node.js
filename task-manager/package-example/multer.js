const multer = require('multer')

const upload = multer({
    dest: '/',  // folder that stored the uploaded files
})