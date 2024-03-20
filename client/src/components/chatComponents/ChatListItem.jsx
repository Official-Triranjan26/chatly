import React from 'react'
import { ChatState } from '../../context/ChatProvider';
import classNames from 'classnames';

const ChatListItem = ({chatName,users,latestMessage, isGroupChat,chat}) => {
  // console.log(chat) 
  const { selectedChat, setSelectedChat} = ChatState();
  // console.log(selectedChat)
  return (
    <>

         <div className={selectedChat===chat ?"w-full p-2 text-white rounded-md cursor-pointer my-2 bg-[#5c3eef]":"w-full p-2 text-white rounded-md cursor-pointer my-2 bg-[#8774e1]"}>
            {/* {chatName} */}
            <div className='flex flex-row'>
                <div className='h-7 w-7 my-auto'>
                  {isGroupChat ? <img src="https://cdn.pixabay.com/photo/2020/05/29/13/26/icons-5235125_1280.png" alt="avatar"  className='h-full w-full object-cover rounded-full'/> : 
                    <img src={users[1].pic} alt="avatar"  className='h-full w-full object-cover rounded-full'/>
                  }                 
                </div>
                <div className='flex flex-col gap-1 px-3'>
                    <p className='text-white font-semibold'>{chatName}</p>
                    <p className='text-white font-light text-sm'>{chatName} : {latestMessage ? latestMessage.content : 'hi'}</p>
                </div>
            </div>

        </div>
    </>
  )
}

export default ChatListItem