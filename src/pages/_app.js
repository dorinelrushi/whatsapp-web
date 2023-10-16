import "@/styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Login";
import { auth } from "../../firebase";

export default function App({ Component, pageProps }) {
  const [user] = useAuthState(auth);

  if (!user) return <Login />;

  return <Component {...pageProps} />;
}
