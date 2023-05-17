"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { AuthContext } from '@/context';
import { getAbsoluteUrl } from '@/utils/helpers';
import { getUserClient } from '@/utils/localStorage';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useContext, useEffect, useState } from 'react'
import { useAccount, useDisconnect, useSigner } from 'wagmi';
// import {RainbowKit} from '@rainbow-me/rainbowkit'

const Connect = () => {
    // const absoluteUrl = getAbsoluteUrl();
    // const [isSigner, setIsSigner] = useState<boolean>(false);
    // const [signer, setSigner] = useState<any>(undefined);
    const { state, dispatch,setLoading,signin,signout } = useContext(AuthContext);
    // const [firstTrigger, setfirstTrigger] = useState<boolean>(true);
    const { status } = useAccount();
    let count: number = 0;
    console.log("state global :::::", state);
    // console.log("loading :::", state.loading, "state.address ::::", state.address, "state.isConnected :::::", state.isConnected);


    
    const getSigner =  useSigner()
    
    const disconnect = useDisconnect()

    console.log('signer',getSigner)

    return (

        
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,

            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                // const ready = mounted && authenticationStatus !== 'loading';
                // const connected =
                //     ready &&
                //     account &&
                //     chain &&
                //     (!authenticationStatus ||
                //         authenticationStatus === 'authenticated');

                // console.log("authenticationStatus ::::", authenticationStatus, "MOUNTED ::::", mounted, "ready condition::::", ready);

                    console.log('account',account)
                    console.log('authenticationStatus',authenticationStatus)
                return (
                    <div>
                        {(() => {
                            if (!mounted) {
                                return (
                                    <button className='connect-btn flex gap-x-3 capitalize' type="button">
                                        <span>initializing...</span>
                                    </button>
                                );
                            }
                            else if (state.loading) {
                                return (
                                    <button className='connect-btn flex gap-x-3 capitalize' type="button">
                                        <span>loading...</span>
                                    </button>
                                )
                            }
                            else if (!state.loading && !state.address) {
                                return (
                                    <button
                                        onClick={openConnectModal}
                                        type="button"
                                        className="connect-btn flex gap-x-3 capitalize"
                                    >
                                        <span>Connect Wallet</span>
                                    </button>

                                )
                            }
                            else if (!state.loading && state.isError) {
                                return (
                                    <button
                                        // onClick={openConnectModal}
                                        type="button"
                                        className="connect-btn  text-white flex gap-x-3 capitalize"
                                    >
                                        <span>Error</span>
                                    </button>

                                )
                            }

                            //   if (chain.unsupported) {
                            //     return (
                            //       <button onClick={openChainModal} type="button">
                            //         Wrong network
                            //       </button>
                            //     );
                            //   }
                            else if (account && state.address && state.signer) {
                                return (
                                    // <div style={{ display: 'flex', gap: 12 }}>
                                    <div className=" flex flex-col items-center justify-center">
                                    <button 
                                        className="connect-btn flex gap-x-3 capitalize"
                                        type="button"
                                    >
                                        {state.address?.substring(0, 4)}...{state.address?.substring(
                                            state.address.length - 4,
                                            state.address.length,
                                        )}
                                        {/* {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ''} */}
                                    </button>
                                    <button onClick={()=>{
                                        console.log('yolo')
                                        signout()
                                        disconnect.disconnect()}} >disconnect</button>
                                     </div>
                                );
                            }
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>

    )
}

export default Connect

const Spinner = ({ className }: { className: string }) => {
    return (
        <svg
            className={`animate-spin -ml-1 mr-3 h-5 w-5 ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
};
