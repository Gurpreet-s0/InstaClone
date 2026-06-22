import UsePost from "../hooks/UsePost";

const Post = ({username,profilePic,postImage,captions}) => {
  UsePost()

  return (
    <div className="p-4 flex flex-col gap-5 md:w-150 justify-center md:items-center  md:border-x-2 md:border-gray-700 ">
      <div className="flex justify-start gap-5 items-center">
        <div>
          <img className="rounded-full h-15 w-15 object-cover " src={profilePic} alt="" />
        </div>
        <div className="text-amber-50 text-3xl ">@{username}</div>
      </div>
      <div>
        <img className="rounded-2xl object-cover md:h-100 md:w-100" src={postImage} alt="" />
      </div>
      <div className="text-amber-50 text-2xl ">
        {captions}
      </div>
      <div className="border-gray-700 w-full h-1 bg-gray-700"></div>
    </div>
  );
};

export default Post;
