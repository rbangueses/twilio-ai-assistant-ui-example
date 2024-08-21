const axios = require('axios');
const http = require('http');
const https = require('https');

async function sendToTWLOAI(context, from, guid, msgBody) {
  const url = `https://assistants.twilio.com/v1/${context.TWILIO_AI_ASSISTANT_ID}/Messages`;
  const data = {
    Identity: from,
    SessionId: guid,
    Body: msgBody
  };
  const auth = {
    username: context.ACCOUNT_SID,
    password: context.AUTH_TOKEN
  };

  try {
    const response = await axios.post(url, data, { auth: auth });
    return response.data;
  } catch (error) {
    //console.error(error);
    throw new Error('sendToTWLOAI error - error sending message to Twilio AI. ', error );
  }
}

exports.handler = async function(context, event, callback) {
    const response = new Twilio.Response();
    // Set the CORS headers to allow Flex to make an error-free HTTP request
    // to this Function
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

    try {
        console.log('sendToTWLOAI with event: ', event.guid, event.from, event.msgBody);
        const result = await sendToTWLOAI(context, event.from, event.guid, event.msgBody);
        response.setStatusCode(200);
        response.appendHeader('Content-Type', 'application/json');
        response.setBody(result);
    } catch (error) {
        //console.error(error);
        response.setStatusCode(500);
        response.setBody({ error: 'Serverless error - error sending message to Twilio AI.' });
    }

    callback(null, response);
}