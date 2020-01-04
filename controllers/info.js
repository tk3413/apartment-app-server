const info = require('../models').info

exports.findAll = (req, res) => {
    console.log(`received request for all apartment info`)
    res.send(200)
}

exports.findByAptNmCd = (req, res) => {
    console.log(`received request for apartment info for name code: ${req.query.apt_nm_cd}`)
    res.send(200)
}

exports.create = (req, res) => {
    console.log(`received request to post apt info: `)
    res.send(201)
}