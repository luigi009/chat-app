import React from 'react'
import Head from 'next/head'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'

function login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    return (
        <>
            <div className="grid place-items-center h-screen bg-gray-100">
                <Head>
                    <title>Login</title>
                </Head>

                <div className="flex flex-col items-center p-5 bg-white rounded-md shadow-2xl">
                    <img className="h-48 w-100 mb-5" src="/WhatsApp.png" alt="logo" />
                    <Button onClick={signIn} variant="outlined">Sign with Google</Button>
                    <p className="text-md m-4">Image rights for WhatsApp</p>
                </div>
          </div>
        </>
    )
}

export default login
