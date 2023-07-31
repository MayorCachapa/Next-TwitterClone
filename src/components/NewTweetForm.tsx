import React from 'react'
import Button from './Button'
import ProfileImage from './ProfileImage'

export default function NewTweetForm() {
  return (
    <form className='flex flex-col gap-2 border-b px-4 py-2' action="post">
        <div className='flex gap-4'>
            {/* <ProfileImage /> */}
            <textarea className='flex-grow overflow-hidden p-4 text-lg outline-none bg-transparent' name="" placeholder="What's happening?"></textarea>
        </div>
        <Button className='self-end'>Tweet</Button>
    </form>
  )
}