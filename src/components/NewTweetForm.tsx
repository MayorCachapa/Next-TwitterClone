import React, { type FormEvent, useCallback, useLayoutEffect } from 'react'
import Button from './Button'
import ProfileImage from './ProfileImage'
import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'

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
    /* 
    To actually create a tweet, we call api from utils. With api we can access the code inside tweet.ts, meaning we can 
    communicate with Prisma, accessing the model 'tweet' inside the schema with the create method and useMutation.
    */
    const createTweet = api.tweet.create.useMutation({
        onSuccess: (newTweet) => {
            console.log(newTweet);
        }
    })

    /* 
    We create a handleSubmit to hook our form. We pass our createTweet object. Inside, we assign the field 'content' from tweet and 
    pass the values stored inside inputValue. 
    */

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        createTweet.mutate({ content: inputValue })
    }
    
    if (session.status !== "authenticated") return null

    return(
        <form className='flex flex-col gap-2 border-b px-4 py-2' onSubmit={handleSubmit}>
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