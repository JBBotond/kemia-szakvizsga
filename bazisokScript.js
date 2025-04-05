document.addEventListener("DOMContentLoaded", () => {
    const elemek = document.getElementsByClassName("elem");
    const gyokok = document.getElementsByClassName("gyok");
    const valasztottElem = document.getElementById("valasztottElem");
    const valasztottGyok = document.getElementById("valasztottGyok");
    const okGomb = document.getElementById("okGomb");
    const vigyazzElem = document.getElementById("vigyazzElem");
    const vigyazzGyok = document.getElementById("vigyazzGyok");
    const valasz = document.getElementById("valasz");
    const egyenloJel = document.getElementById("egyenloJel");
    
    let elemValasztva = false;
    let gyokValasztva = false;
    let valaszElem, valaszGyok;
    
    elemek.szin = false;
    gyokok.szin = false;
    
    Array.from(elemek).forEach(element => {
        element.szines = false;
    } )
    Array.from(gyokok).forEach(element => {
        element.szines = false;
    } )

    Array.from(elemek).forEach(element => {
        element.addEventListener('click', () => {
            if(element.szines === false) {
                elemek.szin = true;
                if(elemek.szin === true)
                {
                    Array.from(elemek).forEach(check => {
                        check.style = "background-color: white";
                    })
                }
                element.style="background-color: orange";
                element.szines = true;
                valasztottElem.innerHTML = element.innerHTML;
                valaszElem = element.innerHTML;
                egyenloJel.style.color = "blue";
                elemValasztva = true;
                console.log("ok1");
            }
            else {
                element.szines = false;
                element.style = "background-color: white";
                elemValasztva = false;
                console.log("!ok1");
                valasztottElem.innerHTML = " ";
            }
        })
    });
    Array.from(gyokok).forEach(element => {
        element.addEventListener('click', () => {
            if(element.szines === false) {
                gyokok.szin = true;
                if(gyokok.szin === true)
                {
                    Array.from(gyokok).forEach(check => {
                        check.style = "background-color: white";
                    })
                }
                element.style="background-color: lightgreen";
                element.szines = true;
                valasztottGyok.innerHTML = element.innerHTML;
                valaszGyok = element.innerHTML;
                egyenloJel.style.color = "blue";
                gyokValasztva = true;
                console.log("ok2");
            }
            else {
                element.szines = false;
                element.style = "background-color: white";
                gyokValasztva = false;
                console.log("!ok2");
                valasztottGyok.innerHTML = " ";
            }
        })
    })
    okGomb.addEventListener('click', () => {
        if(elemValasztva === true && gyokValasztva === true) {
            console.log("valasztva");
            vigyazzElem.style.visibility = "hidden";
            vigyazzGyok.style.visibility = "hidden";
            valasz.style.visibility = "visible";
            valasz.innerHTML = valaszElem + valaszGyok;
            egyenloJel.style.color = "white";
        }
        if (elemValasztva === false) {
            vigyazzElem.style.visibility = "visible";
            valasz.style.visibility = "visible";
            valasz.textContent = "Valassz elemet!";
        }
        if (gyokValasztva === false) {
            vigyazzGyok.style.visibility = "visible";
            valasz.style.visibility = "visible";
            valasz.textContent = "Valassz savgyokot!";
        }
            
    })
    
});