import { ToastContainerProps } from 'react-toastify';

export const TOAST_DEFAULT_PROPS: Partial<ToastContainerProps> = {
	position: 'top-right',
	autoClose: 5000,
	hideProgressBar: false,
	newestOnTop: true,
	closeOnClick: true,
	pauseOnHover: true,
	pauseOnFocusLoss: true,
	draggable: true,
};
