document.addEventListener("DOMContentLoaded", () => {
    const elemek = document.getElementsByClassName("elem");
    const gyokok = document.getElementsByClassName("gyok");
    Array.from(gyokok).forEach(element => {
        console.log(element.classList);
    });
});