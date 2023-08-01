import React, { useCallback, useLayoutEffect } from 'react'
import Button from './Button'
import ProfileImage from './ProfileImage'
import { useSession } from 'next-auth/react'

function updateTextAreaHeight(textArea: HTMLTextAreaElement | undefined) {
    if (textArea == null) return

    textArea.style.height = "0";
    textArea.style.height = `${textArea.scrollHeight}px`
}

function Form() {
    const session = useSession();
    const [inputValue, setInputValue] = React.useState("");

    const textAreaRef = React.useRef<HTMLTextAreaElement>();

    /* 
    Because inputRef is assigned as the ref value, when the item gets mounted on the DOM it will call this function and thus
    assign the correct height to the textarea element using updateTextAreaHeight
    */

    const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
        updateTextAreaHeight(textArea);
        textAreaRef.current = textArea;
    }, [])
   
   useLayoutEffect(() => {
       updateTextAreaHeight(textAreaRef.current);
    }, [inputValue])
    
    if (session.status !== "authenticated") return null

    return(
        <form className='flex flex-col gap-2 border-b px-4 py-2' action="post">
            <div className='flex gap-4'>
                <ProfileImage src={ session.data.user.image ? session.data.user.image : "/home/mayorcachapa/code/MayorCachapa/dev/04-Next-Twitter/twitter-clone/public/blank-profile-picture-973460_960_720-300x300.png"}/>
                <textarea className='flex-grow overflow-hidden p-4 text-lg outline-none bg-transparent' 
                    ref={inputRef}
                    name="" 
                    placeholder="What's happening?"
                    style={{height: 0}}
                    value={inputValue}
                    onChange={(e) => (setInputValue(e.target.value))}
                />
            </div>
            <Button className='self-end'>Tweet</Button>
        </form>
     )
}

export default function NewTweetForm() {
    const session = useSession();
    if (session.status !== "authenticated") return

    return <Form />
}