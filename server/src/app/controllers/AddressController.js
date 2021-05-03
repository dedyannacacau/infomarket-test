const AddressRepository = require('../repositories/AddressRepository');

class AddressController {
  async index(request, response) {
    // Listar todos os registros de endereço
    const address = await AddressRepository.findAll();

    return response.json(address);
  }

  async store(request, response) {
    // Criar um novo registro de endereço
    const { street, number, city, state, zip_code } = request.body;

    const address = await AddressRepository.create({
      street,
      number,
      city,
      state,
      zip_code,
    });

    return response.json(address);
  }

  async update(request, response) {
    // Editar um registro de endereço
    const { id } = request.params;
    const { street, number, city, state, zip_code } = request.body;

    const addressExists = await AddressRepository.findById(id);

    if (!addressExists) {
      return response.status(404).json({ error: 'Address not found' });
    }

    const address = await AddressRepository.update(id, {
      street,
      number,
      city,
      state,
      zip_code,
    });

    return response.json(address);
  }

  async delete(request, response) {
    // Deletar um registro de endereço
    const { id } = request.params;

    await AddressRepository.delete(id);

    return response.sendStatus(204);
  }
}

module.exports = new AddressController();
