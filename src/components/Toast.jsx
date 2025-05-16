import { toast } from 'react-toastify'
const Toast = {
    Success: (msg) => toast.success(msg, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
    }),
    Fail: (msg) => toast.error(msg, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
    })
}
export default Toast;