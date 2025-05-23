// reducers/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Your User type
export type User = {
    username: string;
    id: string;
    email: string;
    roles: number[];
    subscription: number;
    createdAt: Date;
    password?: string;
    full_name: string;
};

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload,
                };
            }
        },
        // Additional action specific to your User type
        updateRoles: (state, action: PayloadAction<number[]>) => {
            if (state.user) {
                state.user.roles = action.payload;
            }
        },
        updateSubscription: (state, action: PayloadAction<number>) => {
            if (state.user) {
                state.user.subscription = action.payload;
            }
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    updateUser,
    updateRoles,
    updateSubscription,
} = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const selectUserLoading = (state: { user: UserState }) => state.user.loading;
export const selectUserError = (state: { user: UserState }) => state.user.error;
export const selectUserRoles = (state: { user: UserState }) => state.user.user?.roles;
export const selectUserSubscription = (state: { user: UserState }) => state.user.user?.subscription;