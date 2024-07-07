const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerControllers');

router.post('/',controller.createCustomer);
router.get('/',controller.getAllCustomers);
router.put('/:id',controller.updateCustomer);
router.delete('/:id',controller.deleteCustomer);
router.delete('/multiple/del',controller.deleteManyCustomers);

module.exports = router;