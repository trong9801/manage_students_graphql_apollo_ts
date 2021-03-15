import cors from 'cors'
import http from 'http'
import dotenv from 'dotenv'
import schema from './schema'
import mongoose from 'mongoose'
import express from 'express'
import depthLimit from 'graphql-depth-limit'
import { ApolloServer  } from 'apollo-server-express'
import bodyParser from 'body-parser'

dotenv.config()

const port = process.env.port
const app = express();
const apolloServer = new ApolloServer({ schema, validationRules:[depthLimit(7)]})


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('*',cors())



apolloServer.applyMiddleware({app, path : '/graphql'})
    


http.createServer(app).listen(port, ()=>{
    console.log(`Server running to ${port}`)
})


mongoose.connect(`mongodb+srv://vutrong:${process.env.MG_pass}@cluster0.sllrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
        if (err) {

            throw err
        }
        console.log('connect database succerfull')

    }
)