import ModalState from './ModalState';
import User from './User';

export default interface AuthState {
	authChecked: boolean;
	user?: User | null | undefined;
	loginFormError?: string;
	registerFormError?: string;
	modal?: ModalState;
}
