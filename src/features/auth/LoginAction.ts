import { redirect } from "react-router-dom";
import { authApi } from "../../api/auth.api";
import { store } from "../../app/store";

export async function loginAction({ request }: { request: Request }) {
    const formData = await request.formData();

    const userName = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
        const data = await store.dispatch(
            authApi.endpoints.login.initiate({
                userName,
                password,
            })
        ).unwrap();

        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem(
            "refreshTokenExpiryTime",
            data.refreshTokenExpiryTime
        );

        return redirect("/");
    } catch (error) {
        console.error("Login failed:", error);

        // error object can be returned here later
        // so the login page can display the error.
        return null;
    }
}