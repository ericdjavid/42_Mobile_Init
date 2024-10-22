import axios from "axios";

export async function exchangeCodeForToken(code: string): Promise<string> {
  // Log environment variables
  const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID;
  const CLIENT_SECRET = process.env.EXPO_PUBLIC_CLIENT_SECRET;
  const REDIRECT_URI = process.env.EXPO_PUBLIC_REDIRECT_URI;

  try {
    const response = await axios.post("https://api.intra.42.fr/oauth/token", {
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      redirect_uri: "http://localhost:8081/",
      // redirect_uri: REDIRECT_URI,
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    throw error;
  }
}
