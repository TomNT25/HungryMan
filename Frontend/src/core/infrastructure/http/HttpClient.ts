export interface BaseAPIRequest<T> {
  data: T;
  requestId?: string;
  timestamp?: string;
}

export interface BaseAPIResponse<T> {
  isSuccess: boolean;
  statusCode: number;
  message?: string;
  data?: T;
  errors?: string[];
  timestamp?: string;
}

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:5132/api/v1') {
    this.baseUrl = baseUrl;
  }

  private getAuthToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  async get<TResponse>(path: string): Promise<BaseAPIResponse<TResponse>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  async post<TRequest, TResponse>(
    path: string,
    requestData: TRequest
  ): Promise<BaseAPIResponse<TResponse>> {
    const payload: BaseAPIRequest<TRequest> = {
      data: requestData,
      requestId: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      timestamp: new Date().toISOString()
    };

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      let parsedError;
      try {
        parsedError = JSON.parse(errorText);
      } catch {
        // Ignored fallback
      }
      throw new Error(parsedError?.message || `HTTP Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }
}

export const httpClient = new HttpClient();
