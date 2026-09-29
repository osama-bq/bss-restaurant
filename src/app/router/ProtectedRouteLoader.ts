import { redirect } from "react-router-dom";
import { getProfile, type ProfileResponse } from "../../api/profile.api";
import { getAccessToken } from "../../api/refreshToken.api";

async function validateToken(): Promise<ProfileResponse | null> {
    try {
        const profile = await getProfile();
        return profile;
    } catch (error) {
        console.error("Error validating token:", error);
        return null;
    }
}

export default async function protectedRouteLoader() {
  console.log("Protected route loader called"); // Debugging log

  const profile = await validateToken();

  if (profile) return profile;

  if (!localStorage.getItem("refreshToken"))
    throw redirect("/login");

  // try to refresh the token
  try {
    const token = await getAccessToken({ refreshToken: localStorage.getItem("refreshToken")! });
    localStorage.setItem("token", token.accessToken);
    localStorage.setItem("refreshToken", token.refreshToken);
    localStorage.setItem("refreshTokenExpiryTime", token.refreshTokenExpiryTime);
    
    return await getProfile();
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw redirect("/login");
  }
}