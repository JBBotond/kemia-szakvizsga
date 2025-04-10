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
    let valaszElem="", valaszGyok="";
    
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
                valasztottElem.textContent = element.textContent;
                valaszElem = element.textContent;
                console.log(valaszElem);
                egyenloJel.style.color = "blue";
                elemValasztva = true;
                console.log("ok1");
            }
            else {
                element.szines = false;
                element.style = "background-color: white";
                elemValasztva = false;
                console.log("!ok1");
                valasztottElem.textContent = " ";
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
                valasztottGyok.textContent = element.textContent;
                valaszGyok = element.textContent;
                console.log(valaszGyok);
                egyenloJel.style.color = "blue";
                gyokValasztva = true;
                console.log("ok2");
            }
            else {
                element.szines = false;
                element.style = "background-color: white";
                gyokValasztva = false;
                console.log("!ok2");
                valasztottGyok.textContent = " ";
            }
        })
    })
    
    
    okGomb.addEventListener('click', () => {
        if(elemValasztva === true && gyokValasztva === true) {
            console.log("valasztva");
            vigyazzElem.style.visibility = "hidden";
            vigyazzGyok.style.visibility = "hidden";
            valasz.style.visibility = "visible";
            let valaszText = valaszElem + valaszGyok;
            valasz.textContent = valaszText;
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
    
    
    okGomb.addEventListener('click', () => {
        // Trim the values before sending them
        const trimmedElem = valaszElem.trim();
        const trimmedGyok = valaszGyok.trim();
    
        console.log("Sending elem:", trimmedElem); // Log the trimmed value of valaszElem
        console.log("Sending gyok:", trimmedGyok); // Log the trimmed value of valaszGyok
    
        fetch("savakScript.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                elem: trimmedElem,
                gyok: trimmedGyok,
            }),
        })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            console.log("Response from server:", data); // Log the full response
    
            if (data.nev) {
                console.log("Found nev:", data.nev); // Log the 'nev' value if found
                valasz.textContent = `${data.nev}`;
            } else if (data.error) {
                console.error("Error from server:", data.error); // Log any error from the server
                valasz.textContent = `Error: ${data.error}`;
            } else {
                console.log("No matching 'nev' found.");
                valasz.textContent = "No matching 'nev' found.";
            }
        })
        .catch(error => {
            console.error("Fetch error:", error); // Handle any fetch errors
            valasz.textContent = "An error occurred while fetching data.";
        });
    });
    
});