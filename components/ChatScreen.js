import { Avatar, IconButton } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message';
import { InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic'
import firebase from 'firebase'
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';

function ChatScreen({ chat, messages }) {
    console.log(messages);
    const endOfMessagesRef = useRef(null);
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("")
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection("messages").orderBy('timestamp', "asc"))
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(chat.users, user)))

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) => (
                <Message key={message.id} user={message.data().user} message={{...message.data(), timestamp: message.data().timestamp?.toDate().getTime(),}} ></Message>
            ))
        } else {
            return JSON.parse(messages).map((message) => (
                <Message key={message.id} user={message.user} message={message} />
            ))
        }
    }

    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, {merge: true});

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });

        setInput("");
        scrollToBottom();
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user);

    return (
        <>
            <div>
                <header className="flex p-4 sticky top-0 bg-white z-50 h-24 items-center border-b-2 border-fuchsia-600">
                    {recipient ? (<Avatar src={recipient?.photoURL} />) : (<Avatar>{recipientEmail[0]}</Avatar>)}

                    <div className="flex-1 ml-5">
                        <h3 className="mb-2 font-bold">{recipientEmail}</h3>
                        {recipientSnapshot ? (<p className="text-base text-gray-500">Last active: {''} {recipient?.lastSeen?.toDate() ? (<TimeAgo datetime={recipient?.lastSeen?.toDate()} />) : "Unavailable"}</p>) : (<p>Loading Last active...</p>)}
                    </div>
                    <div className="flex-initial ml-4">
                        <IconButton>
                            <AttachFileIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </header>

                <div className="p-5 overflow-y-hidden" style={{minHeight: "90vh", backgroundColor: "#e5dfd9"}}>
                    {showMessages()}
                    <div className="mb-5" ref={endOfMessagesRef} />
                </div>

                <form className="flex items-center p-3 sticky bottom-0 bg-white z-50">
                    <InsertEmoticon />
                    <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 items-center p-5 sticky bottom-0 bg-gray-200 mr-5 ml-5" />
                    <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
                    <MicIcon />
                </form>
            </div>
        </>
    )
}

export default ChatScreen
