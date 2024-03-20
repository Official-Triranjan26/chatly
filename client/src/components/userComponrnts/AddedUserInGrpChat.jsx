import React from 'react'
import { IoClose } from 'react-icons/io5'

const AddedUserInGrpChat = ({name}) => {
  return (
    <>
        <div className='bg-[#5c3eef] rounded-md px-2 py-1 flex gap-1 text-white font-light text-sm items-center'>
            <span>{name}</span>
            <IoClose/>
        </div>
    </>
  )
}

export default AddedUserInGrpChat