import React, { createContext, useEffect, useRef, useState } from 'react'
import DirectoryMapper from './DirectoryMapper'
import Directory, { dataType, ResultArr } from '../utils/helper/DirFormatter'
import { RiFolderAddLine } from 'react-icons/ri'
import COLLECTION_API from '../utils/api/collection'
// import data from './data'

const Sidebar = () => {
  const [takeinputColl, setinputColl] = useState(false)
  const inputContext = createContext(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const [data, setData] = useState<ResultArr>([])

  useEffect(() => {
    COLLECTION_API.Get_All_By_Parent_ID({ parent: null }).then((res) => {
      setData(res.data)
    })
  }, [])
  const dataArr = new Directory(data as dataType).createObject()
  const handleAddCollection = () => {
    setinputColl(true)
  }

  const handleKeyDown = (parent: number | null) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputRef.current && inputRef.current.value.trim() !== '') {
      console.log(inputRef.current.value)
      setinputColl(false)
      COLLECTION_API.ADD({ name: inputRef.current.value, parent }).then((res) => {
        console.log(res)
      })
    }
  }

  return (
    <>
      <div className='sidebar h-screen bg-slate-400 w-1/6'>
        <inputContext.Provider value={takeinputColl}>
          <div className='flex justify-center py-2 text-3xl'>
            <RiFolderAddLine onClick={handleAddCollection} />
          </div>
          <DirectoryMapper data={dataArr as ResultArr} takeinputColl={takeinputColl} setinputColl={setinputColl} />
          {takeinputColl && <input ref={inputRef} onKeyDown={handleKeyDown(null)} className='p-2 m-2' />}
        </inputContext.Provider>
      </div>
    </>
  )
}

export default Sidebar
