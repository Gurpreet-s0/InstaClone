import { useContext, useEffect } from "react";
import { PostContext } from "../Context/Post.context";
import { getAllPosts } from "../Services/post.api";
const UsePost = () => {
  const context = useContext(PostContext);
  const {  setfeed, setusername, setloading } = context;

  useEffect(() => {
    getAllPosts()
      .then((res) => {
        setfeed(res.data.posts);
        setusername(res.data.username)
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(()=>{
        setloading(false)
      })
  }, []);

  return context;
};

export default UsePost;
