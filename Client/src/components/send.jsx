import React from 'react'
import { useState } from 'react'
import io from 'socket.io-client'

export default function send() {

  const socket = io.connect('http://localhost:3001')
  const [message, setMessage] = useState('')
  
  function input(e){
    setMessage(e.target.value)
  }

  function send(){
    socket.emit('message', message)
  }

  return (
    <>
    <div className=''>
      <input onChange={input} type='text'/>
      <button onClick={send}>Send</button>
    </div>
    </>
  )
}
