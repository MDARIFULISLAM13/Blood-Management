const express = require( 'express' );

const dotenv = require( 'dotenv' );
const { ConnectDb } = require( './DB/db' );
const allrouters = require( './routes/allRoutes' );
const cors = require( 'cors' );
const path = require( 'path' );
dotenv.config();


const app = express();
ConnectDb();
app.use( express.json() );
app.use( cors() );


app.use( '/api', allrouters );

const PORT = process.env.PORT;




app.listen( PORT, () =>
{
    console.log( `Server running on port ${PORT}` );
} );

