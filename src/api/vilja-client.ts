import { VILJA_API_BASE_URL } from '@/config/api';

interface AuthResponse {
  session?: string;
  error?: string;
}

class ViljaApiClient {
  private baseUrl: string;
  private sessionToken: string | null = null;

  constructor() {
    this.baseUrl = VILJA_API_BASE_URL;
    console.log('ViljaApiClient initialized with base URL:', this.baseUrl);
  }

  async initiateAuth(): Promise<AuthResponse> {
    console.log('Initiating BankID authentication...');
    return this.makeRequest('/mocker/identitybroker/oidc/bankid-signicat-login', {
      method: 'POST',
    });
  }

  setSessionToken(token: string) {
    this.sessionToken = token;
    console.log('Session token set successfully');
  }

  async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    console.log('Making Vilja API request to:', url);

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (this.sessionToken) {
        headers['Authorization'] = `Bearer ${this.sessionToken}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Vilja API response:', data);
      return data;
    } catch (error) {
      console.error('Vilja API request failed:', error);
      throw error;
    }
  }
}

export const viljaClient = new ViljaApiClient();