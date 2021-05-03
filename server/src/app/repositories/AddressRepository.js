const db = require('../../database');

class AddressRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM address ORDER BY street');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM address WHERE id = $1', [id]);
    return row;
  }

  async create({ street, number, city, state, zip_code }) {
    const [row] = await db.query(
      `
    INSERT INTO address (
      street,
      number,
      city,
      state,
      zip_code
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
      [street, number, city, state, zip_code],
    );

    return row;
  }

  async update(id, { street, number, city, state, zip_code }) {
    const [row] = await db.query(
      `
      UPDATE address
      SET street = $1, number = $2, city = $3, state = $4, zip_code = $5
      WHERE id = $6
      RETURNING *
    `,
      [street, number, city, state, zip_code, id],
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM address WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new AddressRepository();
