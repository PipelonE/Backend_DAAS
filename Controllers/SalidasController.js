const db = require('../Model/db_model').promise();

const RegistrarVenta = async (req, res) => {
    try {
      const { idProducto, cantidad, precio_unitario } = req.body;
      const connection = await db;
  
      // Verificar la cantidad disponible del producto
      const [productos] = await connection.query("SELECT cantidad FROM productos WHERE idProducto = ?", [idProducto]);
      if (productos.length === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      const cantidadDisponible = productos[0].cantidad;
  
      // Verificar si hay suficiente cantidad para la venta
      if (cantidadDisponible < cantidad) {
        return res.status(400).json({ message: 'Cantidad insuficiente para la venta' });
      }
  
      // Registrar la venta en la tabla detalle_venta
      const valoresVenta = {
        idProducto,
        cantidad,
        precio_unitario,
        subtotal: precio_unitario * cantidad,
        fecha_venta: new Date(),
      };
      await connection.query("INSERT INTO detalle_venta SET ?", valoresVenta);
  
      // Actualizar la cantidad del producto en la tabla productos
      await connection.query("UPDATE productos SET cantidad = cantidad - ? WHERE idProducto = ?", [cantidad, idProducto]);
  
      res.json({ message: 'Venta registrada exitosamente' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  const MostrarDetalleVenta = async (req,res)=>{
    try {
        const consulta ="SELECT dv.id_detalle_venta, p.nombreProducto, dv.cantidad, dv.precio_unitario, dv.subtotal, dv.fecha_venta FROM detalle_venta dv JOIN productos p ON dv.idProducto = p.idProducto ORDER BY dv.fecha_venta"
    const [resultado]= await db.query(consulta)

    console.log(resultado)
    res.json(resultado)   
    } catch (error) {
        console.log("Error al mostrar los productos",error)
        res.status(400).json({message:"Error al mostrar"})
    }
}


module.exports={
    RegistrarVenta,
    MostrarDetalleVenta
}
