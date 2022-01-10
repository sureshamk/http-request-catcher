import {join, dirname} from 'path'
import {fileURLToPath} from 'url'
const loki = require('lokijs');
const formidable = require('formidable');
const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'example.db')
var db = new loki('./example.db');
var requests = db.addCollection('requests');
export default async function handler(req, res) {
    const {rawHeaders, httpVersion, method, socket, url, headers, query, body, fileData} = req;
    const {remoteAddress, remoteFamily} = socket;
    const log = {
        timestamp: Date.now(),
        headers,
        httpVersion,
        method,
        remoteAddress,
        remoteFamily,
        url,
        query,
        body,
        fileData
    }
    console.log(
        JSON.stringify(log)
    );
    await  requests.insert(log);

    let data = requests.find({})
    console.log(data)
    res.send(data)
}
