import { ToastContainerProps } from 'react-toastify';

export const TOAST_DEFAULT_PROPS: Partial<ToastContainerProps> = {
  position: 'bottom-center',
  autoClose: 1000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  draggable: true,
};
