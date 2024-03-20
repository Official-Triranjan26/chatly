import React from 'react'

const SearchUser = (props) => {
  return (
    <>
    {console.log(props)}
        <div className='w-full p-2 bg-[#8774e1] text-white rounded-md cursor-pointer hover:bg-[#5c3eef]' onClick={props.handleFunction}>
            {/* {chatName} */}
            <div className='flex flex-row'>
                <div className='h-7 w-7 my-auto'>
                    <img src="https://cdn3.vectorstock.com/i/1000x1000/00/92/teen-boy-character-avatar-vector-11360092.jpg" alt="avatar"  className='h-full w-full object-cover rounded-full'/>
                </div>
                <div className='flex flex-col gap-1 px-3'>
                    <p className='text-white font-semibold'>{props.user.name}</p>
                    <p className='text-white font-light text-sm'>email : {props.user.email}</p>

                </div>
            </div>
        </div>
    </>
  )
}

export default SearchUser