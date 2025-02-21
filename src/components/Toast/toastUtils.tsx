// src/utils/toastUtils.ts

import { toast, ToastOptions, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions: ToastOptions = {
  autoClose: 5000, // The toast will automatically close after 5 seconds
  hideProgressBar: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
};

// Correct the position by using the predefined ToastPosition values
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    ...toastOptions,
    style: { backgroundColor: 'white', color: 'green' },
    position: 'top-right' as ToastPosition,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    ...toastOptions,
    style: { backgroundColor: 'white', color: 'red' },
    position: 'top-right' as ToastPosition,
  });
};

export const showWarningToast = (message: string) => {
  toast.warn(message, {
    ...toastOptions,
    style: { backgroundColor: 'white', color: 'yellow' },
    position: 'top-right' as ToastPosition,
  });
};
