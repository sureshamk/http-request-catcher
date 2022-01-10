const express = require('express')
const next = require('next')


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
app.prepare().then(() => {
    const server = express()
    // for parsing application/json
    server.use(bodyParser.json());
    // const upload = multer({ dest: __dirname+'/uploads/' })

    server.use((req, res, next) => {
        req.fileData = {}
        next()
    });
    let filePath = __dirname + '/uploads/';
    let urlPrefix = "http://localhost:300/download/"
    var storage = multer.diskStorage({
        destination: filePath,
        filename: function (req, file, cb) {
            let newName = Date.now() +"___"+ file.originalname
            cb(null, newName)
            // cb(null, file.originalname)
            req.fileData[file.fieldname] = urlPrefix + "/" + file.originalname;
        }
    })
    const upload = multer({storage: storage})
    server.use(upload.any());
    server.use((error, req, res, next) => {
        console.log('This is the rejected field ->', error.field);
    });

// for parsing application/xwww-
    server.use(bodyParser.urlencoded({extended: true}));
    server.all('*', (req, res) => {
        return handle(req, res)
    })
    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
