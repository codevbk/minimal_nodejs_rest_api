const express = require('express');
const {body, param, validationResult} = require('express-validator');
const { incrementDataCounter, getDataCounter, dataArray } = require('../data.js');
const router = express.Router();

//create validator for request POST method
const createSchemaValidator = [
    body('dataName').exists().withMessage('`dataName` is required field').isString().withMessage('`dataName` must be a string').isLength({ min: 1 }).withMessage('min 1 char'),
    body('dataContent').exists().withMessage('`dataContent` is required field').isString().withMessage('`dataContent` must be a string').isLength({ min: 1 }).withMessage('min 1 char')
];

//POST method
router.post('/create', createSchemaValidator, (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors);
            return res.status(400).json({ message: "Error!", errors: errors.array() });
        }

        const dataID = getDataCounter();
        const currentDate = new Date();

        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

        const dataCreatedDatetime = formattedDate; //yyyy-mm-dd hh:mm:ss
        const dataChangedDatetime = formattedDate; //yyyy-mm-dd hh:mm:ss
        const { dataName, dataContent } = req.body;

        const dataObject = {
            dataID: dataID,
            dataName: dataName,
            dataContent: dataContent,
            dataCreatedDatetime: dataCreatedDatetime,
            dataChangedDatetime: dataChangedDatetime
        };

        dataArray.push(dataObject);
        incrementDataCounter();

        return res.status(200).json({ message: "Data Created", data: { dataID: dataObject.dataID, dataName: dataObject.dataName, dataContent: dataObject.dataContent ,dataCreatedDatetime: dataObject.dataCreatedDatetime, dataChangedDatetime: dataObject.dataChangedDatetime } });
    }catch(error){
        console.error(error);
        return res.status(400).json({ message: "Error", errors: error });
    }
});

module.exports = router;