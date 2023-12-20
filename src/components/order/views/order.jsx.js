import React, { useState, useEffect } from "react";
import { OrderService } from "../services/orderService";

const OrderView = () => {
  const [order, setOrder] = useState({
    customerName: "",
    customerLastName: "",
    address: "",
    city: "",
    country: "",
    paymentMethod: "",
    products: [],
  });

  useEffect(() => {
    OrderService.get().then((order) => {
      setOrder(order);
    });
  }, []);

  const handleAddProduct = (event) => {
    event.preventDefault();

    const productName = event.target.elements.productName.value;
    const productPrice = event.target.elements.productPrice.value;

    setOrder((prevState) => {
      const updatedProducts = [...prevState.products, {
        name: productName,
        price: productPrice,
      }];

      return {
        ...prevState,
        products: updatedProducts,
      };
    });
  };

  const handleSubmit = () => {
    OrderService.create(order).then(() => {
      navigate("/orderComplete");
    });
  };

  return (
    <div className="container">
      <h1>Realizar pedido</h1>

      <form onSubmit={handleAddProduct}>
        <input type="text" name="productName" placeholder="Nombre del producto" />
        <input type="number" name="productPrice" placeholder="Precio" />
        <button type="submit">Agregar</button>
      </form>

      <form onSubmit={handleSubmit}>
        <input type="text" name="customerName" placeholder="Nombre" />
        <input type="text" name="customerLastName" placeholder="Apellido" />
        <input type="text" name="address" placeholder="Dirección" />
        <input type="text" name="city" placeholder="Ciudad" />
        <input type="text" name="country" placeholder="País" />
        <select name="paymentMethod">
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta de crédito">Tarjeta de crédito</option>
          <option value="tarjeta de débito">Tarjeta de débito</option>
        </select>
        <button type="submit">Confirmar</button>
      </form>
    </div>
  );
};

export default OrderView;
