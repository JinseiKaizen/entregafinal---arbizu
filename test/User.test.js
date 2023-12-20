import mongoose from "mongoose";
import User from '../src/dao/Users.dao.js';
import Assert from "assert";
const connection = mongoose.connect(`mongodb+srv://manzano:R91GSBjvF0nTEncU@empowermentlab.gj9tokx.mongodb.net/clase52225?retryWrites=true&w=majority`)

const assert = Assert.strict;

describe('Testing User Dao', () => {
  // Antes de todas las pruebas en este bloque describe
  before(function () {
    this.userDao = new User();
    console.log('Ejecutando antes de todas las pruebas');
  });


  it("El DAO debe poder obetener los usuarios en formato arreglo", async function (){
    const result = await this.userDao.get();
    assert.strictEqual(Array.isArray(result), true);
  });

});