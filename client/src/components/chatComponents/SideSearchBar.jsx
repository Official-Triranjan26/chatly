import React ,{useState} from "react";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import SearchUser from "../userComponrnts/SearchUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import ChatLoading from "./ChatLoading";


const SideSearchBar = ({ sideBarFun }) => {
  // const [chats,setChats]=useState([
  //   {
  //     "chatName":"Moiner Don",
  //     "_id":"123456789",
  //     "users":[
  //       {
  //         "email":"moinerdon@gmail.com",
  //         "pic": "https://cdn3.vectorstock.com/i/1000x1000/00/92/teen-boy-character-avatar-vector-11360092.jpg"
  //       },
  //       {
  //         "email":"dipu@gmail.com",
  //         "pic": "https://cdn3.vectorstock.com/i/1000x1000/00/92/teen-boy-character-avatar-vector-11360092.jpg"
  //       }
  //     ]
  //   },
  //   {
  //     "chatName":"Dipu",
  //     "_id":"123456789",
  //     "users":[
  //       {
  //         "email":"moinerdon@gmail.com",
  //         "pic": "https://cdn3.vectorstock.com/i/1000x1000/00/92/teen-boy-character-avatar-vector-11360092.jpg"
  //       },
  //       {
  //         "email":"dipu@gmail.com",
  //         "pic": "https://cdn3.vectorstock.com/i/1000x1000/00/92/teen-boy-character-avatar-vector-11360092.jpg"
  //       }
  //     ]
  //   }
  // ])
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  // const toast = useToast();
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
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const handleSearch = async () => {
    if (!search) {
      showToastMessage("warn","Please provide search string !!")
      return;
    }
    try {
      console.log(search)
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:4000/api/user?search=${search}`, config);
      setLoading(false);
      setSearch('')
      setSearchResult(data);
      // console.log(search)
      console.log(searchResult)
    } catch (error) {
      showToastMessage("error","Failed to load search reasult !")
    }
  };
  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`http://localhost:4000/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      sideBarFun();
    } catch (error) {
      showToastMessage("error","Error fetching the chat")
    }
  };

  return (
    <>
      <div className="bg-[#292730] absolute  h-screen w-10/12 lg:w-1/4 left-0 top-0 z-30">
        <div className="flex justify-between object-center p-5">
          <h1 className="text-xl text-[#8774e1] font-bold">Search users</h1>
          <button onClick={sideBarFun}>
            <IoClose className="text-[#8774e1] h-6 w-6 object-center" />
          </button>
        </div>

        <div className="flex flex-row px-3 py-2 rounded-md h-8 text-[#8774e1] gap-2">
          <div className="flex items-center mt-4">
            <input
              className="px-2 py-1 focus:outline-none rounded-md"
              // onFocus={sideBarFun}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search"
            />
          </div>
          <button className="bg-[#8774e1] h-8 flex items-center px-2 py-1 rounded-md text-white cursor-pointer mt-0 hover:bg-[#5c3eef]" onClick={handleSearch}>go</button>
        </div>

        <div className="flex flex-col gap-3 px-3 mt-5">
          {loading ? <ChatLoading/> : ""}
          {searchResult.map((user) =>(
            <SearchUser key={user._id} user={user} handleFunction={()=>accessChat(user._id)}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideSearchBar;
