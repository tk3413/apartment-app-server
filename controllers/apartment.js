const apartments = require('../models').apartment
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const moment = require('moment')

exports.findAll = (req, res) => {
    console.log(`received request for all apartments`)
    apartments.findAndCountAll()
    .then(allApartments => {
        if(allApartments.count >0) {
            console.log(allApartments.count)
            res.send({count: allApartments.count})
        } else {
            console.log(`not able to find any apartments in DB`)
            res.sendStatus(404);
        }
    })
    .catch(error => {
        console.log(`error occured when finding all apartments in DB`)
        console.log(`${error}`)
        res.sendStatus(500)
    })
}

exports.findByAptNum = (req, res) => {
    console.log(`received request for apartment number: ${req.params.apt_num}`)
    apartments.findAndCountAll({
        where: { apt_num: req.params.apt_num },
        order: [[ 'updt_ts', 'DESC' ]]
    })
    .then(requestedApartments => {
        if(requestedApartments.count > 0) {
            console.log(`found ${requestedApartments.count} records for apt num ${req.params.apt_num}`)
            requestedApartments.rows.forEach(row => console.log(row.dataValues))
            res.send(requestedApartments.rows)
        } else {
            console.log(`unable to find apartment number ${req.params.apt_num} in DB`)
            res.sendStatus(404)
        }
    }).catch(error => {
        console.log(`an error occured while trying to find apartment number ${req.params.apt_num}!`)
        console.log(`${error}`)
        res.sendStatus(500)
    })
}

exports.create = (req, res) => {
    console.log(`received request to post new apt: `)
    console.log(req.body)
    apartments.findOrCreate({
        limit: 1,
        where:{ 
            [Op.and]: [
                { apt_num:   { [Op.eq]: req.body.apt_num }},
                { apt_price: { [Op.eq]: req.body.apt_price }}
            ]
        },
        order: [[ 'cret_ts', 'DESC' ]],
        defaults:{
            apt_num:    req.body.apt_num,
            apt_price:  req.body.apt_price,
            apt_nm_cd:  req.body.apt_nm_cd,
            apt_avl_dt: req.body.apt_avl_dt,
            apt_size:   req.body.apt_size,
            apt_type:   req.body.apt_type,
            cret_ts:  moment().format(),
            updt_ts: null
        }
    })
    .spread((newOrExistingApt, created) => {
       if(created) {
            console.log(`created new apt`)
            res.status(201).send(newOrExistingApt)
       } else {
            console.log(`${req.body.apt_nm_cd} apt number ${req.body.apt_num} already exists and price hasn't changed - updating timestamp for id:${newOrExistingApt.dataValues.id}`)
            this.update(newOrExistingApt, res)
        }
    })
    .catch(error => {
        console.log(`an error occured while checking to see if apt num ${req.body.apt_num} is already in the DB with a price of ${req.body.apt_price}`)
        console.log(`${error}`)
        res.sendStatus(500)
    })
}

exports.update = (apartment, res) => {
    apartment.update(
        { updt_ts: moment().format() }
    )
    .then(result => {
        console.log(`updated the timestamp for apartment id: ${apartment.id}`)
        res.sendStatus(200)
    })
    .catch(error => {
        console.log(`error occurred during update: `)
        console.log(error)
        res.sendStatus(500)
    })
}

exports.delete = (req, res) => {
    console.log(`received request to delete test apartments`)
    apartments.destroy({where: { apt_nm_cd: 'INTG-TEST'}})
    .then((numberRowsDeleted => {
        console.log(`deleted ${numberRowsDeleted} rows`)
        res.sendStatus(200)
    }))
    .catch(error => {
        console.log(`error occurred: ${error}`)
        res.sendStatus(500)
    })
}