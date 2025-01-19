import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';


export const config = {
    platform: "com.realscout",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
    .setPlatform(config.platform)
    .setEndpoint(config.endpoint!)
    .setProject(config.projectID!)

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
    try {
        const redirectUri = Linking.createURL('/');
        const response = await account.createOAuth2Token(
            OAuthProvider.Google, redirectUri
        );

        if (!response) throw new Error('Failed to login');

        const browserResult = await WebBrowser.openAuthSessionAsync(
            response.toString(),
            redirectUri,
        )

        if (browserResult.type !== 'success') throw new Error('Failed to login');

        const url = new URL(browserResult.url);
        const secret = url.searchParams.get('secret')?.toString();
        const userID = url.searchParams.get('userId')?.toString();

        if (!secret || !userID) throw new Error('Failed to login');

        const session = await account.createSession(userID, secret);

        if (!session) throw new Error('Failed to create session');

        return session;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function logout() {
    try {
        await account.deleteSession("current");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getUser() {
    try {
        const response = await account.get();
        if (!response) throw new Error('Failed to get user');

        const userAvatar = avatar.getInitials(response.name);
        return {
            ...response,
            avatar: userAvatar.toString(),
        };
    } catch (error) {
        console.error(error);
        return false;
    }
}