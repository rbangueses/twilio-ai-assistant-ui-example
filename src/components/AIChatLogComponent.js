import React, { useState, useEffect } from 'react';
import {
    AIChatLog,
    AIChatMessage,
    AIChatMessageAuthor,
    AIChatMessageBody,
    AIChatMessageActionGroup,
    AIChatMessageActionCard,
    AIChatMessageLoading,
  } from "@twilio-paste/ai-chat-log";
import {Button} from '@twilio-paste/core/button';
import { ThumbsUpIcon} from "@twilio-paste/icons/esm/ThumbsUpIcon";
import { ThumbsDownIcon } from "@twilio-paste/icons/esm/ThumbsDownIcon";
import { CopyIcon } from "@twilio-paste/icons/esm/CopyIcon";

const AIChatLogComponent = ({ email: { email }, submittedMessage }) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (submittedMessage) {
      // Add user input to chat history & set loading to true
      setHistory(prevHistory => [...prevHistory, { sender: 'User', message: submittedMessage }]);
      setIsLoading(true);
      // Call external API
      fetch(`/sendToTWLOAI`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guid: email, from: email, msgBody: submittedMessage })
      })
        .then(response => response.json())
        .then(data => {
          // Add API response to chat history
          setHistory(prevHistory => [...prevHistory, { sender: process.env.REACT_APP_AI_NAME, message: data.body }]);
          setIsLoading(false);
        })
        .catch(error => {
          setHistory(prevHistory => [...prevHistory, { sender: process.env.REACT_APP_AI_NAME, message: 'Sorry, I encountered an error.' }]);
          setIsLoading(false);
          console.error('Error calling API:', error);
        });
    }
  }, [submittedMessage, email]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <AIChatLog>
      {history.map((entry, index) => (
        <React.Fragment key={index}>
          {entry.sender === 'User' ? (
            <AIChatMessage variant="user">
                <AIChatMessageAuthor aria-label="You said">{entry.sender}</AIChatMessageAuthor>
                <AIChatMessageBody>
                    {entry.message}
                </AIChatMessageBody>
            </AIChatMessage>
          ) : (
            <AIChatMessage variant="bot">
                <AIChatMessageAuthor aria-label="You said">{entry.sender}</AIChatMessageAuthor>
                <AIChatMessageBody>
                    {entry.message}
                </AIChatMessageBody>
              <AIChatMessageActionGroup>
                    <AIChatMessageActionCard aria-label="Feedback form">
                    Is this helpful?
                    <Button variant="reset" size="reset" aria-label="this is a helpful response">
                        <ThumbsUpIcon decorative={false} title="like result" />
                    </Button>
                    <Button variant="reset" size="reset">
                        <ThumbsDownIcon decorative={false} title="dislike result" aria-label="this is not a helpful response"/>
                    </Button>
                    </AIChatMessageActionCard>
                    <Button variant="secondary" size="small" onClick={() => copyToClipboard(entry.message)}>
                        <CopyIcon decorative={false} title="Copy to clipboard" />
                    </Button>
                </AIChatMessageActionGroup>
            </AIChatMessage>
            
          )}
        </React.Fragment>
      ))}
      {isLoading && (
        <AIChatMessage variant="ai">
          <AIChatMessageAuthor aria-label="AI Infosec Buddy is typing">{process.env.REACT_APP_AI_NAME}</AIChatMessageAuthor>
          <AIChatMessageBody>
            <AIChatMessageLoading  />
          </AIChatMessageBody>
        </AIChatMessage>
      )}
    </AIChatLog>
  );
};

export default AIChatLogComponent;