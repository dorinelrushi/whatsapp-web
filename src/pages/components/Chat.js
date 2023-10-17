import React from 'react';
import getRecipientEmail from '../../../utils/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';



function Chat({ id, users }) {

 const router = useRouter();

 const enterChat = () =>{
    router.push(`chat/${id}`)
 }

  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipientEmail(users, user))
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  return (
    <div>
      <div className='flex gap-[5px] hover:bg-[#dedede] cursor-pointer' onClick={enterChat}>
        {recipient ? (
          <Image src={recipient?.photoURL} width={100} height={100} />
        ) : (
          <div>

            <p>{recipientEmail[0]}</p>
          </div>
        )}
        {recipientEmail}
      </div>
    </div>
  );
}

export default Chat;
