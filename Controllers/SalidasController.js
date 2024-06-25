const db = require('../Model/db_model').promise();

const AgregarProducto = async (req, res)=>{
    try{
        const {nombre_producto, valor_unitario, descripcion_producto, estado_producto} = req.body;
        const valores ={nombre_producto, valor_unitario, descripcion_producto, estado_producto}
        const connection = await db;
        const result = await connection.query("INSERT INTO productos SET ?", valores)
        res.json(result)
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
};



module.exports={
    AgregarProducto
}
