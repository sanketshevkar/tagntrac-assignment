const router = require('express').Router();
const Customer = require('../model/Customer');
const { USER_TYPE } = require('../constants');
const verify = require('./verifyToekn');
const { createShipmentValidation } = require('../validation');
const Shipment = require('../model/Shipment');

router.post('/create', verify, async (req, res) => {
    if (req.user.userType === USER_TYPE.CUSTOMER) {
        const { error } = createShipmentValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const shipment = new Shipment({
            senderName: req.body.senderName,
            receiverName: req.body.receiverName,
            senderId: req.user._id,
            description: req.body.description,
            from: req.body.from,
            to: req.body.to,
            lastLocation: req.body.lastLocation,
        });
        try {
            const savedShipment = await shipment.save();
            const allActiveShipments = await Shipment.find({
                senderId: req.user._id,
                active: true
            });
            res.send({
                newShipment: savedShipment,
                allActiveShipments
            });
        } catch (err) {
            res.status(400).send(err);
        }
        
    } else res.status(400).send("Only customers can create shipments");
})

router.post('/assign', verify, async (req, res) => {
    if (req.user.userType === USER_TYPE.ADMIN) {
        const currentDate = Date.now();
        const futureDate = new Date(currentDate);
        futureDate.setDate(futureDate.getDate() + 7);
        const futureTimestamp = futureDate.getTime();

        try {
            await Shipment.updateOne({
                _id: req.body.shipmentId
            }, {
                shipmentId: req.body.shipmentId,
                partnerId: req.body.partnerId,
                partner: req.body.partner,
                status: "Partner Assigned",
                expectedDay: futureTimestamp
            });
            const unassignedShipments = await Shipment.find({
                status: "Not Assigned",
                active: true
            });
            const assignedShipments = await Shipment.find({
                status: "Partner Assigned",
                active: true
            });
            res.send({
                unassignedShipments,
                assignedShipments
            });
        } catch (err) {
            res.status(400).send(err);
        }
        
    } else res.status(400).send("Only Admins can assign shipments");
})

router.post('/updateLocation', verify, async (req, res) => {
    if (req.user.userType === USER_TYPE.PARTNER) {
        const currentDate = Date.now();
        try {
            await Shipment.updateOne({
                _id: req.body.shipmentId
            }, {
                lastLocation: req.body.newLocation,
                lastLocationDate: currentDate,
            });
            const activeShipment = await Shipment.find({
                _id: req.body.shipmentId,
                active: true
            });
            res.send({
                activeShipment
            });
        } catch (err) {
            res.status(400).send(err);
        }
        
    } else res.status(400).send("Only Partners can update shipments");
})

router.post('/delivered', verify, async (req, res) => {
    if (req.user.userType === USER_TYPE.PARTNER) {
        const currentDate = Date.now();
        try {
            await Shipment.updateOne({
                _id: req.body.shipmentId
            }, {
                status: "Delivered",
                lastLocation: req.body.newLocation,
                lastLocationDate: currentDate,
                deliveryDay: currentDate,
                active: false
            });
            const activeShipment = await Shipment.find({
                _id: req.body.shipmentId,
                active: true
            });
            const pastShipments = await Shipment.find({
                partnerId: req.user._id,
                active: false
            });
            res.send({
                activeShipment,
                pastShipments
            });
        } catch (err) {
            res.status(400).send(err);
        }
        
    } else res.status(400).send("Only Partners can update shipments");
})

module.exports = router;