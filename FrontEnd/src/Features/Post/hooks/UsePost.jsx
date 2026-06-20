import React, { useContext } from 'react'
import { PostContext } from '../Context/Post.context'
import { getAllPosts } from "../Services/post.api";
const UsePost = () => {

const {feed,username,loading,setfeed,setusername,setloading} = useContext(PostContext)

 useEffect( ()=>{
            
            getAllPosts().then((res))
            
        },[])
  return (



  )
}

export default UsePost