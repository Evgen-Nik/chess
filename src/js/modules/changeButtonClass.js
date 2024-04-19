function changeButtonClass(btnId) {
    var button = document.getElementById(btnId);
    if (window.matchMedia("(max-width: 768px)").matches) {
        button.classList.remove("btn_border");
        button.classList.add("btn_white");
    }
}

export default changeButtonClass;