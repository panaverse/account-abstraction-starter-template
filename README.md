## Overview

We will be using a developer framework called ZERODEV for creating, using, and extending smart wallets powered by account abstraction (ERC-4337). 

This step demonstrates how to create a complete signup/login flow using your wallet which in this case is created using ZERODEV. We are using NEON (SQL database) to save the user's public address and other information. All the authentication apis were created using Nextjs.

## How to run the code

1) [Setup your NEON database](https://github.com/panaverse/learn-nextjs/tree/main/step12_serverless_databases/relational/step00_raw_helloworld)
2) Create a 'Users' table in your neon database 

```
CREATE TABLE "Users" (
  "userId" SERIAL,
  "secretText" VARCHAR(50),
  "creationDate" TIMESTAMP NOT NULL DEFAULT now(),
  "nonce" VARCHAR(50),
  "publicAddress" VARCHAR(50),
  PRIMARY KEY ("userId")
);
```


3) Create a project ID from zero dev's dashboard and get the connection string of your neon database. Enter the zero-dev project id and neon connection string as enviornment variables in the next.config.js file

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    CONNECTION_STRING: "ENTER YOUR NEON CONNECTION STRING HERE",
    PROJECT_ID: 'ENTER YOUR ZERO DEV PROJECT ID HERE'
  }
}

module.exports = nextConfig

```

4) run ```yarn install```
5) run ```yarn dev```

## Docs of main libraries used 

[Zerodev docs](https://docs.zerodev.app/)   ------ to create and connect with erc-4337 wallets
[Wagmi docs](https://wagmi.sh/)  ------ to integrate and manage blockchain integration in a Nextjs app
[Rainbowkit docs](https://www.rainbowkit.com/docs/introduction)  ------- to intgerate a readymade button that connects with blockchain and wallet


## Our custom authentication apis created on Nextjsss
1) login
2) signup
3) get-user-nonce
4) authorize
5) logout

## Understanding the flow

### Signup 

Apis used in this flow : get-user-nonce & signup

1) Whenever a user creates and connects their wallet on our application, we send that wallet address to our api called 'get-user-nonce'. This api returns the nonce if the user is already in our database. 

2) If no nonce is returned in step 1, this means that the user is signing in for the first time so we create an entry in the database using the 'signup' api. We save their publicAddress and a random nonce.


### login

Apis used in this flow : get-user-nonce &  login

1) We first retrieve user's nonce using the 'get-user-nonce' api.
2) We then ask the user to sign this nonce and this signature is sent to the 'login' api. If the signature is verified, this 'login' api creates a jwt token and saves it in cookies.

### middleware

[Learn middle](https://github.com/panaverse/learn-nextjs/tree/main/step13_middleware)

Apis used in this flow: authorize

1) Every request that needs to be accessed by only logged in users is checked by the middleware.
2) Middleware on every matching request, reads the saved jwt token in cookies and verifies it using the 'authorize' api. If the jwt is successfully verified then it allows the request to proceed otherwise throws an error (or redirects to another page).

Note: You cannot access database directly in the middleware due to websocket restrictions therefore we had to create 'authorize' api to access the database for jwt verification.


### Logout

Apis used in this flow: logout

1) This api clears the jwt token from cookies


NOTE: We are not only saving the jwt token in cookies but also in the local storage to easiy access it from the client-side.


## Understanding code

1) User's authentication state is based on 2 things. 1) user's wallet is connected to the application 2) user's jwt token is available on the app (through local storage). We require both of these things to declare that a user is logged in. 
2) The wallet connection is handled by wagmi and zerodev, and the availability of jwt token is handled by our custom apis.
3) To merge this information from 2 different sources and maintain a singleton authentication state throughout the app we have used React's context api and a secondary layout (secLayout.tsx) component that you can find in the app folder
4) Secondary layout handles the authentication state throughout the app in the context api.
5) The tricky part is when the user has logged in, their jwt token is stored in the local storage and they refresh the page. In this case, the zerodev takes a while to connect to the wallet so the secandary layout updates the loading state to true in the context until the zerodev has conneected to the wallet
6) User's authentication flow is available throught out the app through context api.

## Caveats

1) Zerodev and Wagmi sometimes takes alot of time to connect with the wallet, therefore you may see long loading times on page refresh
2) Zerodev's integration with Wagmi is a bit buggy right now. Wagmi takes a while to give out loading or connecting states when you refresh the page therefore it has been handled through a custom work around.
3) You may encounter unexpected errors from Zerodev somtimes
