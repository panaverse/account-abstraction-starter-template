'use client'

import Navbar from "@/components/layout/navbar";
import "./globals.css";
import React, { useContext, useEffect } from "react";
import { Inter } from "next/font/google";
// import AuthContextProvider, { AuthContext } from "@/context";
import { WagmiClient, chains } from "@/context/wagmiClient";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig, useSigner } from "wagmi";
import { getUserClient, isWagmiConnected } from "@/utils/localStorage";
import { AuthContext } from "@/context";


export default function SecLayout({ children }: { children: React.ReactNode }) {


    const getSigner =  useSigner()
    const { state, dispatch, setLoading,signout,signin } = useContext(AuthContext);

    


    console.log('state',state)

    useEffect(() => {
        const user = getUserClient();
        console.log('user',user)
        const isWagmiConn = new isWagmiConnected().get()

        if (isWagmiConn && user?.publicAddress && getSigner.data){
            // loggedIn
            setLoading(false)
        }
        else if (!isWagmiConn){
            // setLoading(false)
            signout()
        }

    
        else if (isWagmiConn && user?.publicAddress && !getSigner.data){
            // loading signer
            setLoading(true)
        }

    
    }, [getSigner.data, state.address,state.loading,state.signer,state.isError]);



    useEffect(()=>{

        if (getSigner.data){
            signin(getSigner.data)
        }


    },[getSigner.data])



    return (


            <div>
                {children}
         
            </div>
    
    );
}
