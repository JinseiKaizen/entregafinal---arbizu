import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/userService";

const UserView = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = useNavigate().query.id;

    if (id) {
      UserService.get(id).then((response) => {
        setUser(response);
      });
    }
  }, []);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Usuario</h1>
      <div>
        <label>Nombre</label>
        <input type="text" value={user.name} disabled />
      </div>
      <div>
        <label>Correo electrónico</label>
        <input type="text" value={user.email} disabled />
      </div>
      <div>
        <label>Rol</label>
        <select value={user.role} disabled>
          <option value="admin">Administrador</option>
          <option value="user">Usuario</option>
        </select>
      </div>
      <div>
        <button onClick={() => setUser(null)}>Cancelar</button>
        <button onClick={() => handleDelete()}>Eliminar</button>
      </div>
    </div>
  );
};

const handleDelete = () => {
  const id = useNavigate().query.id;

  UserService.delete(id).then(() => {
    useNavigate("/");
  });
};

export default UserView;
