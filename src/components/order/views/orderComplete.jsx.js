import React, { useState, useEffect } from "react";

import { OrderService } from "../services/orderService";

const OrderCompleteView = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    OrderService.get().then((order) => {
      setOrder(order);
    });
  }, []);

  return (
    <div className="container">
      <h1>Estado del pedido</h1>

      <p>
        El estado de tu pedido es: {order.status}
      </p>

      <button onClick={() => navigate("/")}>Volver a la página de inicio</button>
    </div>
  );
};

export default OrderCompleteView;

