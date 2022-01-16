const express = require('express')
const next = require('next')
const util = require('util');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const {randomUUID} = require('crypto');
const {insert} = require('./db-lib');


app.prepare().then(() => {


    process.env.API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost'
    const server = express()
    // for parsing application/json
    server.use(bodyParser.json());
    // const upload = multer({ dest: __dirname+'/uploads/' })

    server.use((req, res, next) => {
        req.fileData = {}
        next()
    });
    let filePath = __dirname + '/uploads/';
    let urlPrefix = process.env.API_ENDPOINT + "/download/"
    var storage = multer.diskStorage({
        destination: filePath,
        filename: function (req, file, cb) {
            let newName = Date.now() + "___" + file.originalname
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

    server.use(bodyParser.urlencoded({extended: true}));
    server.get('/demo', function (req, res) {
        res.send('GET request to the homepage')
    })
    server.all('/capture/:id', async (req, res) => {
        const {id} = req.params
        console.log(id)
        const {rawHeaders, httpVersion, method, socket, url, headers, query, body, fileData} = req;
        const {remoteAddress, remoteFamily} = socket;
        const requestId = randomUUID();
        const log = {
            timestamp: Date.now(),
            requestId,
            headers,
            httpVersion,
            method,
            remoteAddress,
            remoteFamily,
            url,
            query,
            body,
            fileData,
            id
        }
        console.log(
            JSON.stringify(log)
        );

        let d = await insert(log)

        console.log(d)
        res.send(d)
    })
    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on 0.0.0.0:${port}`)
    })
})
