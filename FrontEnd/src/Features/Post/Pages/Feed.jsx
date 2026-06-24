import Post from "../Components/Post";
import UsePost from "../hooks/UsePost";
import { Link } from "react-router";
const Feed = () => {
  const { feed, loading } = UsePost();



  return loading ? (
    <h1 className="text-amber-50 text-3xl"> Loading Feed</h1>
  ) : (
    <div>
      <div className="h-20 w-full bg-gray-500 flex justify-between items-center px-10 md:text-4xl text-2xl">
        <h1 className="text-amber-50">Insta Clone</h1>
        <Link to={"/create-post"} className="text-amber-50 bg-[#141313] px-4 py-2 rounded-2xl">Create Post</Link>
      </div>
      <div className=" flex justify-center items-center flex-col ">
        {feed.map((e) => {
          console.log(e)
          return (
            
            <Post
              key={e._id}
              username={e.user.username}
              captions={e.captions}
              postImage={e.postPic}
              profilePic={e.user.profilePic}
              isLiked={e.isliked}
              postId={e._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
