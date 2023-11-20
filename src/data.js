let dataCounter = 1;
let dataArray = [];

module.exports = {
    getDataCounter: () => dataCounter,
    incrementDataCounter: () => {
        dataCounter++;
        return dataCounter;
    },
    dataArray
};