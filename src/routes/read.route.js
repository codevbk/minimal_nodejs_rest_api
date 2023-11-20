const express = require('express');
const {body, param, validationResult} = require('express-validator');
const { dataArray } = require('../data.js');
const router = express.Router();

//read validator for request GET method
const readSchemaValidator = [
    param('dataID').optional().isInt().withMessage('`DataID` must be an integer').custom((value) => {
        const selectedData = dataArray.find(data => data.dataID === parseInt(value));
        if (!selectedData) {
            throw new Error('DataID not found');
        }
        return true;
    }),
];

//GET method
router.get('/read/:dataID?', readSchemaValidator, (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Error!", errors: errors.array() });
        }
        const dataID = req.params.dataID;
        if (dataID) {
            const selectedData = dataArray.find(data => data.dataID === parseInt(dataID));
            if (selectedData) {
                return res.status(200).json({ message: "Data Readed", data: selectedData });
            }else{
                return res.status(404).json({ message: 'DataID not found' });
            }
        }else{
            return res.status(200).json({ message: "Data Fetched", data: dataArray });
        }
    }catch(error){
        console.error(error);
        return res.status(400).json({ message: "Error", errors: error });
    }
});

module.exports = router;