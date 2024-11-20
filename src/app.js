import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo'; // este no se si lo voy a usar
import {__dirname} from '../src/utils.js';

import dotenv from "dotenv"; //Para utilizar las variables de entorno

//Importamos los routers
import userRouter from './routes/user.router.js';
import apiRouter from './routes/api.router.js';

const app = express();


// Configuracion de variables de entorno 

dotenv.config(); //nos va a permitir trabajar con las variables de entorno

const uriMongo = process.env.URIMONGO || 'mongodb://localhost:27017/mongodb://localhost:27017/integrative-practice';
const PORT = process.env.PORT || 8080;
const firmaCookie = process.env.FIRMACOOKIE || "CoderSecret";

//Configuración de Express
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser(firmaCookie)); //Agregarmos una firma a las cookies
app.use(express.static(__dirname + '/public'));//Cargar la carpeta 'public'

//Configuración del motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');

//Configuramos y conectamos a la base de datos
mongoose.connect(uriMongo)
    .then( () => console.log(''))
    .catch((error) => console.error('Error en conexion:', error))
;

//Rutas base para vistas y API

app.use('/users', userRouter);
app.use('/api/users', apiRouter);


/*Agregar al router /api/sessions/ la ruta /current, la cual validará al usuario logueado y devolverá en una respuesta sus datos 
(Asociados al JWT).
Aca no se si hacer una router session, o dentro de user
ADemas tiene que tener un router para el log. Que no se si hacer uno o si dentrod e user
*/

//Iniciar el servidor. lo inicio en el puerto PORT que esta en .env
app.listen(PORT, ()=> {
    console.log("Listening on PORT: " + PORT);
}) 


