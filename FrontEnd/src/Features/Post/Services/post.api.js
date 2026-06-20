import axios from "axios"


const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})


export async function  getAllPosts(){
    try{
        const response = await api.get("/api/post/feed")
        
        return response.data
    }
    catch(err){
        console.log(err)
    }
}
