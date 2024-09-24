import React from "react";
import Insert from "../../assets/Insert.png";
import Refresh from "../../assets/Refresh.png";
import Button from "../../assets/Button.png";
import "./style.css";

type ModalProps = {
  show: boolean;
  replyMessage: string;
  setShowModal: any;
  conversation: any;
  setConversation: any;
  responseStatus: boolean;
  setResponseStatus: any;
  value: string;
  setValue: any;
  handleInsert: () => void;
};

const Modal: React.FC<ModalProps> = ({
  show,
  replyMessage,
  setShowModal,
  conversation,
  setConversation,
  responseStatus,
  handleInsert,
  // onClose,
  value,
  setValue,
  setResponseStatus,
  // onChange,
  // onSubmit,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  type Conversation = {
    data: string;
    who: string;
  };

  const getReply = () => {
    const reply: Conversation = { data: replyMessage, who: "bot" };
    setConversation((prev: any) => [...prev, reply]);
  };

  const handleConversation = (data: string, who: string) => {
    if (data.length > 0) {
      const newEntry: Conversation = { data, who };
      setConversation((prev: any) => [...prev, newEntry]);
      getReply();
      setValue("");
      setResponseStatus(true);
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

  if (!show) return null; // Don't render anything if not shown

  return (
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
          {conversation.map((ele: Conversation, i: number) =>
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
                style={{ border: "1px solid #000" }}
                className="borders border-2 border-black font-sans text-black bg-white  rounded-lg px-4 py-3 flex justify-end text-xl align-middle items-center gap-2 hover:bg-gray-200"
              >
                <img className="h-4" src={Insert} alt="" />
                Insert
              </button>
              <button className="font-sans bg-blue-600 hover:bg-blue-700 rounded-lg text-white px-4 py-2 flex justify-end text-xl align-middle items-center gap-2">
                <img src={Refresh} alt="" />
                Regenerate
              </button>
            </div>
          )}
        </h2>
      </div>
    </div>
  );
};

export default Modal;
