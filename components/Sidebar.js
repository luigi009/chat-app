import React from 'react'
import { Avatar, Button } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import * as EmailValidator from 'email-validator'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from './Chat'

function Sidebar() {

    const [user] = useAuthState(auth)
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
    const [chatSnapshot] = useCollection(userChatRef)

    const createChat = () => {
        const input = prompt("Please enter an email adress for the user you wish to chat with");

        if(!input) return null;

        if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
            db.collection('chats').add({
                users: [user.email, input],
            })
        }
    }

    const chatAlreadyExists = (recipientEmail) => !!chatSnapshot?.docs.find(chat => chat.data().users.find(user => user === recipientEmail)?.length > 0)
    

    return (
        <>
            <div className="container-sideBar flex-1 border-r-1 h-screen min-w-min max-w-xs">
                <header className="flex h-24 sticky top-0 bg-white z-[1] justify-between items-center p-5 h-[80px] border-b-2 border-fuchsia-600">
                    <Avatar src={user.photoURL} onClick={() => auth.signOut()} className="cursor-pointer opacity-100 hover:opacity-80" />
                    <div>
                        <IconButton>
                            <ChatIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </header>

                <div>
                    <div className="flex items-center p-3 m-4 rounded-full bg-gray-200">
                        <SearchIcon className="mr-4" />
                        <input className="outline-none border-none flex-1 bg-gray-200" placeholder="Search in chats" />
                    </div>
                    <div className="p-6 pt-1 flex items-center justify-center">
                        <Button className="w-100" onClick={createChat}>Start a new chat</Button>
                    </div>
                </div>
                {chatSnapshot?.docs.map((chat) => (
                    <Chat key={chat.id} id={chat.id} users={chat.data().users} />
                ))}
            </div>
        </>
    )
}

export default Sidebar
