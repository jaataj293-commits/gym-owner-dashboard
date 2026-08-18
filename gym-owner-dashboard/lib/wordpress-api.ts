const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://keniyahost.com';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export async function fetchFromWordPress<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const url = `${WORDPRESS_URL}/wp-json/gmc/v1${endpoint}`;
    
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.message || 'Request failed',
      };
    }

    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

export async function postToWordPress<T>(
  endpoint: string,
  body: Record<string, any>
): Promise<ApiResponse<T>> {
  return fetchFromWordPress<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
