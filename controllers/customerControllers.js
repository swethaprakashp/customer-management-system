const Customer = require('../models/customerModel');
const uuidv4 = require('uuid').v4;

//Post API to create a customer
exports.createCustomer = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
        }
        const customer = new Customer({
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
        });
        await customer.save();
        res.send({ message: "Customer created successfully!" });
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Customer."
        });;
    }
};

//Get API to get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.send(customers);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while fetching customers."
        });;
    }
}

//Update API to update a customer data
exports.updateCustomer = async (req, res) => {
    try {
        const customerId = { id : req.params.id };
        const customer = await Customer.findOneAndUpdate(customerId, req.body, { new: true });
        if (!customer) {
            return res.status(404).send({ message: "Customer not found." });
        }
        res.send(customer);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating customer data."
        });;
    }
}

//Delete API to delete a customer
exports.deleteCustomer = async (req, res) => {
    try {
        const customerId = { id : req.params.id };
        const customer = await Customer.findOneAndDelete(customerId);
        console.log('cus', customer)
        if (!customer) {
            return res.status(404).send({ message: "Customer not found." });
        }
        res.send({ message: "Customer deleted successfully!" });
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting a customer."
        });;
    }
}

//Delete All API to delete all customers
exports.deleteAllCustomers = async (req, res) => {
    try {
        const deletedCustomers = await Customer.deleteMany();
        res.send({
            message: `${deletedCustomers.deletedCount} customers deleted successfully!`
        });
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting all customers."
        });;
    }
}