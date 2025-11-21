import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.routes';
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

app.use('/auth', authRouter);//rutas de auth

//rutas para obtener archivos estaticos(html/css/js)
//express.static es un middleware que empaqueta? (creo) los archivos estaticos indicados en el path y para servirlo a los hosts
app.use('/',express.static("static/home"))
app.use('/components',express.static("static/components"))
app.use('/common',express.static("static/common"))
app.use('/images',express.static("static/img"))

app.listen(3000, () => { console.log("ola2") })