import { useEffect, useEffectEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../Hooks/AuthHook";

const Login = () => {
  const [username, setusername] = useState("");
  const navigate = useNavigate();
  const [Password, setPassword] = useState("");
  const { user, loading, loginHandler } = useAuth();

  function submitHandler(e) {
    e.preventDefault();
    loginHandler(username, Password)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    setusername("");
    setPassword("");
  }

  return loading ? (
    <h1 className="text-white  text-4xl absolute top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%]  ">
      loading
    </h1>
  ) : (
    <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2">
      <div className="text-amber-50 flex items-center justify-center h-full w-full flex-col ">
        <h1 className="text-4xl mb-5">Login</h1>

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col items-center justify-center gap-5 mb-5"
        >
          <input
            onChange={(e) => {
              setusername(e.target.value);
            }}
            className="border rounded-3xl px-6 py-3 text-center  "
            type="text"
            placeholder="Username"
            value={username}
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className=" border rounded-3xl  px-6 py-3  text-center "
            type="text"
            placeholder="Password"
            value={Password}
          />
          <Link className="hover:underline" to="/register">
            Already have an account?
          </Link>
          <button className="bg-amber-50 border-2 border-amber-50 text-[#141313] px-6 py-3  rounded-3xl hover:bg-[#141313] hover:text-amber-50 transition cursor-pointer duration-250  ">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
