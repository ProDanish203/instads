import React from 'react'

const loading = () => {
  return (
    <div className='flex justify-center w-full items-center h-screen'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default loading;