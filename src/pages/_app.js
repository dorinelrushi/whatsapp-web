import "@/styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Login";
import firebase from "firebase/compat/app";
import { auth, db } from "../../firebase";
import Loading from "./components/Loading";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [user , loading] = useAuthState(auth);

  useEffect(()=>{
     if(user){
      db.collection("users").doc(user.uid).set(
        {
          email : user.email,
          lastSeen : firebase.firestore.FieldValue.serverTimestamp(),
          photoURL : user.photoURL
        },
        {merge:true}
      )
     }
  },[])

  if(loading) return <Loading/>
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}
