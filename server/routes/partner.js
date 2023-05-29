const router = require('express').Router();
const Partner = require("../model/Partner");
const verify = require('./verifyToekn');
const { USER_TYPE } = require('../constants');

router.get('/getPartners', verify, async (req, res) => {
    if (req.user.userType === USER_TYPE.ADMIN) {
        try {
            const unassignedPartners = await Partner.find({
                isAssigned: false
            });
            const partnerList = unassignedPartners.map((partner) => {
                return {
                    _id: partner._id,
                    name: partner.name
                }
            })
            res.send({
                partnerList
            });
        } catch (err) {
            res.status(400).send(err);
        }
        
    } else res.status(400).send("Only Admins can assign shipments");
})

module.exports = router;