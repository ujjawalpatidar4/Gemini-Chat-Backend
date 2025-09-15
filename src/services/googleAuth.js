// googleAuth.js
import { GoogleAuth } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
const scopes = process.env.GOOGLE_API_SCOPES.split(',');

const auth = new GoogleAuth({
  keyFile,
  scopes,
});

export async function getAccessToken() {
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  return accessToken.token;
}