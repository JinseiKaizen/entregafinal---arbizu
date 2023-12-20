const roleService = require("../../roles/services/rolesService");
const canDelete = (req, res, next) => {
  const { id } = req.params;
  if(req.user.rol_id.toString() !== roleService.admin){
    return res.json({message: "No tienes Permisos para eliminar"});
  }
  next();
}

module.exports = {

}