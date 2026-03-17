const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetcher<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${BASE_URL}/api${endpoint}`, {
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }
    return res.json();
}

export async function postData<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    const res = await fetch(`${BASE_URL}/api${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }
    return res.json();
}
