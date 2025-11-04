import express from 'express';
import cors from 'cors';
import { ItemsRoutes } from './routes/items.routes';
import { AuthRouter } from './routes/auth.routes';
import mongoose from 'mongoose';
import 'dotenv/config';

//toma la uri guardada en el ,env
const uri = `${process.env.MONGO_URI}`;

//inicia express
const app = express();

app.use(cors());//habilitar solicitudes a todos los origenes

//inicia la coneccion con mongo
await mongoose.connect(uri).then(()=>console.log("ola"));

app.use(express.json());//parsea el json provenientes de la solicitudes para colcarlo en la req.body

app.use('/auth', AuthRouter);//rutas de auth
app.use('/items',ItemsRoutes)

app.listen(3000, () => { console.log("ola2") })