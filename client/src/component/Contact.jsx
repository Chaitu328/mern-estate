import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

export default function Contact({listing}) {
    const [LandLord,setLandLord] = useState(null)
    const [message,setMessage] = useState('')
    const onChange =(e)=>{
        setMessage(e.target.value)
    }

    useEffect(()=>{
        const fetchLord = async()=>{
            try {
                const res = await fetch(`/api/user/${listing.userRef}`)
                const data = await res.json()
                setLandLord(data)
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchLord()
    },[listing.userRef])

  return (
    <div>
        {LandLord && (
            <div className='flex flex-col gap-4 my-4'>
                <p>Contact <span className='font-semibold'>{LandLord.username.toUpperCase()} </span> {' '} for{' '} <span className='font-semibold'>{listing.title}</span></p>
                <textarea
                className='border w-full p-3 rounded-lg '
                placeholder='Enter your message...'
                name='message'
                id='message'
                rows='2'
                value={message}
                onChange={onChange}
                >

                </textarea>
                <Link 
                to={`mailto:${LandLord.email}?subject=Regarding ${listing.title}&body=${message}`}
                className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                >
                    Send Message
                </Link>
            </div>
        )}
    </div>
  )
}
