import {
    CLEAR_EDITOR_COMMAND,
    COMMAND_PRIORITY_HIGH,
    KEY_ENTER_COMMAND,
    useLexicalComposerContext,
  } from "@twilio-paste/lexical-library";
  import React from "react";

const CustomEnterKeySubmitPlugin = ({ onKeyDown }) => {
    // get the editor from the composer context
    const [editor] = useLexicalComposerContext();
  
    const handleEnterKey = React.useCallback(
      (event) => {
        const { shiftKey, ctrlKey } = event;
        if (shiftKey || ctrlKey) return false;
        event.preventDefault();
        event.stopPropagation();
        onKeyDown();
        editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
        return true;
      },
      [editor, onKeyDown]
    );
  
    React.useEffect(() => {
      // register the command to be dispatched when the enter key is pressed
      return editor.registerCommand(KEY_ENTER_COMMAND, handleEnterKey, COMMAND_PRIORITY_HIGH);
    }, [editor, handleEnterKey]);
    return null;
  };

  export default CustomEnterKeySubmitPlugin;