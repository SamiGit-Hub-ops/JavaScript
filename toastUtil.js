export function showSuccessToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
    }).showToast();
}

export function showErrorToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #8b0000, #FFCCCB)"
        },
        
    }).showToast();    

}
