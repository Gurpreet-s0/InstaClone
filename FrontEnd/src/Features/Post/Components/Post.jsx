const Post = ({username,profilePic,postImage,captions}) => {
  return (
    <div className="p-4 flex flex-col gap-5 md:w-150 justify-center md:items-center  md:border-x-2 md:border-gray-700 ">
      <div className="flex justify-start gap-5 items-center">
        <div>
          <img className="rounded-full h-15 w-15 object-cover " src="https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8" alt="" />
        </div>
        <div className="text-amber-50 text-3xl ">@Username</div>
      </div>
      <div>
        <img className="rounded-2xl object-cover md:h-100 md:w-100" src="https://images.unsplash.com/photo-1781795290283-893dd050eeb3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8" alt="" />
      </div>
      <div className="text-amber-50 text-2xl ">
        Captions Captions
      </div>
    </div>
  );
};

export default Post;
