import React, { useState, useEffect } from "react";

import { ProductService } from "../services/productService";

const CartView = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    ProductService.get().then((products) => {
      setProducts(products);
    });
  }, []);

  const handleAddProduct = () => {
    ProductService.add(product).then(() => {
      setProducts((products) => [...products, product]);
      setProduct(null);
    });
  };

  const handleOrder = () => {
    navigate("/order");
  };

  return (
    <div className="container">
      <h1>Carrito</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <span>${product.price}</span>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddProduct}>
        <input type="text" placeholder="Nombre del producto" />
        <input type="number" placeholder="Precio" />
        <button type="submit">Agregar</button>
      </form>

      <button onClick={handleOrder}>Realizar pedido</button>
    </div>
  );
};

export default CartView;
