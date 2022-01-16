let fileName = process.env.DB_PATH
console.log(fileName)
var Datastore = require('nedb')
    , db = new Datastore({filename: fileName, autoload: true});


async function insert(log) {
    db.loadDatabase(function (err) {    // Callback is optional
        // Now commands will be executed
    });
    // const dbInsert = promisify(db.insert); // (A)
    return new Promise((resolve, reject) => {
        db.insert(log, function (err, newDoc) {
            if (err) reject(err);
            else resolve(newDoc);
            // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
        });
    });
}

async function get(id) {
    db = new Datastore({filename: fileName, autoload: true});
    db.loadDatabase(function (err) {    // Callback is optional
        // Now commands will be executed
    });
    // const dbInsert = promisify(db.insert); // (A)
    return new Promise((resolve, reject) => {
        db.find({id: id}, function (err, newDoc) {
            console.log("newDoc",newDoc)
            if (err) reject(err);
            else resolve(newDoc);
            // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
        });
    });
}

module.exports = {
    db,
    insert,
    get
}
