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
    const lastBotMessage = conversation[conversation.length - 1];
    if (lastBotMessage?.who === "bot" && lastBotMessage.data !== "") {
      setValue(lastBotMessage.data);
      setShowModal(false);
      setResponseStatus(false);
    }
  };

  const handleConversationUi = (ele: Conversation, i: number) => (
    <div key={i} className={`flex ${ele.who === "User" ? "justify-end" : "justify-start"} w-full`}>
      <div className={`flex ${ele.who === "User" ? "justify-end" : "justify-start"} w-fit text-left max-w-xl ${ele.who === "User" ? "bg-[#DFE1E7]" : "bg-[#DBEAFE]"} p-2 rounded-md px-5 my-2`}>
        {ele.data}
      </div>
    </div>
  );

  return (
    <div className="absolute right-[15px] bottom-[15px] bg-red-950 w-10 h-10 rounded-full">
      <div className="w-10 h-20 rounded-full bg-red-950 border cursor-pointer">
        <img
          className="align-middle items-center justify-center m-auto flex w-auto p-3 bg rounded-full"
          src={Logo}
          alt="logo"
          onClick={() => setShowModal(true)}
        />
      </div>

      {showModal && (
        <div
          id="modal"
          className="fixed h-full w-full inset-0 z-[1000000] flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowModal(false)} // Close modal on background click
        >
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg w-full mx-auto max-w-3xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
          >
            <div className="max-h-[50vh] overflow-auto">
              {conversation.map((ele: Conversation, i) => handleConversationUi(ele, i))}
            </div>

            <h2 className="text-xl font-semibold">
              <input
                ref={ref}
                className="text-base outline-none border-2 py-2 px-4 min-w-full rounded-md my-2"
                type="text"
                placeholder="Your prompt"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setShowModal(true)} // Keep modal open on focus
              />
              {!responseStatus ? (
                <div className="flex justify-end w-full" onClick={() => handleConversation(value, "User")}>
                  <button className="font-sans bg-blue-600 hover:bg-blue-700 rounded-lg text-white px-4 py-2 flex justify-end text-lg align-middle items-center">
                    <img className="w-4 h-4 align-middle justify-center flex items-center m-auto mr-2" src={Button} alt="" />
                    Generate
                  </button>
                </div>
              ) : (
                <div className="flex gap-5 justify-end w-full">
                  <button onClick={handleInsert} className="font-sans rounded-lg text-gray-400 px-4 py-2 flex justify-end text-lg align-middle items-center gap-2 border-2 border-gray-400">
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
