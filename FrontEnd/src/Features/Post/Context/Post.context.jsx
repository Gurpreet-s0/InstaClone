import { createContext, useEffect, useState } from "react";


export const PostContext = createContext()

const PostContextProvider = function({children}){

       const [feed, setfeed] = useState(null)
       const [loading, setloading] = useState(null)
       const [username, setusername] = useState(null)

       
   return (
    <PostContext.Provider  value={{feed,setfeed,loading,setloading,username,setusername}}>
        {children}
    </PostContext.Provider>

   )
}

export default PostContextProvider
