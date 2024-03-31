'use client'

import liff from '@line/liff'
import { useState, useEffect } from 'react'
import { useMyContext } from './_Handlers/Mycontext'
import { useRouter } from 'next/navigation'


const liffId ="2003132004-R8W9JPw8"

const handleLogout = () => {
    liff.logout()
    window.location.reload()
}


export default function Home() {
   
const {setlineProfile,lineProfile} = useMyContext({});
const router = useRouter(); // Initialize the router

    useEffect(() => {
        const main = async () => {
            await liff.init({ liffId })
            if (!liff.isLoggedIn()) {
                liff.login()
                return
            }

            const lineProfile = await liff.getProfile()
            setlineProfile(lineProfile)
            sessionStorage.setItem('lineProfile', JSON.stringify(lineProfile));
            router.push('/Account');

        }

        try {
            main()
        } catch (err) {
            console.log(err)
        }
    }, [])

    console.log(lineProfile)

   
    return (
        <>
          

        </>

    )
}

