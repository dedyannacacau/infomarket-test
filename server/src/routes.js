const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const AddressController = require('./app/controllers/AddressController');

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

router.get('/address', AddressController.index);
router.post('/address', AddressController.store);
router.put('/address/:id', AddressController.update);
router.delete('/address/:id', AddressController.delete);

module.exports = router;
