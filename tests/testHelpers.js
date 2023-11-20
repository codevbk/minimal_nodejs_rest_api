const supertest = require('supertest');

const createData = async (app, data) => {
    return await supertest(app)
        .post('/create')
        .send(data)
        .expect(200);
};

module.exports = { createData };