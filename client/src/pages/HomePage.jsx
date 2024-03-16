import React from "react";
import { Tab } from "@headlessui/react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import logo from '../images/chatly.png'


const HomePage = () => {

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="flex flex-row w-full h-screen bg-[#292730] text-black bottom-0">
        <div className="w-1/2 hidden lg:flex">
          <div className="w-3/4 h-3/4 mx-auto my-auto">
            <img src={logo} className="w-full h-full object-cover" alt="" />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex mx-auto">
          <div className="flex flex-col top-4 mx-auto my-auto w-4/5 bg-[#292730]">
            <div className="w-3/4 mx-auto my-auto flex md:hidden">
              <img src={logo} alt="" className="w-full h-full object-cover" />
            </div>
            {/* n--------------------------------------------*/}
            <div className="w-full max-w-md px-1 my-auto sm:px-0 text-sm md:text-base">
              <Tab.Group >
                <Tab.List className="flex space-x-1 px-2 lg:px-8 rounded-xl bg-blue-900/20 p-1"> 
                  <Tab className={({selected})=>classNames("w-3/4 rounded-lg py-2.5 text-sm font-medium leading-5",selected ? ' bg-[#5c3eef] text-white' :'bg-[#8774e1]')}>Signin</Tab>
                  <Tab className={({selected})=>classNames("w-3/4 rounded-lg py-2.5 text-sm font-medium leading-5",selected ? ' bg-[#5c3eef] text-white' :'bg-[#8774e1]')}>Signup</Tab>
                </Tab.List>
                <Tab.Panels  className="mt-2">
                  <Tab.Panel><Login/></Tab.Panel>
                  <Tab.Panel><Signup/></Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
