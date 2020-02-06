const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const { ApolloServer, gql } = require('apollo-server-express')

const typeDefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

const apartments = require('./controllers/apartment')
const info = require('./controllers/info')

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

app.listen(port, () => console.log(`apartment-app listening on port ${port}, graphql: ${server.graphqlPath}!`))