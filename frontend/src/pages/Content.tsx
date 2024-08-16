import React, { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { MdEdit } from 'react-icons/md'

const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('# Hello, Coders!')
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true)

  const handleEditClick = () => {
    setIsReadOnly(false)
  }

  const handleSaveClick = () => {
    setIsReadOnly(true)
  }

  return (
    <div className='w-[95%] mx-auto'>
      <div className='flex flex-row justify-between mb-2'>
        <button
          className={`p-1 w-24 text-sm border-2 rounded-xl ${isReadOnly ? 'bg-slate-300  hover:bg-slate-500 cursor-pointer' : 'bg-gray-300 border-gray-300 cursor-not-allowed opacity-50'}`}
          onClick={handleEditClick}
          disabled={!isReadOnly}
        >
          <span className='flex flex-row justify-center  items-center'>
            Edit
            <MdEdit className='mx-1' />
          </span>
        </button>
        <button
          className={`p-1 w-24 text-sm border-2 rounded-xl ${!isReadOnly ? 'bg-green-300 border-green-300 hover:opacity-50 cursor-pointer' : 'hidden'}`}
          onClick={handleSaveClick}
          disabled={isReadOnly}
        >
          Save
        </button>
      </div>

      <MDEditor
        value={markdown}
        onChange={(value: string | undefined) => {
          if (!isReadOnly && value) {
            setMarkdown(value)
          }
        }}
        preview={isReadOnly ? 'preview' : 'edit'}
        hideToolbar={isReadOnly}
        height={isReadOnly ? 650 : 300}
      />
    </div>
  )
}

export default MarkdownEditor
