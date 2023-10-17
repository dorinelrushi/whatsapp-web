import React from 'react'
import { auth, db } from '../../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import Chatscreen from '../components/Chatscreen';

export default function Chat({ chat , messages}) {
    const [user] = useAuthState(auth);
  return (
    <div>
           <Chatscreen chat={chat} messages={messages}/>
    </div>
  )
}

export async function getServerSideProps(context){
     const ref = db.collection('chats').doc(context.query.id);

     const messageRes = await ref.collection("messages").orderBy('timestamp' , 'asc').get()

     const messages = messageRes.docs.map(doc=>({
        id : doc.id,
        ...doc.data()
     })).map(messages => ({
        ...messages,
        timestamp : messages.timestamp.toDate().getTime()
     }))



     const chatRes = await ref.get();
     const chat = {
        id : chatRes.id,
        ...chatRes.data()
     }

 console.log(chat,messages)
   return {
    props : {
        messages : JSON.stringify(messages),
        chat : chat
    }
   }

}