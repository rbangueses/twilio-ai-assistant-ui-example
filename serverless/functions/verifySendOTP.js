async function createVerification(context, email) {
    const client = context.getTwilioClient();
    const verification = await client.verify.v2
    .services(context.VERIFY_SERVICE_SID)
    .verifications.create({
      channel: "email",
      to: email,
    }).then(verification => {return verification;});

    return verification;
}

exports.handler = async function(context, event, callback) {
    const response = new Twilio.Response();
    // Set the CORS headers 
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

    try {
        const result = await createVerification(context, event.email);
        response.setStatusCode(200);
        response.appendHeader('Content-Type', 'application/json');
        response.setBody(result);
    } catch (error) {
        console.error(error);
        response.setStatusCode(500);
        response.setBody({ error: 'verifySendOTP error - error creating Verification' });
    }

    callback(null, response);
}