import express from "express";
import colors from "colors";
import * as dotenv from "dotenv"
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import schema from './schema/schema.js ';
import connectDB from './config/db.js'

dotenv.config()
const port = process.env.PORT || 4000;

// connect to database
connectDB()

const app = express();

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`Server running on port: http://localhost:${port}`));