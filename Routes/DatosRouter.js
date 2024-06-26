const express = require("express");
const salidacontrol = require('../Controllers/SalidasController')
const salidaDatos = express.Router();

salidaDatos.post('/regis_venta', salidacontrol.RegistrarVenta);
salidaDatos.get('/ver_ventas', salidacontrol.MostrarDetalleVenta);

module.exports=salidaDatos;