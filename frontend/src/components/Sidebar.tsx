import React, { createContext, useEffect, useRef, useState } from 'react'
import DirectoryMap from './DirectoryMapper'
import Directory, { dataType, ResultArr } from '../utils/helper/DirFormatter'
import { FaPlus } from "react-icons/fa";
import COLLECTION_API from '../utils/api/collection'
import { ImMenu, ImCross } from 'react-icons/im'
import { Toast } from '../utils/alert/sweetAlert2';
// import data from './data'

const Sidebar = () => {
  const [takeinputColl, setinputColl] = useState(false)
  const [menu, setMenu] = useState(true)
  const inputContext = createContext(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddCollection = () => {
    setinputColl(true)
  }

  const handleKeyDown = (parent: number | null) => (e: React.KeyboardEvent) => {
    if (inputRef.current && e.key === 'Enter' && inputRef.current.value === '') {
      setinputColl(false)
    } else if (e.key === 'Enter' && inputRef.current && inputRef.current.value.trim() !== '') {
      console.log(inputRef.current.value)
      setinputColl(false)
      COLLECTION_API.ADD({ name: inputRef.current.value, parent }).then((res) => {
        Toast.fire({
          icon: 'success',
          title: 'Collection Added'
        })
      })
    }
  }

  return (
    <>
      <div className={`sidebar h-screen bg-slate-100 w-1/5 p-2 ${menu?"ml-0":"ml-[-250px]"}`} style={{
        transition: 'all 0.5s'
      }} >
      <div className="flex justify-end" onClick={()=>setMenu(prev=>!prev)} >
      {menu ? <ImCross/> : <ImMenu/>}
      </div>
      <div className="content" style={{
        display: menu ? 'block' : 'none'
      }} >
      <h1 className='text-center text-2xl font-extrabold font- mt-12 mb-4' >NoteBlock</h1>
        <inputContext.Provider value={takeinputColl}>
          <div className='flex justify-center py-2 text-3xl'>
            <FaPlus
              onClick={handleAddCollection}
              className='bg-slate-300 rounded-lg text-2xl hover:bg-slate-400 cursor-pointer py-1 w-full mb-2'
            />
          </div>
          <hr className='border-2 border-black mb-2' />
          {takeinputColl && (
            <input
              ref={inputRef}
              onKeyDown={handleKeyDown(null)}
              placeholder='Enter the name of Collection'
              className='p-2 rounded-md w-full bg-slate-300 focus-within:'
            />
          )}
          <DirectoryMap />
        </inputContext.Provider>
      </div>
      </div>
    </>
  )
}

export default Sidebar
