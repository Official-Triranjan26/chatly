import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import ChatListItem from "./ChatListItem";
import { ChatState } from "../../context/ChatProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CreateGrpChatModal from "./CreateGrpChatModal";
import ChatLoading from "./ChatLoading";

const MyChats = ({fetchAgain}) => {
  const showToastMessage = (state, s) => {
    if (state === "warn") {
      return toast.warn(s, {
        position: "bottom-center",
      });
    } else if (state === "error") {
      return toast.error(s, {
        position: "bottom-center",
      });
    } else if (state === "success") {
      return toast.success(s, {
        position: "bottom-center",
      });
    }
  };
  const [isOpen, setIsOpen] = useState(false)
  const modelOpenClose =()=>{setIsOpen(!isOpen)};
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [loading, setLoading] = useState(false);
  
  const fetchChats = async () => {
    console.log(user);
    try {
      setLoading(true);
      // console.log(user)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:4000/api/chat", config);
      setChats(data);
      setLoading(false)
      // console.log(chats)
    } catch (error) {
      showToastMessage("error",`${error}`);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  return (
    <>
      <div className={`w-1/3 p-3`}>
        <div className="flex justify-between mt-3">
          <h1 className="text-white font-semibold text-2xl">My Chats</h1>
          <div className="flex bg-[#8774e1] p-1 rounded-md gap-2 cursor-pointer items-center" onClick={modelOpenClose}>
            <span className="font-medium">Create Group Chat</span>
            <IoAdd className="h-6 w-6" />
          </div>
        </div>
        {loading ? <ChatLoading/> : 
        <div className="p-2 mt-3">
          {/* {()=>setSelectedChat()} */}
          { chats?.map((chat)=>(
            <div onClick={() => setSelectedChat(chat)}>
              <ChatListItem {...chat} chat={chat} key={chat._id}/>
            </div>
          ))}
        </div>}
      </div>
      {isOpen ? <CreateGrpChatModal isOpen={isOpen} setIsOpen={setIsOpen} modelOpenClose={modelOpenClose}/> : ""}
    </>
  );
};

export default MyChats;
