import { VILJA_API_BASE_URL } from '@/config/api';

class ViljaApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = VILJA_API_BASE_URL;
    console.log('ViljaApiClient initialized with base URL:', this.baseUrl);
  }

  async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    console.log('Making Vilja API request to:', url);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
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