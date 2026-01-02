import { toast } from 'react-toastify';

const toastConfig = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
};

const Toast = {
    Success: (msg) => toast.success(msg, {
        ...toastConfig,
        icon: "🚀" 
    }),
    Fail: (msg) => toast.error(msg, {
        ...toastConfig,
        icon: "❌"
    }),
    Info: (msg) => toast.info(msg, toastConfig),
};

export default Toast;