const UsersRepository = require('../repositories/UsersRepository');

class UserController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const users = await UsersRepository.findAll(orderBy);

    return response.json(users);
  }

  async show(request, response) {
    // Listar um registro
    const { id } = request.params;

    const user = await UsersRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    return response.json(user);
  }

  async store(request, response) {
    // Criar um novo registro de pessoa
    const { name, email, phone, address_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const userExists = await UsersRepository.findByEmail(email);

    if (userExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    const user = await UsersRepository.create({
      name,
      email,
      phone,
      address_id,
    });

    return response.json(user);
  }

  async update(request, response) {
    // Editar um registro
    const { id } = request.params;
    const { name, email, phone, address_id } = request.body;

    const userExists = await UsersRepository.findById(id);

    if (!userExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const userExistsByEmail = await UsersRepository.findByEmail(email);

    if (userExistsByEmail && userExistsByEmail.id !== id) {
      return response.status(400).json({ error: 'User already exists' });
    }

    const user = await UsersRepository.update(id, {
      name,
      email,
      phone,
      address_id,
    });

    return response.json(user);
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    await UsersRepository.delete(id);

    return response.sendStatus(204);
  }
}

module.exports = new UserController();
