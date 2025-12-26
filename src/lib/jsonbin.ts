/**
 * JSONBin.io client for demo authentication
 * This is a DEMO ONLY implementation - no advanced security
 */

const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID;
const ACCESS_KEY = import.meta.env.VITE_JSONBIN_ACCESS_KEY;
const BASE_URL = 'https://api.jsonbin.io/v3/b';

if (!BIN_ID || !ACCESS_KEY) {
  throw new Error('Missing required JSONBin environment variables: VITE_JSONBIN_BIN_ID and VITE_JSONBIN_ACCESS_KEY');
}

export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Database {
  users: User[];
}

/**
 * Read the database from JSONBin
 */
export async function readDb(): Promise<Database> {
  const response = await fetch(`${BASE_URL}/${BIN_ID}`, {
    method: 'GET',
    headers: {
      'X-Access-Key': ACCESS_KEY,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to read database: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  return data.record || { users: [] };
}

/**
 * Write the database to JSONBin (PUT replaces the whole bin)
 */
export async function writeDb(db: Database): Promise<void> {
  const response = await fetch(`${BASE_URL}/${BIN_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': ACCESS_KEY,
    },
    body: JSON.stringify(db),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to write database: ${response.status} ${response.statusText} - ${errorText}`);
  }
}

/**
 * Normalize email: trim and lowercase
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Generate a simple user ID
 */
export function generateUserId(): string {
  return `u_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

