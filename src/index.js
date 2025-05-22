import { useState, useEffect } from 'react';
import {getProductById, getProductStockk, getAllProducts, getProductByName} from './bases/mostrar-productos';
import './index.css';
import ReactDom from 'react-dom/client';

const getProductStockAsync = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = getProductById(Number(id));
      const stock = getProductStockk(Number(id));
      const compra = Number(document.getElementById("cantidad").value)
      if (stock >= compra) {
        resolve(`Compra de ${producto.nombre} exitosa ✔`);
      } else {
        reject(
          `No se pudo comprar el producto ${producto.nombre}, solo hay ${stock} unidades ❌`
        );
      }
    }, 2000);
  });
};

const getProductByIdAsync = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = getProductById(Number(id));
      if (producto) {
        resolve(producto);
      } else {
        reject(`No se encontró el producto con id ${id}`);
      }
    }, 2000);
  });
};

const getProductByNameAsync = (nombre) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = getProductByName(nombre);
      if (producto) {
        resolve(producto);
      } else {
        reject(`No se encontró el producto con nombre ${nombre}`);
      }
    }, 2000);
  });
};

const getAllProductsAsync = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const prods = getAllProducts();
      resolve(prods);
    }, 2000);
  });
};

const App = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getAllProductsAsync().then(setProductos);
  }, []);

  function productByName(nombre) {
    getProductByNameAsync(nombre)
      .then((producto) => setProductos([producto]))
      .catch(alert);
  }

  function productById(id) {
    getProductByIdAsync(id)
      .then((producto) => setProductos([producto]))
      .catch(alert);
  }

  function AllProducts() {
    getAllProductsAsync().then(setProductos);
  }

  function comprar(id) {
    getProductStockAsync(id)
      .then(alert)
      .catch(alert)
      .finally(() => {
        getAllProductsAsync().then(setProductos);
      });
  }

  return (
    <div className="App">
      <h1>Productos</h1>

      <div className="inputs">
        <input type="text" placeholder="nombre del producto" id="nombre" />
        <input type="number" placeholder="cantidad" id="cantidad" />
        <input type="number" placeholder="id" id="id" />
      </div>

      <div className="botones">
        <button className="boton" onClick={AllProducts}>
          Mostrar Todos
        </button>
        <button
          className="boton"
          onClick={() =>
            productByName(document.getElementById('nombre').value)
          }
        >
          Producto por Nombre
        </button>
        <button
          className="boton"
          onClick={() => productById(document.getElementById('id').value)}
        >
          Producto por Id
        </button>
        <button
          className="boton"
          onClick={() => comprar(document.getElementById('id').value)}
        >
          Comprar
        </button>
      </div>

      <table className="table">
        <thead className="thead">
          <tr>
            <td>Id</td>
            <td>Nombre</td>
            <td>Precio</td>
            <td>Stock</td>
          </tr>
        </thead>
        <tbody className="tbody">
          {Array.isArray(productos) &&
            productos.map((producto) => (
              <tr key={producto.id}>
                <td
                  onDoubleClick={() =>
                    (document.getElementById('id').value = producto.id)
                  }
                >
                  {producto.id}
                </td>
                <td
                  onDoubleClick={() =>
                    (document.getElementById('nombre').value = producto.nombre)
                  }
                >
                  {producto.nombre}
                </td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(<App />);
