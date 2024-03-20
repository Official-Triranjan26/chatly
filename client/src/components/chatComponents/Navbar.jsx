import React ,{ useState} from 'react'
import { IoSearchSharp , IoNotificationsSharp } from "react-icons/io5";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { PiChats } from "react-icons/pi";
import chatlyLogo from "../../images/chatly.png"
import SideSearchBar from './SideSearchBar';
import Profile from '../userComponrnts/Profile';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../context/ChatProvider';


const Navbar = ({sideBar,setSideBar,sideBarFun,user}) => {
    const { setSelectedChat} = ChatState();
    // console.log(user)
    const dropDown = () => setActive(!active)
    const [active,setActive]=useState(false);

    const [isOpen, setIsOpen] = useState(false)
    const modelOpenClose =()=>{setIsOpen(!isOpen)};

    const navigate = useNavigate();

    const logoutHandler = () => {
      localStorage.removeItem("userInfo");
      setSelectedChat()
      navigate("/");
    };

    return (
    <>
        <div className='flex flex-row justify-between items-center bg-[#8774e1] h-10'>
            <div className='px-5'>
                <div className='flex flex-row p-2 rounded-md bg-white h-8 text-[#8774e1]'>
                    <div  className='bg-white text-[#8774e1] px-2 cursor-pointer'><IoSearchSharp /></div>
                    <div className='flex items-center'><input className='px-2 py-1 focus:outline-none' onFocus={sideBarFun} type="text" placeholder='search'/></div>
                </div>
            </div>
            <div className='flex flex-row gap-3'>
                <div className='h-8 w-8'><PiChats className='h-full w-full object-cover'/></div>
                <h1 className='text-2xl font-bold'>Chatly</h1>

            </div>
            <div className='flex text-white text-base px-5 w-36 justify-between'>
                <div className='h-6 w-6 cursor-pointer'><IoNotificationsSharp className='h-full w-full object-cover'/></div>
                <div className='h-6 w-6 cursor-pointer'>
                    {user?<img src={user.pic} alt="" className='h-full w-full object-cover rounded-full'/> : <CiUser className='h-full w-full object-cover'/>}
                    
                </div>
                <div className='cursor-pointer h-6 w-6' onClick={dropDown}>
                    {active ? 
                    <RiArrowDropUpLine className='h-full w-full object-cover' /> : 
                    <RiArrowDropDownLine className='h-full w-full object-cover'/>}
                    {active ? 
                        <div className='absolute top-8 right-4 flex flex-col bg-black h-20 w-28 z-10 p-2 items-center gap-2 rounded-md'>
                            <div onClick={modelOpenClose} className='cursor-pointer'>My Profile</div>
                            <div onClick={logoutHandler} className='cursor-pointer'>Logout</div>
                        </div> : <div></div>
                    }
                </div>
            </div>
        </div>
        {isOpen ? <Profile isOpen={isOpen} setIsOpen={setIsOpen} modelOpenClose={modelOpenClose}/> : ''}
    </>
  )
}

export default Navbar;