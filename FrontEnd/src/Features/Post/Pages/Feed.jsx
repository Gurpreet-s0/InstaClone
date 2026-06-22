import Post from "../Components/Post";
import UsePost from "../hooks/UsePost";

const Feed = () => {
  const { feed ,loading ,username } = UsePost();
console.log(feed)
  return (
   loading? <h1 className="text-amber-50 text-3xl"> Loading Feed</h1>:
    <div className=" flex justify-center items-center flex-col ">
      {feed.map((e) => {
        return <Post username={e.user.username} captions={e.captions} postImage={e.postPic} profilePic = {e.user.profilePic} isLiked={e.isliked}  />;
      })}
    </div>
  );
};

export default Feed;
