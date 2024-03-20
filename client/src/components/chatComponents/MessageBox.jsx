import React, { useEffect } from 'react'
import { ChatState } from '../../context/ChatProvider';
const MessageBox = () => {
  const { selectedChat, setSelectedChat} = ChatState();

  console.log(selectedChat)
  
  return (
    <>
    {selectedChat ? `${selectedChat.chatName}` : 
      <div className='h-full w-2/3 my-auto text-white text-center flex items-center'>
        <span className='mx-auto text-2xl text-gray-500'>Click on a user to start chating</span>
      </div>
    }
    </>
  )
}

export default MessageBox