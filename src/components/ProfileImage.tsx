import React from 'react'
import Image from 'next/image'

interface ProfileImageProps {
    src: string
    className?: string
}

export default function ProfileImage({src, className = ''}: ProfileImageProps) {
  return (
    <div className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}>
        {!src ? null :
        <Image src={src} alt='Profile' quality={100} fill />
        }
    </div>
  )
}