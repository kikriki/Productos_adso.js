import productos from '../data/productos'

export const getProductById = (id) => productos.find((producto) => producto.id === id)

console.table(getProductById(20))

export const getProductByName = (nombre) => productos.find((producto) => producto.nombre === nombre)

//console.table(getProductByName('Base líquida tono claro')) 

export const getProductStockk = (id) => productos.find((producto) => producto.id === id) ? productos.find((producto) => producto.id === id).stock : 0

export const getAllProducts = () => productos

console.table(getAllProducts())


console.log(getProductStockk(20))