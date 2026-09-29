import { redirect } from "react-router-dom";
import { login } from "../../api/auth.api";

export async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const userName = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const data = await login({ userName, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("refreshTokenExpiryTime", data.refreshTokenExpiryTime);
    return redirect("/");
  } catch (error) {
    console.error("Login failed:", error);
  }
}