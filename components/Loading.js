import React from 'react'
import { Circle } from 'better-react-spinkit'

function Loading() {
    return (
        <>
            <center className="grid place-items-center h-screen">
                <div>
                    <img className="h-48 mb-5" src="/luigi.jpg" alt="" />
                    <Circle color="#3cbc28" size={60} />
                </div>
            </center>
        </>
    )
}

export default Loading
