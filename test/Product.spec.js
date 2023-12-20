Aserción de igualdad:

Puedes utilizar .to.equal() para verificar si dos valores son iguales.

javascript
Copy code
expect(valor).to.equal(42);
Aserción de tipo de datos:

Utiliza .to.be.a() o .to.be.an() para verificar el tipo de datos de un valor.

javascript
Copy code
expect(valor).to.be.a('string');
expect(valor).to.be.an('array');
Aserción de valores nulos:

Usa .to.be.null o .to.not.be.null para verificar si un valor es nulo o no es nulo, respectivamente.

javascript
Copy code
expect(valor).to.be.null;
expect(valor).to.not.be.null;
Aserción de inclusión:

Puedes utilizar .to.include() o .to.not.include() para verificar si un valor está incluido en una matriz u objeto.

javascript
Copy code
expect(array).to.include(valor);
expect(objeto).to.include({ clave: valor });
Aserción de longitud:

Usa .to.have.length() para verificar la longitud de una matriz o cadena.

javascript
Copy code
expect(array).to.have.length(5);
expect(cadena).to.have.length(10);
Aserción de rangos numéricos:

Utiliza .to.be.above() y .to.be.below() para verificar si un número es mayor o menor que otro número.

javascript
Copy code
expect(numero).to.be.above(50);
expect(numero).to.be.below(100);


const chai = require('chai');
const bcrypt = require('bcrypt');
const expect = chai.expect;

describe('Testing bcrypt Password Hashing', () => {
  it('debería hashear una contraseña de manera efectiva', async () => {
    const password = 'password123';

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Verifica que el resultado sea diferente a la contraseña original
    expect(hashedPassword).to.not.equal(password);
  });

  it('debería comparar una contraseña hasheada de manera efectiva', async () => {
    const password = 'password123';

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Compara la contraseña hasheada con la contraseña original
    const isMatch = await bcrypt.compare(password, hashedPassword);

    // Debe devolver true ya que deberían coincidir
    expect(isMatch).to.equal(true);
  });

  it('debería fallar en la comparación si la contraseña hasheada se altera', async () => {
    const password = 'password123';

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Altera la contraseña hasheada
    const alteredHashedPassword = hashedPassword.replace('a', 'b');

    // Compara la contraseña hasheada alterada con la contraseña original
    const isMatch = await bcrypt.compare(password, alteredHashedPassword);

    // Debe devolver false ya que no deberían coincidir
    expect(isMatch).to.equal(false);
  });
});



it('debería unificar nombre y apellido en una única propiedad', () => {
    const user = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
    };

    // Aplica el DTO
    const userDTO = UserDTO.transform(user);

    // Verifica que el DTO unifique el nombre y apellido
    expect(userDTO).to.have.property('full_name', 'John Doe');
    expect(userDTO).to.not.have.property('first_name');
    expect(userDTO).to.not.have.property('last_name');
  });

  it('debería eliminar propiedades innecesarias como password, first_name, last_name', () => {
    const user = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password: 'hashedpassword123', // Propiedad innecesaria
      other_property: 'other_value', // Otra propiedad innecesaria
    };

    // Aplica el DTO
    const userDTO = UserDTO.transform(user);

    // Verifica que el DTO elimine propiedades innecesarias
    expect(userDTO).to.not.have.property('first_name');
    expect(userDTO).to.not.have.property('last_name');
    expect(userDTO).to.not.have.property('password');
    expect(userDTO).to.not.have.property('other_property');
  });