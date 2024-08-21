# Introduction

The purpose of this project is to provide an interface for Twilio AI Assistants for use cases where you want to use Twilio AI Assistants as a GPT-based knowledge base for employees.

As a security measure, you can limit access to the chat interface by setting an allowed email domain. 

The main components of this solution are:
- Twilio Serverless / Functions is used to host the backend and the React-based UI.
- Twilio Verify is used to send and verify OTPs to the allowed domain email address.

UI built using Twilio Paste.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How does it look

#### Login failed
![alt text](https://github.com/rbangueses/twilio-ai-assistant-ui-example/blob/main/images/invalid-email-domain.png?raw=true)

#### Invalid OTP
<div align="center">
	<img src="https://github.com/rbangueses/twilio-ai-assistant-ui-example/blob/main/images/invalid-otp.png?raw=true">
</div>
![alt text](https://github.com/rbangueses/twilio-ai-assistant-ui-example/blob/main/images/invalid-otp.png?raw=true)

#### Chat UI loading
![alt text](https://github.com/rbangueses/twilio-ai-assistant-ui-example/blob/main/images/chat-ui-loading.png)

#### Chat UI after message
![alt text](https://raw.githubusercontent.com/rbangueses/twilio-ai-assistant-ui-example/main/images/chat-ui.png)

## Pre-requirements 

In order to deploy this proof of concept you will need to have:
- A Twilio Account set up
- A Twilio AI Assistant deployed
- A Twilio Verify service enabled for email

## Installation

Open terminal, navigate to the project folder and run the following:
 - npm install
 - npm run deploy
 - twilio serverless:deploy
