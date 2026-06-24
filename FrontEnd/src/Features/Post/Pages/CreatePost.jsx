import React, { useRef, useState } from 'react'
import UsePost from '../hooks/UsePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {
    const navigate = useNavigate()
    const {createPostHandler,loading} = UsePost()
    const [captions, setcaptions] = useState("")
     const postImageInputRef = useRef(null)
    const formHandler = async function(e){
            e.preventDefault()
            const file = postImageInputRef.current.files[0]
             await createPostHandler(file,captions)
            setcaptions("")
            navigate("/")
    }
 return loading ? (
    <h1 className="text-amber-50 text-3xl flex justify-center items-center h-full w-full ">Creating Post.....</h1>
  ) : (
    <div className='flex justify-center items-center flex-col gap-4 text-amber-50 h-full w-full'>
        <div className='text-4xl font-bold '>Create Post</div>
        <form onSubmit={(e)=>{
            formHandler(e)
        }} className='flex flex-col justify-center items-center gap-4'>

            <label className='text-2xl bg-amber-50 text-[#141313] rounded-2xl px-6 py-2 hover:bg-[#141313] hover:text-amber-50 border-amber-50 border-2 transition-colors duration-200  ease-in ' htmlFor="FileInput">Select Image</label>
            <input ref={postImageInputRef} hidden type='file' id='FileInput'  />
            <input onChange={(e)=>{
                setcaptions(e.target.value)
            }} className='px-6 py-2 text-center border-2 border-amber-50 rounded-2xl ' value={captions} type="text" placeholder='Enter Captions' />
            <div className='flex gap-5'><button type="submit" className='text-2xl bg-amber-50 text-[#141313] rounded-2xl px-6 py-2 hover:bg-[#141313] hover:text-amber-50 border-amber-50 border-2 transition-colors duration-200  ease-in ' >Create</button>
            <button type="button" onClick={()=>{
                navigate('/')
            }} className='text-2xl bg-[#141313] text-amber-50 rounded-2xl px-6 py-2 hover:bg-amber-50 hover:text-[#141313] border-amber-50 border-2 transition-colors duration-300  ease-in '>Cancel</button></div>
            
        </form>
    </div>
  )
}

export default CreatePost
