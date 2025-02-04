import { Account, Avatars, Client, Databases, OAuthProvider, Query } from "react-native-appwrite";
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';


export const config = {
    platform: "com.realscout",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseID: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    agentsID: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    galleriesID: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsID: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    propertiesID: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
}

export const client = new Client();

client
    .setPlatform(config.platform)
    .setEndpoint(config.endpoint!)
    .setProject(config.projectID!)

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

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

export async function getLatestProperties() {
    try {
        const result = await databases.listDocuments(
            config.databaseID!,
            config.propertiesID!,
            [Query.orderAsc('$createdAt'), Query.limit(5)]
        )
        return result.documents;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getProperties({ filter, query, limit }: { filter: string, query: string, limit?: number }) {
    try {
        const buildQuery = [Query.orderDesc('$createdAt')]
        if (filter && filter !== 'All') buildQuery.push(Query.equal('type', filter));
        if (query) buildQuery.push(Query.or([Query.equal('name', query), Query.equal('address', query), Query.equal('type', query)]));
        if (limit) buildQuery.push(Query.limit(limit));

        const result = await databases.listDocuments(
            config.databaseID!,
            config.propertiesID!,
            buildQuery
        )
        return result.documents;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getPropertyById({ id }: { id: string }) {
    try {
        const result = await databases.getDocument(
            config.databaseID!,
            config.propertiesID!,
            id
        );
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}