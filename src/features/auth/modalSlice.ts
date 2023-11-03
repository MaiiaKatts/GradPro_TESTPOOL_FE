import { createSlice } from '@reduxjs/toolkit';
import ModalState from './types/ModalState';

const initialState: ModalState = {
	showConfirmationModal: false,
	showPasswordRequirementsModal: false,
	showExistedUserModal: false,
};

const registrationSlice = createSlice({
	name: 'registration',
	initialState,
	reducers: {
		showConfirmationModal: (state) => {
			state.showConfirmationModal = true;
		},
		hideConfirmationModal: (state) => {
			state.showConfirmationModal = false;
		},
		showPasswordRequirementsModal: (state) => {
			state.showPasswordRequirementsModal = true;
		},
		hidePasswordRequirementsModal: (state) => {
			state.showPasswordRequirementsModal = false;
		},
		showExistedUserModal: (state) => {
			state.showExistedUserModal = true;
		},
		hideExistedUserModal: (state) => {
			state.showExistedUserModal = false;
		},
	},
});

export const {
	showConfirmationModal,
	hideConfirmationModal,
	showPasswordRequirementsModal,
	hidePasswordRequirementsModal,
	showExistedUserModal,
	hideExistedUserModal,
} = registrationSlice.actions;
export default registrationSlice.reducer;
