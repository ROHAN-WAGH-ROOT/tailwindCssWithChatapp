import React, { useState, useEffect } from "react";
import ImageButton from "./InputButton"; // Adjust the path as necessary
import Modal from "./Modal"; // Adjust the path as necessary

const App: React.FC = () => {
  type Conversation = {
    data: string;
    who: string;
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [responseStatus, setResponseStatus] = useState<boolean>(false);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false); // State for button visibility

  const replyMessage: string =
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInsert = () => {
    setShowModal(false);

    const lastBotMessage = conversation[conversation.length - 1];

    if (lastBotMessage?.who === "bot" && lastBotMessage.data !== "") {
      const targetDiv = document.querySelector(".msg-form__contenteditable");
      const placeholder = document.querySelector(
        ".msg-form__placeholder"
      ) as HTMLElement;

      const button = document.querySelector(
        ".msg-form__send-button"
      ) as HTMLButtonElement;

      if (placeholder) {
        placeholder.style.display = "none";
      }

      if (targetDiv) {
        targetDiv.innerHTML = "";
        targetDiv.appendChild(document.createTextNode(lastBotMessage.data));
        button.disabled = false;
        setValue(lastBotMessage.data);

        setResponseStatus(false);
      }
    }

    setConversation([]);
    setValue("");
  };

  const handleSubmit = () => {
    handleCloseModal();
  };

  useEffect(() => {
    const handleFocus = () => setIsButtonVisible(true);
    const handleBlur = () => {
      setTimeout(() => {
        setIsButtonVisible(false);
      }, 90);
    };

    const targetElements = document.querySelectorAll(
      ".msg-form__contenteditable"
    );

    targetElements.forEach((el) => {
      el.addEventListener("focus", handleFocus);
      el.addEventListener("blur", handleBlur);
    });

    return () => {
      targetElements.forEach((el) => {
        el.removeEventListener("focus", handleFocus);
        el.removeEventListener("blur", handleBlur);
      });
    };
  }, []);

  return (
    <div>
      {isButtonVisible && <ImageButton onClick={handleButtonClick} />}
      <Modal
        show={showModal}
        replyMessage={replyMessage}
        setConversation={setConversation}
        conversation={conversation}
        handleInsert={handleInsert}
        responseStatus={responseStatus}
        setResponseStatus={setResponseStatus}
        setShowModal={setShowModal}
        setValue={setValue}
        value={value}
      />
    </div>
  );
};

export default App;
