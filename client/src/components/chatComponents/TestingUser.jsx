import React from 'react'

const TestingUser = ({name,email,pic,setSelectedUsers}) => {
  return (
    
    <>
        <div className='w-full px-2 py-1 bg-[#2d03ff] text-white rounded-md cursor-pointer hover:bg-[#5c3eef]' 
        // onClick={setSelectedUsers}
        >
            <div className='flex flex-row'>
                <div className='h-9 w-9 my-auto'>
                    <img src={pic ? `${pic}` : "https://cdn3.vectorstock.com/i/1000x1000/00/92/teen-boy-character-avatar-vector-11360092.jpg"}alt="avatar"  className='h-full w-full object-cover rounded-full'/>
                </div>
                <div className='flex flex-col gap-1 px-3'>
                    <p className='text-white font-semibold'>
                      {name}</p>
                    <p className='text-white font-light text-sm'>email  :    
                    {email}
                    </p>

                </div>
            </div>
        </div>
    </>
  )
}

export default TestingUser