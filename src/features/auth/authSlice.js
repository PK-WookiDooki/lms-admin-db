import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token") ? Cookies.get("token") : null;
const username = Cookies.get("username") ? Cookies.get("username") : null;

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        isLoggedIn: !!token,
        username,
        token,
    },
    reducers: {
        setLoginStatus: (state, { payload }) => {
            state.username = payload.username;
            state.token = payload.token;
        },

        removeCookies: () => {
            Cookies.remove("username")
            Cookies.remove("token");
        },
    },
});

export const { setLoginStatus, removeCookies } = authSlice.actions;
export default authSlice.reducer;
