"use client"

import React, { useEffect } from 'react'
import Tournament from '@/components/Tournament'
import { useParams } from 'next/navigation';



const page = () => {

    const { id } = useParams() as { id: string };
  return (
    <>
    <Tournament id = {id}/>
    </>
  )
}

export default page