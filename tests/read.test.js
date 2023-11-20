const supertest = require('supertest');
const { describe, it } = require('mocha');
const { expect } = require('chai');
const app = require('../src/app.js');
const {createData} = require('./testHelpers.js');

describe('GET /read', () => {
    it('should return 400 if DataID is not an integer', async () => {
        const response = await supertest(app).get('/read/invalidID').expect(400);

        expect(response.body).to.have.property('message').that.equals('Error!');
        expect(response.body).to.have.property('errors').that.is.an('array');
        expect(response.body.errors).to.have.lengthOf(2);

        expect(response.body.errors[0]).to.have.property('type').that.equals('field');
        expect(response.body.errors[0]).to.have.property('value').that.equals('invalidID');
        expect(response.body.errors[0]).to.have.property('msg').that.equals('`DataID` must be an integer');
        expect(response.body.errors[0]).to.have.property('path').that.equals('dataID');
        expect(response.body.errors[0]).to.have.property('location').that.equals('params');
        expect(response.body.errors[1]).to.have.property('type').that.equals('field');
        expect(response.body.errors[1]).to.have.property('value').that.equals('invalidID');
        expect(response.body.errors[1]).to.have.property('msg').that.equals('DataID not found');
        expect(response.body.errors[1]).to.have.property('path').that.equals('dataID');
        expect(response.body.errors[1]).to.have.property('location').that.equals('params');
    });

    it('should return 400 if DataID is not found', async () => {
        const response = await supertest(app).get('/read/999').expect(400);

        expect(response.body).to.have.property('message').that.equals('Error!');
        expect(response.body).to.have.property('errors').that.is.an('array');
        expect(response.body.errors).to.have.lengthOf(1);
        expect(response.body.errors[0]).to.have.property('type').that.equals('field');
        expect(response.body.errors[0]).to.have.property('value').that.equals('999');
        expect(response.body.errors[0]).to.have.property('msg').that.equals('DataID not found');
        expect(response.body.errors[0]).to.have.property('path').that.equals('dataID');
        expect(response.body.errors[0]).to.have.property('location').that.equals('params');
    });

    it('should return 200 if DataID is optional and found', async () => {
        const createResponse = await createData(app, { dataName: 'sample name', dataContent: 'sample content' });

        const response = await supertest(app).get(`/read/${createResponse.body.data.dataID}`).expect(200);

        expect(response.body).to.have.property('message').that.equals('Data Readed');
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('dataID').that.is.a('number');
        expect(response.body.data).to.have.property('dataID').that.equals(createResponse.body.data.dataID);
        expect(response.body.data).to.have.property('dataName').that.is.a('string');
        expect(response.body.data).to.have.property('dataContent').that.is.a('string');
        expect(response.body.data).to.have.property('dataCreatedDatetime').that.is.a('string');
        expect(response.body.data).to.have.property('dataChangedDatetime').that.is.a('string');
    });

    it('should return 200 if DataID is optional and not provided', async () => {

        const createResponse = await createData(app, { dataName: 'sample name', dataContent: 'sample content' });
        
        const response = await supertest(app).get('/read').expect(200);

        expect(response.body).to.have.property('message').that.equals('Data Fetched');
        expect(response.body).to.have.property('data');

        if (Array.isArray(response.body.data) && response.body.data.length > 0) {
            response.body.data.forEach(dataItem => {
                expect(dataItem).to.have.property('dataID').that.is.a('number');
                expect(dataItem).to.have.property('dataName').that.is.a('string');
                expect(dataItem).to.have.property('dataContent').that.is.a('string');
                expect(dataItem).to.have.property('dataCreatedDatetime').that.is.a('string');
                expect(dataItem).to.have.property('dataChangedDatetime').that.is.a('string');
            });
        }
    });
});
