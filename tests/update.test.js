const supertest = require('supertest');
const { describe, it } = require('mocha');
const { expect } = require('chai');
const app = require('../src/app.js');
const {createData} = require('./testHelpers.js');

describe('PUT /update', () => {
    it('should return 400 if DataID is not an integer', async () => {
        const response = await supertest(app).put('/update/invalidID').send({ dataName: 'sample name', dataContent: 'sample content' }).expect(400);

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
        const response = await supertest(app).put('/update/999').send({ dataName: 'sample name', dataContent: 'sample content' }).expect(400);

        expect(response.body).to.have.property('message').that.equals('Error!');
        expect(response.body).to.have.property('errors').that.is.an('array');
        expect(response.body.errors).to.have.lengthOf(1);
        expect(response.body.errors[0]).to.have.property('type').that.equals('field');
        expect(response.body.errors[0]).to.have.property('value').that.equals('999');
        expect(response.body.errors[0]).to.have.property('msg').that.equals('DataID not found');
        expect(response.body.errors[0]).to.have.property('path').that.equals('dataID');
        expect(response.body.errors[0]).to.have.property('location').that.equals('params');
    });

    it('should return 400 if dataName is missing', async () => {
        const createResponse = await createData(app, { dataName: 'sample name', dataContent: 'sample content' });

        const response = await supertest(app).put(`/update/${createResponse.body.data.dataID}`).send({ dataContent: 'sample content' }).expect(400);

        expect(response.body).to.have.property('message').that.equals('Error!');
        expect(response.body).to.have.property('errors').that.is.an('array');
        expect(response.body.errors).to.have.lengthOf(3);
        expect(response.body.errors[0]).to.have.property('type').that.equals('field');
        expect(response.body.errors[0]).to.have.property('msg').that.equals('`dataName` is required field');
        expect(response.body.errors[0]).to.have.property('path').that.equals('dataName');
        expect(response.body.errors[0]).to.have.property('location').that.equals('body');
        expect(response.body.errors[1]).to.have.property('type').that.equals('field');
        expect(response.body.errors[1]).to.have.property('msg').that.equals('`dataName` must be a string');
        expect(response.body.errors[1]).to.have.property('path').that.equals('dataName');
        expect(response.body.errors[1]).to.have.property('location').that.equals('body');
        expect(response.body.errors[2]).to.have.property('type').that.equals('field');
        expect(response.body.errors[2]).to.have.property('msg').that.equals('min 1 char');
        expect(response.body.errors[2]).to.have.property('path').that.equals('dataName');
        expect(response.body.errors[2]).to.have.property('location').that.equals('body');
    });

    it('should return 400 if dataName is not a string', async () => {
        const createResponse = await createData(app, { dataName: 'sample name', dataContent: 'sample content' });

        const response = await supertest(app).put(`/update/${createResponse.body.data.dataID}`).send({ dataName: 123, dataContent: 'sample content' }).expect(400);

        expect(response.body).to.have.property('message').that.equals('Error!');
        expect(response.body).to.have.property('errors').that.is.an('array');
        expect(response.body.errors).to.have.lengthOf(1);
        expect(response.body.errors[0]).to.have.property('type').that.equals('field');
        expect(response.body.errors[0]).to.have.property('value').that.equals(123);
        expect(response.body.errors[0]).to.have.property('msg').that.equals('`dataName` must be a string');
        expect(response.body.errors[0]).to.have.property('path').that.equals('dataName');
        expect(response.body.errors[0]).to.have.property('location').that.equals('body');
    });

    it('should return 400 if dataName length is less than 1', async () => {
        const createResponse = await createData(app, { dataName: 'sample name', dataContent: 'sample content' });

        const response = await supertest(app).put(`/update/${createResponse.body.data.dataID}`).send({ dataName: '', dataContent: 'sample content' }).expect(400);

        expect(response.body).to.have.property('message').that.equals('Error!');
        expect(response.body).to.have.property('errors').that.is.an('array');
        expect(response.body.errors).to.have.lengthOf(1);
        expect(response.body.errors[0]).to.have.property('type').that.equals('field');
        expect(response.body.errors[0]).to.have.property('value').that.equals('');
        expect(response.body.errors[0]).to.have.property('msg').that.equals('min 1 char');
        expect(response.body.errors[0]).to.have.property('path').that.equals('dataName');
        expect(response.body.errors[0]).to.have.property('location').that.equals('body');
    });

    it('should return 400 if dataContent is missing', async () => {
        const createResponse = await createData(app, { dataName: 'sample name', dataContent: 'sample content' });

        const response = await supertest(app).put(`/update/${createResponse.body.data.dataID}`).send({ dataName: 'sample name' }).expect(400);

        expect(response.body).to.have.property('message').that.equals('Error!');
        expect(response.body).to.have.property('errors').that.is.an('array');
        expect(response.body.errors).to.have.lengthOf(3);
        expect(response.body.errors[0]).to.have.property('type').that.equals('field');
        expect(response.body.errors[0]).to.have.property('msg').that.equals('`dataContent` is required field');
        expect(response.body.errors[0]).to.have.property('path').that.equals('dataContent');
        expect(response.body.errors[0]).to.have.property('location').that.equals('body');
        expect(response.body.errors[1]).to.have.property('type').that.equals('field');
        expect(response.body.errors[1]).to.have.property('msg').that.equals('`dataContent` must be a string');
        expect(response.body.errors[1]).to.have.property('path').that.equals('dataContent');
        expect(response.body.errors[1]).to.have.property('location').that.equals('body');
        expect(response.body.errors[2]).to.have.property('type').that.equals('field');
        expect(response.body.errors[2]).to.have.property('msg').that.equals('min 1 char');
        expect(response.body.errors[2]).to.have.property('path').that.equals('dataContent');
        expect(response.body.errors[2]).to.have.property('location').that.equals('body');
    });

    it('should return 400 if dataContent is not a string', async () => {
        const createResponse = await createData(app, { dataName: 'sample name', dataContent: 'sample content' });

        const response = await supertest(app).put(`/update/${createResponse.body.data.dataID}`).send({ dataName: 'sample name', dataContent: 123 }).expect(400);

        expect(response.body).to.have.property('message').that.equals('Error!');
        expect(response.body).to.have.property('errors').that.is.an('array');
        expect(response.body.errors).to.have.lengthOf(1);
        expect(response.body.errors[0]).to.have.property('type').that.equals('field');
        expect(response.body.errors[0]).to.have.property('value').that.equals(123);
        expect(response.body.errors[0]).to.have.property('msg').that.equals('`dataContent` must be a string');
        expect(response.body.errors[0]).to.have.property('path').that.equals('dataContent');
        expect(response.body.errors[0]).to.have.property('location').that.equals('body');
    });

    it('should return 400 if dataContent length is less than 1', async () => {
        const createResponse = await createData(app, { dataName: 'sample name', dataContent: 'sample content' });

        const response = await supertest(app).put(`/update/${createResponse.body.data.dataID}`).send({ dataName: 'sample name', dataContent: '' }).expect(400);

        expect(response.body).to.have.property('message').that.equals('Error!');
        expect(response.body).to.have.property('errors').that.is.an('array');
        expect(response.body.errors).to.have.lengthOf(1);
        expect(response.body.errors[0]).to.have.property('type').that.equals('field');
        expect(response.body.errors[0]).to.have.property('value').that.equals('');
        expect(response.body.errors[0]).to.have.property('msg').that.equals('min 1 char');
        expect(response.body.errors[0]).to.have.property('path').that.equals('dataContent');
        expect(response.body.errors[0]).to.have.property('location').that.equals('body');
    });

    it('should return 200 if all validation passes', async () => {

        const createResponse = await createData(app, { dataName: 'sample name', dataContent: 'sample content' });
        
        const response = await supertest(app).put(`/update/${createResponse.body.data.dataID}`).send({ dataName: 'sample name 1', dataContent: 'sample content 1' }).expect(200);

        expect(response.body).to.have.property('message').that.equals('Data Updated');
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('dataID').that.is.a('number');
        expect(response.body.data).to.have.property('dataID').that.equals(createResponse.body.data.dataID);
        expect(response.body.data).to.have.property('dataName').that.is.a('string');
        expect(response.body.data).to.have.property('dataName').that.equals('sample name 1');
        expect(response.body.data).to.have.property('dataContent').that.is.a('string');
        expect(response.body.data).to.have.property('dataContent').that.equals('sample content 1');
        expect(response.body.data).to.have.property('dataCreatedDatetime').that.is.a('string');
        expect(response.body.data).to.have.property('dataChangedDatetime').that.is.a('string');
    });
});
