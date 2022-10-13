const dynamoose = require('dynamoose');

const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  number: String,
});

const peopleModel = dynamoose.model('Lab18', peopleSchema);


exports.handler = async (event) => {
  let parsedBody = JSON.parse(event.body);
  let { id, name, number } = parsedBody;
  let person = { id, name, number };
  console.log('-----PERSON-----', person);

  let response = { statusCode: null, body: null };

  try {
    let peopleRecords = await peopleModel.delete(person);
    response.statusCode = 200;
    response.body = JSON.stringify(peopleRecords);

  } catch (e) {
    console.log(e);
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }


  return response;
};
