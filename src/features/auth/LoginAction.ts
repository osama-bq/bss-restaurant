import { redirect } from "react-router-dom";
import { authApi } from "../../api/auth.api";
import { store } from "../../app/store";
import { notify } from "../../components/Notifier";

export type LoginActionData = { error: string } | null;

function getErrorMessage(error: unknown) {
  const status =
    typeof error === "object" && error !== null && "status" in error
      ? (error as { status: unknown }).status
      : undefined;

  if (status === 400 || status === 401) {
    return "Invalid username or password.";
  }

  return "Something went wrong. Please try again.";
}

export async function loginAction({
  request,
}: {
  request: Request;
}): Promise<Response | LoginActionData> {
  const formData = await request.formData();

  const userName = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const data = await store
      .dispatch(
        authApi.endpoints.login.initiate({
          userName,
          password,
        }),
      )
      .unwrap();

    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("refreshTokenExpiryTime", data.refreshTokenExpiryTime);

    notify.success("Login successful!");
    return redirect("/");
  } catch (error) {
    notify.error(getErrorMessage(error));
    return { error: getErrorMessage(error) };
  }
}
