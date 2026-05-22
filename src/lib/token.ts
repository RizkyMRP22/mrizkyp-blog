import crypto from 'crypto';

const SECRET = process.env.RESUME_SECRET || process.env.BLOG_ADMIN_SECRET || 'fallback-secret-key-12345';
// Derive a 32-byte key using SHA-256 hash of the secret
const KEY = crypto.createHash('sha256').update(SECRET).digest();

/**
 * Encrypts an object payload into a URL-safe token.
 */
export function encryptToken(payload: object): string {
    const text = JSON.stringify(payload);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Using '.' instead of ':' to make it completely URL-safe without encoding
    return `${iv.toString('hex')}.${encrypted}`;
}

/**
 * Decrypts a token back into the original payload object.
 * Returns null if decryption fails or token is malformed.
 */
export function decryptToken(token: string): any {
    try {
        const [ivHex, encrypted] = token.split('.');
        if (!ivHex || !encrypted) return null;
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', KEY, iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);
    } catch (e) {
        return null;
    }
}
