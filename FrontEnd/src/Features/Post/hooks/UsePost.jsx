import { useContext, useEffect } from "react";
import { PostContext } from "../Context/Post.context";
import { createNewPost, getAllPosts } from "../Services/post.api";
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
  }, []);

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

  return { ...context, loading, createPostHandler };
};

export default UsePost;
