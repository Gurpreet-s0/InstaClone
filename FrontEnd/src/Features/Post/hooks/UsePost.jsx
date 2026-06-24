import { useContext, useEffect } from "react";
import { PostContext } from "../Context/Post.context";
import { createNewPost, getAllPosts, unLikePost ,likePost } from "../Services/post.api";
const UsePost = () => {
  const context = useContext(PostContext);
  const { loading, setfeed, setloading } = context;

  useEffect(() => {
    getAllPosts()
      .then((res) => {
        setfeed(res.data.posts.reverse());
      })
      .catch((res) => {
        console.log(res);
      }) 
      .finally(() => {
        setloading(false)
      });
  },[]);

  const createPostHandler = async function (file, captions) {
    if (!file) {
      throw new Error("Please select an image before creating a post");
    }
    setloading(true);
    try {
      const res = await createNewPost(file, captions);
      setfeed((prevFeed) => [res.post, ...prevFeed.reverse()]);
    } catch (res) {
      console.log(res);
    } finally {
      setloading(false);
    }
  };

  async function likeHandler(postId) {
    try {
     await likePost(postId)
     getAllPosts()
      .then((res) => {
        setfeed(res.data.posts.reverse());
      })
      .catch((res) => {
        console.log(res);
      }) 
      .finally(() => {
        setloading(false)
      })
   
    } catch (error) {
      console.log(error)
    }
  }

  async function unLikeHandler(postId) {
    try {
     await unLikePost(postId)
     getAllPosts()
      .then((res) => {
        setfeed(res.data.posts.reverse());
      })
      .catch((res) => {
        console.log(res);
      }) 
      .finally(() => {
        setloading(false)
      })
   
    } catch (error) {
      console.log(error)
    }
  }

  return { ...context, loading, createPostHandler ,likeHandler,unLikeHandler };
};

export default UsePost;
