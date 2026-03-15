import { config } from '../utils/config';
import type { Promotion } from '../types';

const BASE_URL = config.apiBaseUrl;

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(`Request failed: ${response.statusText}`, response.status);
  }
  return response.json() as Promise<T>;
}

export async function fetchPromotions(): Promise<Promotion[]> {
  const response = await fetch(`${BASE_URL}/promotions`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse<Promotion[]>(response);
}

export async function fetchPromotionById(id: number): Promise<Promotion> {
  const response = await fetch(`${BASE_URL}/promotions/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return handleResponse<Promotion>(response);
}

export async function toggleOptIn(id: number, optedIn: boolean): Promise<Promotion> {
  const response = await fetch(`${BASE_URL}/promotions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ optedIn }),
  });
  return handleResponse<Promotion>(response);
}
