/**
 * Google OAuth Configuration for Erasmus+ Youth Exchange
 * 
 * To enable Google OAuth:
 * 1. Go to https://console.cloud.google.com/
 * 2. Create a new project or select existing one
 * 3. Enable Google+ API
 * 4. Create OAuth 2.0 credentials
 * 5. Add authorized redirect URIs:
 *    - http://localhost:3000/api/auth/callback/google (development)
 *    - https://your-domain.com/api/auth/callback/google (production)
 * 6. Copy Client ID and Client Secret
 * 7. Add to .env.local:
 *    GOOGLE_CLIENT_ID=your_client_id
 *    GOOGLE_CLIENT_SECRET=your_client_secret
 */

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

// OAuth endpoints
export const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
export const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
export const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

// Scopes required for registration
export const GOOGLE_SCOPES = [
  'openid',
  'email',
  'profile',
].join(' ');

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

/**
 * Generate Google OAuth URL for login/registration
 */
export function getGoogleAuthUrl(redirectUri: string, state?: string): string {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: GOOGLE_SCOPES,
    access_type: 'offline',
    prompt: 'consent',
  });

  if (state) {
    params.set('state', state);
  }

  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(
  code: string,
  redirectUri: string
): Promise<{ access_token: string; refresh_token?: string }> {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  return response.json();
}

/**
 * Get user info from Google
 */
export async function getGoogleUserInfo(accessToken: string): Promise<GoogleUser> {
  const response = await fetch(GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get user info');
  }

  return response.json();
}

/**
 * Check if Google OAuth is configured
 */
export function isGoogleAuthConfigured(): boolean {
  return !!GOOGLE_CLIENT_ID && !!GOOGLE_CLIENT_SECRET;
}

