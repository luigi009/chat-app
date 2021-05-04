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
                    <img className="h-48 w-100 mb-5" src="/luigi.jpg" alt="logo" />
                    <Button onClick={signIn} variant="outlined">Sign with Google</Button>
                </div>
          </div>
        </>
    )
}

export default login
