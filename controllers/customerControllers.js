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
        res.status(200).send({ message: "Customer created successfully!" });
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
        res.status(200).send(customers);
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
        res.status(200).send(customer);
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
    console.log('hello')
    try {
        const customerId = { id : req.params.id };
        const customer = await Customer.findOneAndDelete(customerId);
        if (!customer) {
            return res.status(404).send({ message: "Customer not found." });
        }
        res.status(200).send({ message: "Customer deleted successfully!" });
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting a customer."
        });;
    }
}

//Delete All API to delete multiple customers
exports.deleteManyCustomers = async (req, res) => {
    const { ids} = req.body;
    try {
        const deletedCustomers = await Customer.deleteMany({
            id : { $in: ids }
        });
        console.log(deletedCustomers)
        res.status(200).send({
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