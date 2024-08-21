# Note

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Pre-requirements 

In order to deploy this proof of concept you will need to have:
- A Twilio Account set up
- A Twilio AI Assistant deployed
- A Twilio Verify service enabled for email

## Installation

# Deploy serverless functions

Open terminal, navigate to the project folder and run the following:
 - npm install

Go to the serverless directory, edit the .env file to include:
- ACCOUNT_SID= Twilio account SID
- AUTH_TOKEN= Twilio auth token 
- TWILIO_AI_ASSISTANT_ID= the Twilio AI Assistant SID
- VERIFY_SERVICE_SID= the Twilio AI Verify Service SID

Go back to your terminal and run the following:
 - npm run build
 - twilio serverless:deploy

Once your deploy completes, take note of your domain as you will need it on the next step.

# Deploy React application

Open terminal, navigate to the project folder.

Edit the .env file with the following:
- REACT_APP_SERVERLESS_DOMAIN= your serverless domain
- REACT_APP_ALLOWED_DOMAIN= the allowed email domain when logging in
- REACT_APP_ERROR_LOGIN_MSG= the error message shown when someone tries to login with an invalid email domain
- REACT_APP_AI_NAME= the name of the virtual assistant

Go back to your terminal and run the following:
- npm run deploy





........

echo "# twilio-ai-assistant-ui-example" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/rbangueses/twilio-ai-assistant-ui-example.git
git push -u origin main