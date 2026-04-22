const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

function getHeaders(customHeaders: HeadersInit = {}): HeadersInit {
    const headers: Record<string, string> = {
        ...(customHeaders as Record<string, string>)
    };

    if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
        headers['x-vercel-protection-bypass'] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    }

    return headers;
}

export async function fetcher<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${BASE_URL}/api${endpoint}`, {
        cache: 'no-store',
        headers: getHeaders(),
    });
    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }
    return res.json();
}

export async function postData<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    const res = await fetch(`${BASE_URL}/api${endpoint}`, {
        method: 'POST',
        headers: getHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }
    return res.json();
}
