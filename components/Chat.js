import React from 'react'
import { Avatar } from '@material-ui/core'
import getRecipientEmail from '../utils/getRecipientEmail'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

function Chat({id, users}) {

    const router = useRouter();

    const [user] = useAuthState(auth)
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(users, user)))

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data()
    const recipientEmail = getRecipientEmail(users, user)

    return (
        <>
            <div onClick={enterChat} className="flex items-center cursor-pointer p-5 break-words hover:bg-gray-100">
                {recipient ? (<Avatar className="m-5" src={recipient?.photoURL} />) : (<Avatar className="m-5">{recipientEmail[0]}</Avatar>)}
                <p>{recipientEmail}</p>
            </div>
        </>
    )
}

export default Chat