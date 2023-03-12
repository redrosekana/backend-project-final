// import library
import express , { Express } from "express"
import mongoose, { connect } from "mongoose"
import morgan from "morgan"
import cors from "cors"
import * as dotenv from "dotenv"

// config dotenv
dotenv.config()

// import mainpoint && config passport
import { default as route } from "./router/route"

// declare value && configure value
const app:Express = express()
const port:string = String(process.env.PORT)

app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"100mb"}))
app.use(cors())
app.use(morgan("dev"))
app.set("view engine","ejs")
app.use(express.static("public"))

// set mongodb if don't set, it will occure in terminal 
mongoose.set("strictQuery",false)
const url_mongodb:string = String(process.env.URL_MONGODB)

// connect to mongodb database
connect(url_mongodb).catch(err => console.log(err))

app.use(route)

app.listen(port,():void => console.log("connect to port 5000"))
