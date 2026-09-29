import { redirect } from "react-router-dom";
import { profileApi } from "../../api/profile.api";
import { store } from "../store";

export default async function protectedRouteLoader() {
  console.log("Protected route loader called");

  try {
    const result = await store
      .dispatch(profileApi.endpoints.getProfile.initiate())
      .unwrap();

    return result;
  } catch (error) {
    console.error("Authentication failed:", error);

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenExpiryTime");

    throw redirect("/login");
  }
}
