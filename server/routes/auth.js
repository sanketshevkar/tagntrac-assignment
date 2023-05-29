const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const Customer = require('../model/Customer');
const Partner = require('../model/Partner');
const Admin = require('../model/Admin');
const { registrationValidation, loginValidation } = require('../validation');

const { USER_TYPE } = require('../constants');

router.post('/register', async (req, res) => {

    const { error } = registrationValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if(req.body.userType == USER_TYPE.CUSTOMER) {
        const emailExists = await Customer.findOne({ email: req.body.email });
        if (emailExists) return res.status(400).send('Email already exists');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const customer = new Customer({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        try{
            const savedCustomer = await customer.save();
            res.send({ customer: savedCustomer._id });
        } catch (err) {
            res.status(400).send(err);
        }
    } else if(req.body.userType == USER_TYPE.PARTNER) {
        const emailExists = await Partner.findOne({ email: req.body.email });
        if (emailExists) return res.status(400).send('Email already exists');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const partner = new Partner({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        try{
            const savedPartner = await partner.save();
            res.send({ customer: savedPartner._id });
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        res.status(400).send('Please select a correct role!');
    }
});

router.post('/login', async (req, res) => {

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if(req.body.userType == USER_TYPE.CUSTOMER) {
        const customer = await Customer.findOne({ email: req.body.email });
        if (!customer) return res.status(400).send('Email or password is incorrect');

        const validPass = await bcrypt.compare(req.body.password, customer.password);
        if(!validPass) return res.status(400).send('Email or password is incorrect');

        const token = jwt.sign({
            _id: customer._id,
            userType: USER_TYPE.CUSTOMER
        }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);

    } else if(req.body.userType == USER_TYPE.PARTNER) {
        const partner = await Partner.findOne({ email: req.body.email });
        if (!partner) return res.status(400).send('Email or password is incorrect');

        const validPass = await bcrypt.compare(req.body.password, partner.password);
        if(!validPass) return res.status(400).send('Email or password is incorrect');

        const token = jwt.sign({
            _id: partner._id,
            userType: USER_TYPE.PARTNER
        }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    } else if(req.body.userType == USER_TYPE.ADMIN) {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) return res.status(400).send('Email or password is incorrect');

        const validPass = await bcrypt.compare(req.body.password, admin.password);
        if(!validPass) return res.status(400).send('Email or password is incorrect');

        const token = jwt.sign({
            _id: admin._id,
            userType: USER_TYPE.ADMIN
        }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    } else {
        res.status(400).send('Please select a correct role!');
    }
});




module.exports = router;