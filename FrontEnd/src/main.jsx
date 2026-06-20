import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./Features/Auth/Context/AuthContext.jsx";
import PostContextProvider from "./Features/Post/Context/Post.context.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <PostContextProvider>
      <App />
    </PostContextProvider>
  </AuthContextProvider>,
);
