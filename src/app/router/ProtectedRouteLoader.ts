import { redirect } from "react-router-dom";
import { profileApi } from "../../api/profile.api";
import { store } from "../store";

// Old token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMDgwYjMyMS1iNzY1LTQ1MGUtOWFiNy02YThhNDc4NjQwMDYiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwianRpIjoiYzc5YzMwZDctMjJkNi00ZWNiLTg0M2QtYTEyZTJjZWE0YzYyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJhMDgwYjMyMS1iNzY1LTQ1MGUtOWFiNy02YThhNDc4NjQwMDYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJleHAiOjE3OTA2ODg1OTcsImlzcyI6IkJzc1Jtc0FwaSIsImF1ZCI6IkJzc1Jtc0NsaWVudCJ9.qjIYmgwQzq4sAYXW4iMmHB0J_xlqMKUcqrzILgySmBU

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
