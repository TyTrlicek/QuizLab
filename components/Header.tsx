import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header className=" py-4 shadow-md" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
        <div className = "container mx-auto px-4 lg:px-8 flex items-center justify-between">
            <Link href = "/">
                <Image src = "globe.svg" alt = "logo" height = {36} width={36}/>
            </Link>
            <div className = "">
            <ul className="h-full gap-12 hidden lg:flex">
            <Link href = "/create">
            <Button className='cursor-pointer hover:opacity-80' style={{backgroundColor: 'var(--primary-color)'}}>Create</Button>
            </Link>
            <Link href = "/">
            <Button className='cursor-pointer hover:opacity-80' style={{backgroundColor: 'var(--primary-color)'}}>Drafts</Button></Link>
            <Link href = "/">
            <Button className='cursor-pointer hover:opacity-80' style={{backgroundColor: 'var(--primary-color)'}}>Tier List</Button></Link>
            <Link href = "/">
            <Button className='cursor-pointer hover:opacity-80' style={{backgroundColor: 'var(--primary-color)'}}>Trivia</Button></Link>
            <Link href = "/">
            <Button className='cursor-pointer hover:opacity-80' style={{backgroundColor: 'var(--primary-color)'}}>Tournament</Button></Link>
            <Link href = "/">
            <Button className='cursor-pointer hover:opacity-80' style={{backgroundColor: 'var(--primary-color)'}}>Profile</Button></Link>
            </ul>          
            </div>
        </div>
    </header>
  )
}

export default Header