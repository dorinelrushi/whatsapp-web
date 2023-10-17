import React from "react";
import * as EmailValidator from "email-validator";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from "./Chat";
import Image from "next/image";

function Sidebar() {
  const [user] = useAuthState(auth);

  const userChatRef = db.collection("chats").where('users', 'array-contains', user.email);

  const [chatSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt("Enter an email address for the user");

    if (!input) return;

    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      db.collection("chats").add({
        users: [user.email, input]
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) => {
    return !!chatSnapshot?.docs.find(chat => chat.data().users.includes(recipientEmail));
  };

  return (
    <>
      <div className="p-[10px] bg-[#f0eeee]">
        <div className="header flex items-center justify-between p-[15px]" >
          <div className="flex items-center gap-2">
            <Image  src={user.photoURL} width={50} height={50} className="rounded-[50px]" onClick={() => auth.signOut()} />
            <p>{user.email}</p>
          </div>
          <div className="flex gap-6">
            <div className="">Message</div>
            <div className="setting">Setting</div>
          </div>
        </div>
        <div className="form">
          <form>
            <input
              className="w-[100%] p-[5px]"
              type="text" // Change 'chat' to 'text'
              placeholder="Search in chat"
            />
          </form>
        </div>
        <button
          onClick={createChat}
          className="p-[5px]  w-[100%] border-[1px] border-[#c9c8c8] mt-[15px]"
        >
          Start a new chat
        </button>

        {/* list of chats*/}
        {chatSnapshot?.docs.map((chat)=>(
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </div>
    </>
  );
}

export default Sidebar;
