const {insert, get} = require('./../../../db-lib');

export default async function handler(req, res) {
    const { pid } = req.query
    let data = await get(pid)
    console.log(data)
    res.send(data)
}
