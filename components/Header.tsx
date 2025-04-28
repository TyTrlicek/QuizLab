import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header className="bg-gray-400 py-4 shadow-md">
        <div className = "container mx-auto px-4 lg:px-8 flex items-center justify-between">
            <Link href = "/">
                <Image src = "globe.svg" alt = "logo" height = {36} width={36}/>
            </Link>
            <div className = "">
            <ul className="h-full gap-12 hidden lg:flex">
            <Link href = "/create">
            <Button className='cursor-pointer'>Create</Button>
            </Link>
            <Link href = "/">
            <Button className='cursor-pointer'>Drafts</Button></Link>
            <Link href = "/">
            <Button className='cursor-pointer'>Tier List</Button></Link>
            <Link href = "/">
            <Button className='cursor-pointer'>Trivia</Button></Link>
            <Link href = "/">
            <Button className='cursor-pointer'>Tournament</Button></Link>
            <Link href = "/">
            <Button className='cursor-pointer'>Profile</Button></Link>

            
            </ul>

            
            </div>
        </div>
    </header>
  )
}

export default Header