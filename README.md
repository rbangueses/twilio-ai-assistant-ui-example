# Introduction

This project is an example User Interface for Twilio AI Assistants. As a security measure, you can limit access to the chat interface by setting an allowed email domain. 

The main components of this solution are:
- Twilio Serverless / Functions is used to host the backend and the React-based UI.
- Twilio Verify is used to send and verify OTPs to the allowed domain email address.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Pre-requirements 

In order to deploy this proof of concept you will need to have:
- A Twilio Account set up
- A Twilio AI Assistant deployed
- A Twilio Verify service enabled for email

## Installation

Open terminal, navigate to the project folder and run the following:
 - npm install
 - npm run deploy
 - twilio serverless:deploy
