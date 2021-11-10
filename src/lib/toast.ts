import { toast } from "react-toastify"

export const getToast = (err: ErrorEvent) => {
    toast(err.message, {
        className: "error-toast",
        draggable: true,
        position: toast.POSITION.TOP_CENTER
    })
}