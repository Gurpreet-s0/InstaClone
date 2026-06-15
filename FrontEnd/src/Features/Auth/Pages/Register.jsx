import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [Password, setPassword] = useState("");

  function submitHandler(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/auth/register",
        {
          username: username,
          email: email,
          password: Password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });

    setusername("");
    setemail("");
    setPassword("");
  }

  return (
    <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2">
      <div className="text-amber-50 flex items-center justify-center h-full w-full flex-col ">
        <h1 className="text-4xl mb-5">Register</h1>

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
              setemail(e.target.value);
            }}
            className="border rounded-3xl px-6 py-3 text-center  "
            type="text"
            placeholder="Email"
            value={email}
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
          <Link  className="hover:underline" to="/login">Don't have an account?</Link>
          <button className="bg-amber-50 border-2 border-amber-50 text-[#141313] px-6 py-3  rounded-3xl hover:bg-[#141313] hover:text-amber-50 transition cursor-pointer duration-250  ">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
