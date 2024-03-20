import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { ChatState } from '../../context/ChatProvider';

function Profile({isOpen,setIsOpen,modelOpenClose,}) {
  const { user } = ChatState();
  console.log(user.name);
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
                    <div className='w-full h-8 flex justify-end' onClick={modelOpenClose}>
                        <IoClose className='h-8 w-8 text-white'/>
                    </div>

                    <div className='h-48 w-48 mx-auto'>
                        {user ?<img src={user.pic} alt="" className='h-full w-full object-cover rounded-full'/> :
                            <img src="https://cdn3.vectorstock.com/i/1000x1000/00/92/teen-boy-character-avatar-vector-11360092.jpg" alt="" className='h-full w-full object-cover rounded-full'/>
                        }
                    </div>
                    <div className="mt-2 text-center">
                        <p className="text-xl text-white font-semibold">Name : {user.name}</p>
                        <p className="text-base text-white font-light">Email : {user.email}</p>
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Profile
