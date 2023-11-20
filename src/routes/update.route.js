const express = require('express');
const {body, param, validationResult} = require('express-validator');
const { dataArray } = require('../data.js');
const router = express.Router();

//update validator for request PUT method
const updateSchemaValidator = [
    param('dataID').exists().withMessage('`dataID` is required param').isInt().withMessage('`DataID` must be an integer').custom((value) => {
        const selectedData = dataArray.find(data => data.dataID === parseInt(value));
        if (!selectedData) {
            throw new Error('DataID not found');
        }
        return true;
    }),
    body('dataName').exists().withMessage('`dataName` is required field').isString().withMessage('`dataName` must be a string').isLength({ min: 1 }).withMessage('min 1 char'),
    body('dataContent').exists().withMessage('`dataContent` is required field').isString().withMessage('`dataContent` must be a string').isLength({ min: 1 }).withMessage('min 1 char')
];

//PUT method
router.put('/update/:dataID', updateSchemaValidator, (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Error!", errors: errors.array() });
        }

        const dataID = req.params.dataID;
        const newData = req.body;
        if (dataID && newData) {
            const selectedDataIndex = dataArray.findIndex(data => data.dataID === parseInt(dataID));

            if (selectedDataIndex === -1) {
                return res.status(404).json({ message: 'DataID not found' });
            }
            const currentDate = new Date();

            const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

            console.log(formattedDate);

            dataArray[selectedDataIndex].dataName = newData.dataName;
            dataArray[selectedDataIndex].dataContent = newData.dataContent;
            dataArray[selectedDataIndex].dataChangedDatetime = formattedDate; //yyyy-mm-dd hh:mm:ss
            return res.status(200).json({ message: "Data Updated", data: dataArray[selectedDataIndex] });
        }else{
            return res.status(200).json({ message: "Data Fetched", data: dataArray });
        }
    }catch(error){
        console.error(error);
        return res.status(400).json({ message: "Error", errors: error });
    }
});

module.exports = router;