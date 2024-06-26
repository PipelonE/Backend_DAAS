const express = require('express')
const controlProducto =require("../Controllers/ProductsController")
const ProductsRutas=express.Router()

ProductsRutas.post('/regis_pro', controlProducto.AgregarProducto);
ProductsRutas.get('/ver_pro', controlProducto.MostrarProductos);
ProductsRutas.get('/ver_total_pro', controlProducto.MostrarTotalProductos);

module.exports=ProductsRutas;