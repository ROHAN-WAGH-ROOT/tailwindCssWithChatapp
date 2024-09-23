import React, { useEffect, useRef, useState } from "react";
import "./content.css";
import Logo from "../../assets/Vector.png";
import Insert from "../../assets/Insert.png";
import Refresh from "../../assets/Refresh.png";
import Button from "../../assets/Button.png";

type Conversation = {
  data: string;
  who: string;
};

const App: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [responseStatus, setResponseStatus] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const replyMessage: string =
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

  const getReply = () => {
    const reply: Conversation = { data: replyMessage, who: "bot" };
    setConversation((prev) => [...prev, reply]);
  };

  const handleConversation = (data: string, who: string) => {
    if (data.length > 0) {
      const newEntry: Conversation = { data, who };
      setConversation((prev) => [...prev, newEntry]);
      getReply();
      setValue("");
      setResponseStatus(true);
    }
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
        targetDiv.innerHTML = ""; // Clear existing content
        targetDiv.appendChild(document.createTextNode(lastBotMessage.data));
        button.disabled = false;
        setValue(lastBotMessage.data);

        setResponseStatus(false);
      }
    }
  };

  const handleConversationUi = (ele: Conversation, i: number) => (
    <div
      key={i}
      className={`flex ${
        ele.who === "User" ? "justify-end" : "justify-start"
      } w-full`}
    >
      <div
        className={`flex ${
          ele.who === "User" ? "justify-end" : "justify-start"
        } w-fit text-left max-w-xl ${
          ele.who === "User" ? "bg-gray-200" : "bg-blue-500 text-white"
        } p-2 rounded-md px-5 my-2`}
      >
        {ele.data}
      </div>
    </div>
  );

  return (
    <div className="rounded-[100%]">
      <div className="rounded-full cursor-pointer">
        <img
          className="align-middle items-center justify-center m-auto flex w-auto p-3 rounded-full"
          src={Logo}
          alt="logo"
          onClick={() => {
            setShowModal(true);
            setConversation([]);
            setValue("");
          }}
        />
      </div>

      {showModal && (
        <div
          id="modal"
          className="fixed h-full w-full inset-0 z-[1000000] flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg w-full mx-auto max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[50vh] overflow-auto">
              {conversation.map((ele: Conversation, i) =>
                handleConversationUi(ele, i)
              )}
            </div>

            <h2 className="text-xl outline-none no-underline font-semibold">
              <input
                ref={ref}
                className="text-base no-underline outline-none border-2 py-2 px-4 min-w-full rounded-md my-2"
                style={{ outline: "none" }}
                type="text"
                placeholder="Your prompt"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              {!responseStatus ? (
                <div
                  className="flex justify-end w-full"
                  onClick={() => handleConversation(value, "User")}
                >
                  <button className="font-sans bg-blue-600 hover:bg-blue-700 rounded-lg text-white px-4 py-2 flex justify-end text-lg align-middle items-center">
                    <img
                      className="w-4 h-4 align-middle justify-center flex items-center m-auto mr-2"
                      src={Button}
                      alt=""
                    />
                    Generate
                  </button>
                </div>
              ) : (
                <div className="flex gap-5 justify-end w-full">
                  <button
                    onClick={handleInsert}
                    className="border-2 font-sans  bg-gray-400 hover:bg-gray-500 rounded-lg text-white px-4 py-2 flex justify-end text-lg align-middle items-center gap-2"
                  >
                    <img src={Insert} alt="" />
                    Insert
                  </button>
                  <button className="font-sans bg-blue-600 hover:bg-blue-700 rounded-lg text-white px-4 py-2 flex justify-end text-lg align-middle items-center gap-2">
                    <img src={Refresh} alt="" />
                    Regenerate
                  </button>
                </div>
              )}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
