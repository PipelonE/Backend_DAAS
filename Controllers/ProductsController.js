const db = require('../Model/db_model').promise();

const AgregarProducto = async (req, res) => {
    try {
        const { nombreProducto, codigoProducto, descripcion, precio, cantidad, estado } = req.body;
        const connection = await db;

        // Verificar si el producto con el mismo código ya existe
        const [existingProduct] = await connection.query("SELECT * FROM productos WHERE codigoProducto = ?", [codigoProducto]);

        if (existingProduct.length > 0) {
            // Si el producto existe, actualizar la cantidad
            const updatedQuantity = existingProduct[0].cantidad + parseInt(cantidad, 10);
            await connection.query("UPDATE productos SET cantidad = ? WHERE codigoProducto = ?", [updatedQuantity, codigoProducto]);
            res.json({ message: 'Cantidad actualizada', product: existingProduct[0] });
        } else {
            // Si el producto no existe, insertar uno nuevo
            const valores = { nombreProducto, codigoProducto, descripcion, precio, cantidad, estado };
            const result = await connection.query("INSERT INTO productos SET ?", valores);
            res.json(result);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const MostrarProductos = async (req,res)=>{
    try {
        const consulta = "SELECT * FROM productos WHERE  estado=1"
    const [resultado]= await db.query(consulta)

    console.log(resultado)
    res.json(resultado)   
    } catch (error) {
        console.log("Error al mostrar los productos",error)
        res.status(400).json({message:"Error al mostrar"})
    }
}
const MostrarTotalProductos = async (req,res)=>{
    try {
        const consulta = "SELECT SUM(cantidad)  AS total_cantidad FROM productos"
    const [resultado]= await db.query(consulta)

    console.log(resultado)
    res.json(resultado)   
    } catch (error) {
        console.log("Error al mostrar los productos",error)
        res.status(400).json({message:"Error al mostrar"})
    }
}

module.exports={
    AgregarProducto,
    MostrarProductos,
    MostrarTotalProductos
}
