"use client";
import React, { ReactNode } from "react";
import { RainbowKitProvider, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { Dispatch, createContext, useReducer } from "react";
import { CurrentToken, getUserClient } from "@/utils/localStorage";
import { login, logout, signUpFlow } from "./services";
import { WagmiClient, chains } from "./wagmiClient";
import { WagmiConfig } from "wagmi";

type StateType = {
    loading: boolean;
    address: string | undefined;
    signer: any | undefined,
    isError: boolean
};

type ActionType = {
    type: "setLoading" | "setUser" ;
    payload?: any
};

const user = getUserClient();


const initialState: StateType = {
    address: undefined,
    signer: undefined,
    loading: user?.publicAddress ? true : false,
    isError: false
};


const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case "setLoading":
            console.log("loading action has been called::::", action.payload)
            return { ...state, loading: action.payload };

        case "setUser":
            console.log("payload :::::::::::::", action.payload);
            return { ...state, ...action.payload }

        default:
            return state;
    }
};

export const AuthContext = createContext<{
    state: StateType;
    dispatch: Dispatch<ActionType>;
    setLoading: (loading:boolean)=>null
    signout: ()=>null
    signin: (signer:any) => null

    
}>({ state: initialState, dispatch: () => null,setLoading:(loading:boolean)=>null,signout:()=> null, signin :(signer: any) => null });



const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

 
    const sign_In = async (signer: any) => {
        dispatch({ type: "setLoading", payload: true })
        try {
            // console.log("= Create Wallet Triggered =");
            const userAddress = await signer!.getAddress();

            console.log('userAddress',userAddress)
           
                const nonce: string = await signUpFlow(userAddress);
                if (!nonce) {
                    // console.log("nonce not found :::::");
                    throw new Error("No Nonce Found");
                }
                const message = `My App Auth Service Signing nonce: ${nonce}`;
                let signature = await signer!.signMessage(message);
                // console.log("::::::::::::::::nonce has been found::::::::::::");

                const token = await login(userAddress, signature);
                // console.log("login api has been running :::::")

                new CurrentToken().set({ token: token.data });
                dispatch({ type: "setUser",payload:{address:userAddress,isError:false,loading:false,signer:signer}})
            
        } catch (e) {
      
            dispatch({ type: "setUser",payload:{address:undefined,isError:true,loading:false,signer:undefined}})
        }
    };



    const setLoading = (loading:boolean)=>{
        dispatch({ type: "setLoading",payload:loading })
        return null
    }


    const signin =  (signer: any)=>{
        sign_In(signer).then((val)=>console.log('val')).catch((e)=> console.log(e))
        // dispatch({ type: "setLoading",payload:loading })
        return null
    }


    
    const disconnectWallet = async () => {
        // console.log("= Disconnecting Wallet =");
        dispatch({ type: "setLoading",payload:true })
        new CurrentToken().remove();
        await logout();
    };

    const signout = () => {
        disconnectWallet().then(() => dispatch({ type: "setUser",payload:{...initialState,loading:false}}))
        return null
    }

    // const createAccount = (signer: any, state: StateType) => {
    //     createWallet(signer, state).then((data) => dispatch({ type: "createWallet", payload: data }))
    // }

    return (
        <AuthContext.Provider value={{ state, dispatch,setLoading,signout,signin}}>
            <WagmiConfig client={WagmiClient}>
                <RainbowKitProvider modalSize="compact" chains={chains}>{children}</RainbowKitProvider>
            </WagmiConfig>
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
