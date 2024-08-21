import React, { useRef, useState } from 'react';
import { Box, Heading, Button } from '@twilio-paste/core';
import { SendIcon } from "@twilio-paste/icons/esm/SendIcon";
import { ArtificialIntelligenceIcon } from "@twilio-paste/icons/esm/ArtificialIntelligenceIcon";
import { ChatComposer, ChatComposerContainer, ChatComposerActionGroup } from '@twilio-paste/chat-composer';

import { $getRoot, CLEAR_EDITOR_COMMAND, ClearEditorPlugin } from "@twilio-paste/lexical-library";
import CustomEnterKeySubmitPlugin from './CustomEnterKeySubmitPlugin';
import AIChatLogComponent from './AIChatLogComponent';
import '../style/ChatComponent.css';

const ChatComponent = (email) => {
  const editorInstanceRef = useRef(null);
  const [message, setMessage] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(''); 

  const submitMessage = () => {
    if (message === "") return;
    setSubmittedMessage(message);
  };

  const handleComposerChange = (editorState) => {
    if (editorState) {
      editorState.read(() => {
        const text = $getRoot().getTextContent();
        setMessage(text);
      });
    } else {
      console.error('editorState is null or undefined');
    }
  };

  return (
    
    <Box width="100%" display="flex" justifyContent="center" flexDirection="column">
        <Box display="flex" flexDirection="column" alignItems="center" rowGap="space40" width="100%" padding="space130">
            <ArtificialIntelligenceIcon decorative size="sizeIcon100" />
            <Heading as="h6" variant="heading10">How can I help?</Heading>
            <Box>

            </Box>
            <Box width="100%">
                {/* <AIChatLogExample /> */}
                <AIChatLogComponent submittedMessage={submittedMessage} email={email} />
                <div className="chat-composer-container">
                <ChatComposerContainer variant="contained">
                    <ChatComposer
                        ariaLabel="input for sending a message to ai"
                        placeholder="Chat text"
                        editorInstanceRef={editorInstanceRef}
                        onChange={handleComposerChange}
                        config={{
                        namespace: "customer-chat",
                        onError: (e) => {
                            throw e;
                        },
                        }}>
                        <ClearEditorPlugin />
                        <CustomEnterKeySubmitPlugin onKeyDown={submitMessage} />
                    </ChatComposer>
                    <ChatComposerActionGroup>
                        <Button variant="primary_icon" size="reset" onClick={() => {
                        submitMessage();
                        editorInstanceRef.current?.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
                        }}>
                        <SendIcon decorative={false} title="send chat message to ai" />
                        </Button>
                    </ChatComposerActionGroup>
                </ChatComposerContainer>
                </div>
            </Box>
        </Box>
    </Box>

  );
};

export default ChatComponent;