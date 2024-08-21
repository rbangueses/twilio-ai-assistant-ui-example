async function createVerificationCheck(context, email, code) {
    const client = context.getTwilioClient();
    const verificationCheck = await client.verify.v2
        .services(context.VERIFY_SERVICE_SID)
        .verificationChecks.create({
        code: code,
        to: email,
        });
    return verificationCheck;
}

exports.handler = async function(context, event, callback) {
    const response = new Twilio.Response();
    // Set the CORS headers
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

    try {
        const result = await createVerificationCheck(context, event.email, event.code);
        response.setStatusCode(200);
        response.appendHeader('Content-Type', 'application/json');
        response.setBody(result);
    } catch (error) {
        console.error(error);
        response.setStatusCode(500);
        response.setBody({ error: 'verificationCheck failed' });
    }

    callback(null, response);
}