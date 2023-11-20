const express = require('express');
const {body, param, validationResult} = require('express-validator');
const { dataArray } = require('../data.js');
const router = express.Router();

//delete validator for request GET method
const deleteSchemaValidator = [
    param('dataID').optional().isInt().withMessage('`DataID` must be an integer').custom((value) => {
        const selectedData = dataArray.find(data => data.dataID === parseInt(value));
        if (!selectedData) {
            throw new Error('DataID not found');
        }
        return true;
    }),
];

//DELETE method
router.delete('/delete/:dataID?', deleteSchemaValidator, (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Error!", errors: errors.array() });
        }

        const dataID = req.params.dataID;
        if (dataID) {
            const selectedDataIndex = dataArray.findIndex(data => data.dataID === parseInt(dataID));
            if (selectedDataIndex === -1) {
                return res.status(404).json({ message: 'DataID not found' });
            }
            dataArray.splice(selectedDataIndex, 1);

            return res.status(200).json({ message: 'Data deleted', data: { dataID : parseInt(dataID) }});
        }else{
            dataArray.length = 0;
            return res.status(200).json({ message: "All Data Deleted", data: dataArray });
        }
    }catch(error){
        console.error(error);
        return res.status(400).json({ message: "Error", errors: error });
    }
});

module.exports = router;