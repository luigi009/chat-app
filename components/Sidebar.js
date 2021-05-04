import React from 'react'
import { Avatar, Button } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import * as EmailValidator from 'email-validator'

function Sidebar() {

    const createChat = () => {
        const input = prompt("Please enter an email adress for the user you wish to chat with");

        if(!input) return null;

        if(EmailValidator.validate(input)) {
            
        }
    }

    return (
        <>
            <div>
                <header className="flex sticky top-0 bg-white z-[1] justify-between items-center p-5 h-[80px] border-b-2 border-fuchsia-600">
                    <Avatar className="cursor-pointer opacity-100 hover:opacity-80" />
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
                    <div className="flex items-center p-6 rounded-full">
                        <SearchIcon />
                        <input className="outline-none border-none flex-1" placeholder="Search in chats" />
                    </div>
                    <div className="p-6 pt-1">
                        <Button className="w-100" onClick={createChat}>Start a new chat</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
