import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/apiClient";
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, thunkAPI) => {
    try {
        let response = await apiClient.get("/api/user/profile");
        return response.data.Profile;

    } catch (err) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || error.message || 'Failed to fetch user'
        )

    }
}

)

const initialState = {
    User: {},
    isLogin: false,
    isOnlinePlay: {},
    loading: false,
    error: null,

};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.User = action.payload;
            state.isLogin = true;

        },
        setOnline: (state, action) => {
            state.isOnlinePlay = action.payload;
        },
        logout: (state) => {
            state.User = {};
            state.isLogin = false;
        },


    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true;
            state.isLogin = false;
        })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isLogin = true;
                state.User = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.isLogin = false;
                state.error = action.payload;

            })
    }
});

export const { logout, setUser, setOnline } = userSlice.actions;
export default userSlice.reducer;
