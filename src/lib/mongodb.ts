import { MongoClient } from 'mongodb';

const uri = process.env.blog_MONGODB_URI as string;
const dbName = process.env.MONGODB_DB_NAME || 'mrizkyp-blog';

if (!uri) {
    throw new Error('Please define the blog_MONGODB_URI environment variable');
}

/**
 * In development, cache the MongoClient promise on the global object
 * to prevent creating a new connection on every hot-reload.
 * In production (Vercel), warm function instances reuse the same promise.
 */
declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    if (!globalThis._mongoClientPromise) {
        client = new MongoClient(uri);
        globalThis._mongoClientPromise = client.connect();
    }
    clientPromise = globalThis._mongoClientPromise;
} else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

/**
 * Returns a connected MongoDB database instance.
 * @example const db = await getDb(); const docs = await db.collection('posts').find().toArray();
 */
export async function getDb() {
    const client = await clientPromise;
    return client.db(dbName);
}

export default clientPromise;
