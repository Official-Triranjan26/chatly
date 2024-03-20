import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IoClose } from "react-icons/io5";
import { ChatState } from "../../context/ChatProvider";
import AddedUserInGrpChat from "../userComponrnts/AddedUserInGrpChat";
import TestingUser from "./TestingUser";
import axios from "axios";
import { toast , ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreateGrpChatModal = ({ isOpen, setIsOpen, modelOpenClose }) => {
  const { user, chats, setChats } = ChatState();
//   console.log(isOpen);
  const [groupChatName ,setGroupChatName ]= useState("");
  const [searchString,setSearchString]= useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult , setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      showToastMessage("error","User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleSearch = async (query) => {
    //   if(searchString ==="") setSearchResult([]);
    setSearchString(query);
    if (!query) {
        setSearchResult([]);
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:4000/api/user?search=${searchString}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
        showToastMessage("error","Failed to Load the Search Results!")
    }
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      showToastMessage("warn","Please fill all the feilds")
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:4000/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setIsOpen(false);
      showToastMessage("success","New Group Chat Created !!");
    } catch (error) {
      showToastMessage("error","Failed to Create the Chat!")
    }
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={modelOpenClose}>
          <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-25 backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full md:w-1/3 transform overflow-hidden rounded-2xl bg-[#8774e1] p-6 text-left align-middle shadow-xl transition-all">
                  <div className="w-full h-8 flex justify-between">
                    <span className="text-2xl text-white font-semibold pl-12">
                      Create Group Chat
                    </span>
                    <IoClose
                      className="h-8 w-8 text-white cursor-pointer"
                      onClick={modelOpenClose}
                    />
                  </div>
                  <div className="mt-2 text-center flex flex-col items-center">
                    <input
                      type="text"
                      value={groupChatName}
                      onChange={(e) => setGroupChatName(e.target.value)}
                      className="mt-2 w-9/12 border-b-2 bg-white px-2 py-1 rounded-md outline-none"
                      placeholder="Group Chat Name"
                    />
                    <input
                      type="text"
                      value={searchString}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="mt-2 w-9/12 border-b-2 bg-white px-2 py-1 rounded-md outline-none"
                      placeholder="Add users eg. Dipu , Moiner Don"
                    />
                    <div className="mt-2 flex gap-1 flex-wrap  justify-center">
                        {selectedUsers.map((user)=>(
                            <div onClick={()=>handleDelete(user)}>
                                <AddedUserInGrpChat {...user}  key={user._id}/>
                            </div>
                        ))}
                    </div>
                    <div className="w-9/12 mt-2 flex flex-col gap-1">
                        {searchResult.map((user)=>(
                            <div onClick={()=>handleGroup(user)}>
                                <TestingUser {...user} key={user._id}/>
                            </div>
                        ))}
                    </div>
                    <button className="p-2 bg bg-[#5c3eef] rounded-md mt-4 text-white hover:opacity-70" onClick={handleSubmit}> Create Chat</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ToastContainer/>
    </>
  );
};

export default CreateGrpChatModal;
