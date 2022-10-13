'use strict';
//Third party library

const dynamoose = require('dynamoose');

//create a schema
const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  number: String,

});

//create model
const peopleModel = dynamoose.model('lab18', peopleSchema);


exports.handler = async (event) => {

  console.log('-----queryStringParameters-----', event.queryStringParameters);
  let response = { statusCode: null, body: null };

  try {
    let peopleRecords = await peopleModel.scan().exec();
    response.statusCode = 200;
    response.body = JSON.stringify(peopleRecords);

  } catch (e) {
    console.log(e);
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }


  return response;
};
