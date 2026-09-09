import { Client, Databases, ID, Query } from "appwrite";

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const TABLE_ID = import.meta.env.VITE_APPWRITE_METRICS_TABLE_ID;

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async(searchTerm, movie) => {
    try {
        const result = await database.listDocuments(DB_ID, TABLE_ID, [
            Query.equal('searchTerm', searchTerm),
        ])

        if (result.documents.length > 0) {
            const doc = result.documents[0];
            await database.updateDocument(DB_ID, TABLE_ID, doc.$id, {
                count: doc.count + 1,
            })
        } else {
            await database.createDocument(DB_ID, TABLE_ID, ID.unique(), {
                searchTerm,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                movie_id: movie.id,
            })
        }
    } catch (error) {
        console.log(error);
    }
}
