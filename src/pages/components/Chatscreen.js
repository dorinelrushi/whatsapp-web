import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../firebase'; // Assuming auth is already imported in your 'firebase' module
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
import firebase from 'firebase/compat/app';

function Chatscreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input, setInput] = useState(''); // Initialize input with an empty string
  const [messagesSnapshot] = useCollection(
    db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc')
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return (
        <div>
          {messagesSnapshot.docs.map((message) => (
            <Message
              key={message.id}
              user={message.data().user}
              message={{ ...message.data(), timestamp: message.data().timestamp?.toDate().getTime() }}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          {JSON.parse(messages).map((message) => (
            <Message key={message.id} user={message.user} message={message} />
          ))}
        </div>
      );
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("users").doc(user.uid).set({
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input, // Changed "messages" to "message"
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput('');
  };

  return (
    <div>
      {showMessages()}
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='bg-[#e3e2e2] p-[10px]'
          placeholder='Write a message'
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatscreen;
