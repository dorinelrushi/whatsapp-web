import React from "react";
import { auth, provider } from "../../firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider);
  };
  return (
    <div>
      <button onClick={signIn}>Sign in with google</button>
    </div>
  );
}

export default Login;
