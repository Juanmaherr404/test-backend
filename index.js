const express = require('express'); // Importar express
const db = require('./initdb'); // Importar la base de datos
const morgan = require('morgan'); // Importar morgan
const geoip = require('geoip-lite'); // Importar geoip-lite
const PORT = 3000; // Definir el puerto
const app = express(); // Crear una instancia de express

app.use(morgan('combined')); // Usar morgan para registrar las solicitudes HTTP

app.get('/', (req, res) => { // Crear una ruta
    res.send('Hola Mundo'); // Enviar una respuesta
});

app.get("/imagenes", (req, res) => { // Crear una ruta
    const ip = req.ip;
    const userAgent = req.get("User-Agent");
    const fecha = new Date().toISOString();
    const localizacion = geoip.lookup(ip);
    const insert = db.prepare("INSERT INTO usuarios (ip, userAgent, localizacion, fecha) VALUES (?, ?, ?, ?)"); // Preparar una consulta
    insert.run(ip, userAgent, localizacion, fecha); // Ejecutar una consulta

    const imagenes = [
        "1.jpg",
        "2.jpg",
        "3.jpg",
        "4.jpg",
        "5.jpg",
    ]
    const numeroAleatorio = Math.floor(Math.random() * imagenes.length);
    const imagen = imagenes[numeroAleatorio];
    res.sendFile(__dirname + `/${imagen}`); // Enviar una respuesta
});

app.get("/usuarios", (req, res) => { // Crear una ruta
    const stmt = "SELECT * FROM usuarios"; // Preparar una consulta
    const usuarios = db.prepare(stmt).all(); // Ejecutar una consulta
    res.json(usuarios); // Enviar una respuesta
});

app.listen(PORT, () => { // Crear una ruta
    console.log(`Servidor corriendo en el puerto ${PORT}`); // Imprimir un mensaje en la consola con el puerto
})

