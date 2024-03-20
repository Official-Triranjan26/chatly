import React, { useState } from 'react'
import Navbar from '../components/chatComponents/Navbar'
import Example from '../components/chatComponents/temp'
import SideSearchBar from '../components/chatComponents/SideSearchBar'
import classNames from 'classnames'
import { ChatState } from '../context/ChatProvider'
import MyChats from '../components/chatComponents/MyChats'
import MessageBox from '../components/chatComponents/MessageBox'

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  // console.log(user);
  const sideBarFun = () =>setSideBar(!sideBar)
  const [sideBar,setSideBar]=useState(false);
  return (
    <>
      <div className={classNames('w-full h-screen bg-[#292730] text-white',{"opacity-75" :sideBar })}>
        <Navbar user={user} sideBar={sideBar} setSideBar = {setSideBar} sideBarFun={sideBarFun}/>
        <div className='flex gap-2 h-full'>
          <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
          <MessageBox/>
        </div>
      </div>
      {sideBar ? <SideSearchBar sideBarFun={sideBarFun}/> : ""}
    </>
  )
}

export default ChatPage