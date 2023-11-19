/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthState from './types/AuthState';
import Credentials from './types/Credentials';
import * as api from './api';
import RegisterData from './types/RegisterData';

const initialState: AuthState = {
	authChecked: false,
	user: null, //as User | ErrorMessage | null, //undefined
	loginFormError: undefined,
	registerFormError: undefined,
	modal: {
		showConfirmationModal: false,
		showPasswordRequirementsModal: false,
		showExistedUserModal: false,
	},
};

/*interface ErrorMessage {
	message: string;
} */

export const getUser = createAsyncThunk('api/users/my/profile', () => api.user());

export const login = createAsyncThunk('login', async (credentials: Credentials) => {
	if (!credentials.email.trim() || !credentials.password.trim()) {
		throw new Error('Не все поля заполнены');
	}
	return api.login(credentials);
});

export const register = createAsyncThunk('api/register', async (data: RegisterData) => {
	if (data.password !== data.passwordRepeat) {
		throw new Error('Пароли не совпадают');
	}
	if (!data.email.trim() || !data.password.trim()) {
		throw new Error('Не все поля заполнены');
	}
	return api.register(data);
});

export const logout = createAsyncThunk('logout', api.logout);

const authSlice = createSlice({
	name: 'auth', // имя фичи
	initialState, // принимает начальное состояние
	reducers: {
		// 332 редьюсер для очистки ошибки
		resetLoginFormError: (state) => {
			state.loginFormError = undefined;
		},
		resetRegisterFormError: (state) => {
			state.registerFormError = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.fulfilled, (state, action) => {
				state.authChecked = true;
				state.user = action.payload;
			})
			.addCase(getUser.rejected, (state) => {
				state.authChecked = true;
			})
			.addCase(login.fulfilled, (state) => {
				state.loginFormError = undefined;
			})
			// 332 так изменяется стэйт если вернулась ошибка
			.addCase(login.rejected, (state, action) => {
				state.loginFormError = action.error.message;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = undefined;
				state.authChecked = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload as any;
				state.registerFormError = undefined;
			})
			.addCase(register.rejected, (state, action) => {
				state.registerFormError = action.error.message;
			});
	},
});

export const { resetLoginFormError, resetRegisterFormError } = authSlice.actions;

export default authSlice.reducer;
