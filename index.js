const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

const apartments = require('./controllers/apartment')
const info = require('./controllers/info')

app.use(bodyParser.json())

// apartments
app.get('/apartments', apartments.findAll)
app.get('/apartments/:apt_num', apartments.findByAptNum)
app.post('/apartments', apartments.create)
app.delete('/apartments', apartments.delete) // only for integration tests


// apartment info
app.get('/apartment-info', info.findAll)
app.get('/apartment-info/:apt_nm_cd', info.findByAptNmCd)
app.post('/apartment-info', info.create)

// health
app.get('/health', (req, res) => { 
    console.log('health checked')
    res.sendStatus(200)
})

app.listen(port, () => console.log(`apartment-app listening on port ${port}!`))