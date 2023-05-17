import { getAbsoluteUrl } from "@/utils/helpers";

const absoluteUrl = getAbsoluteUrl();

export const fetchUser = async (address: string) => {
    const res = await fetch(`${absoluteUrl}/api/auth/get-user-nonce/${address}`, {
        cache: "no-cache",
    });
    return res.json();
};

export const signUp = async (address: string) => {
    const newUser = await fetch(`${absoluteUrl}/api/auth/signup`, {
        method: "post",
        body: JSON.stringify({ publicAddress: address }),
    });
    return newUser.json();
};

export const signUpFlow = async (address: string) => {
    const user = await fetchUser(address);
    if (user.nonce) {
        return user.nonce;
    }
    const newUser = await signUp(address);
    console.log("newUser ", newUser);
    return newUser.user.nonce;
};

export const login = async (address: string, signature: string) => {
    const newUser = await fetch(`${absoluteUrl}/api/auth/login`, {
        method: "post",
        body: JSON.stringify({ publicAddress: address, signature }),
    });
    return newUser.json();
};

export const logout = async () => {
    const res = await fetch(`${absoluteUrl}/api/auth/logout`, {
        cache: "no-cache",
    });
    return res.json();
};
