document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const headerRect = header.getBoundingClientRect();
  const squares = document.querySelectorAll(".square");
  const addCarbon = document.getElementById("carbonButton");
  const addHidrogen = document.getElementById("hidrogenButton");
  const overflowMessage = document.getElementById("overflowMessage");
  const plusButtons = document.querySelectorAll(".plusButton");
  const trash = document.getElementById("trash");
  const resetButton = document.getElementById("reset");
  const mainRect = document.getElementById("main").getBoundingClientRect();
  const okButton = document.getElementById("okButton");
  const nameBox = document.getElementById("nameBox");
  
  let numSquare = 1;
  const initialSquare = document.getElementById("initialSquare");
  initializeSquare(initialSquare);
  let CSzam = 1;
  let HSzam = 0;

  squares.forEach(square => {
    setupSquare(square);
  });

    document.getElementById("Hszam").textContent = `H: ${HSzam}`;
    document.getElementById("Cszam").textContent = `C: ${CSzam}`;

  addHidrogen.addEventListener('click', () => addSquare('H'));
  addCarbon.addEventListener('click', () => addSquare('C'));
  resetButton.addEventListener('click', resetSquares);

  function initializeSquare(square) {
    square.setAttribute("index", numSquare.toString());
    square.setAttribute('vonal', 'nincs');
    console.log(square.getAttribute('index'), square.getAttribute('vonal'));
  }

  function setupSquare(square) {
    square.style.position = "absolute";
    dragElement(square);
    if(square.textContent !== 'H')square.addEventListener('dblclick', toggleLines);
    square.addEventListener('mouseup', () => {
      document.querySelectorAll('.square').forEach(otherSquare => {
        if (square !== otherSquare 
          && otherSquare.getAttribute("vonal")==="van"
        ) {
          stickSquares(square, otherSquare);
        }
      });
    });
  }

  function addSquare(element) {
    const squareCount = document.querySelectorAll('.square').length;
    if (squareCount >= 30) {
      overflowMessage.style.visibility = "visible";
      plusButtons.forEach(button => button.style.cursor = "not-allowed");
      return;
    }

    numSquare++;
    const newSquare = document.createElement('p');
    initializeSquare(newSquare);
    newSquare.textContent = element;
    newSquare.classList.add('square');
    newSquare.style.position = "absolute";
    newSquare.setAttribute("align", "center");

	if(newSquare.textContent==='H') {
    HSzam++;
    document.getElementById("Hszam").textContent = `H: ${HSzam}`;
    newSquare.style.top = addHidrogen.offsetTop + 150 + "px";
    newSquare.style.left = addHidrogen.offsetLeft + "px";
  }
	if(newSquare.textContent==='C') {
    CSzam++;
    document.getElementById("Cszam").textContent = `C: ${CSzam}`;
    newSquare.style.top = addCarbon.offsetTop + 150 + "px";
    newSquare.style.left = addCarbon.offsetLeft + "px";
  }
	
	console.log(HSzam);
	console.log(CSzam);


    document.getElementById("main").appendChild(newSquare);
    setupSquare(newSquare);
  }

  let squareGroups = [];

  function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elmnt.addEventListener('mousedown', dragMouseDown);

    function dragMouseDown(e) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.addEventListener('mouseup', closeDragElement);
      document.addEventListener('mousemove', elementDrag);
    }

    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    
      const elmntRect = elmnt.getBoundingClientRect();
    
      const group = squareGroups.find(g => g.includes(elmnt)) || [elmnt];
    
      let groupTop = Infinity;
      let groupLeft = Infinity;
      let groupBottom = -Infinity;
      let groupRight = -Infinity;
    
      group.forEach(square => {
        const squareRect = square.getBoundingClientRect();
        groupTop = Math.min(groupTop, squareRect.top);
        groupLeft = Math.min(groupLeft, squareRect.left);
        groupBottom = Math.max(groupBottom, squareRect.bottom);
        groupRight = Math.max(groupRight, squareRect.right);
      });
    
      let newGroupTop = groupTop - pos2;
      let newGroupLeft = groupLeft - pos1;
    
      if (newGroupTop < headerRect.bottom) {
        newGroupTop = headerRect.bottom;
      }
      if (newGroupLeft < 0) {
        newGroupLeft = 0;
      }
      if (newGroupLeft + (groupRight - groupLeft) > window.innerWidth) {
        newGroupLeft = window.innerWidth - (groupRight - groupLeft);
      }
      if (newGroupTop + (groupBottom - groupTop) > window.innerHeight) {
        newGroupTop = window.innerHeight - (groupBottom - groupTop);
      }
    
      const offsetTop = newGroupTop - groupTop;
      const offsetLeft = newGroupLeft - groupLeft;

      group.forEach(square => {
        square.style.top = (square.offsetTop + offsetTop) + "px";
        square.style.left = (square.offsetLeft + offsetLeft) + "px";
      });
    }

    
    function closeDragElement() {
      const trashRect = trash.getBoundingClientRect();
      const elmntRect = elmnt.getBoundingClientRect();
    
      if (
        elmntRect.left < trashRect.right &&
        elmntRect.right > trashRect.left &&
        elmntRect.top < trashRect.bottom &&
        elmntRect.bottom > trashRect.top &&
        elmnt.getAttribute('vonal') === "nincs"
      ) {
        if (elmnt.textContent === 'H'){ HSzam--; document.getElementById("Hszam").textContent = `H: ${HSzam}`;}
        if (elmnt.textContent === 'C'){ CSzam--; document.getElementById("Cszam").textContent = `C: ${CSzam}`;}
    
        const lines = elmnt.querySelectorAll('.line');
        lines.forEach(line => {
          delete line.connectedSquare;
        });
    
        elmnt.remove();
    
        squareGroups = squareGroups.map(group => group.filter(square => square !== elmnt))
                                   .filter(group => group.length > 0);
    

        shake(trash, 1, 5);

        overflowMessage.style.visibility = "hidden";
        plusButtons.forEach(button => button.style.cursor = "pointer");
      }
    
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('mousemove', elementDrag);

      document.addEventListener('DOMContentLoaded', () => {
        document.getElementById("Hszam").textContent = `H: ${HSzam}`;
        document.getElementById("Cszam").textContent = `C: ${CSzam}`;
    }
      );
    }
  }

  function toggleLines(event) {
    const square = event.target;
    const lines = square.querySelectorAll('.line');
    if (lines.length > 0) {
      lines.forEach(line => line.remove());
      square.setAttribute('vonal', 'nincs');
    } else {
      createLines(square);
      square.setAttribute('vonal', 'van');
    }
    console.log(square.getAttribute('vonal'));
  }

  function createLines(square) {
    const directions = ['top', 'right', 'bottom', 'left'];
    directions.forEach(direction => {
      const line = document.createElement('div');
      line.classList.add('line', 'line' + square.getAttribute("index"));
      line.id = direction + square.getAttribute('index');
      line.style.position = 'absolute';
      line.style.backgroundColor = 'black';
      line.setAttribute("index", square.getAttribute("index"));

      switch (direction) {
        case 'top':
          line.style.width = '2px';
          line.style.height = '50px';
          line.style.top = '-50px';
          line.style.left = '50%';
          line.style.transform = 'translateX(-50%)';
          break;
        case 'right':
          line.style.width = '50px';
          line.style.height = '2px';
          line.style.top = '50%';
          line.style.left = '100%';
          line.style.transform = 'translateY(-50%)';
          break;
        case 'bottom':
          line.style.width = '2px';
          line.style.height = '50px';
          line.style.top = '100%';
          line.style.left = '50%';
          line.style.transform = 'translateX(-50%)';
          break;
        case 'left':
          line.style.width = '50px';
          line.style.height = '2px';
          line.style.top = '50%';
          line.style.left = '-50px';
          line.style.transform = 'translateY(-50%)';
          break;
      }
      square.appendChild(line);
    });
  }

  function shake(element, times, distance) {
    let count = 0;
    const originalStyle = element.style.cssText;
    const interval = setInterval(() => {
      if (count < times) {
        element.style.transform = `translate(${distance}px, 0)`;
        setTimeout(() => {
          element.style.transform = `translate(-${distance}px, 0)`;
        }, 50);
        count++;
      } else {
        clearInterval(interval);
        element.style.cssText = originalStyle;
      }
    }, 100);
  }

  function resetSquares() {
    shake(trash, 2, 10);
    document.querySelectorAll(".square").forEach(square => square.remove());
    numSquare = 0;
  	CSzam = 0;
	  HSzam = 0;
    nameBox.style.visibility = "hidden";

    document.getElementById("Hszam").textContent = `H: ${HSzam}`;
    document.getElementById("Cszam").textContent = `C: ${CSzam}`;

    overflowMessage.style.visibility = "hidden";
    plusButtons.forEach(button => button.style.cursor = "pointer");
  }

  function squareMoveTogether() {

  }
//square2=otherSquare vonalakkal
//square1=mozgo square
function stickSquares(square1, square2) {
  const square1Rect = square1.getBoundingClientRect();
  const square2Rect = square2.getBoundingClientRect();
  const lines = Array.from(square2.querySelectorAll('.line'));

  lines.forEach(line => {
    const lineRect = line.getBoundingClientRect();

    if (
      lineRect.left < square1Rect.right &&
      lineRect.right > square1Rect.left &&
      lineRect.top < square1Rect.bottom &&
      lineRect.bottom > square1Rect.top
    ) {

      if (line.connectedSquare) {
        console.log(`Line ${line.id} is already connected to another square.`);
        return; // Skip this line if it's already connected
      }
      console.log(`Collision detected with line: ${line.id}`);

      if (line.id.includes("right")) {
        square1.style.left = (square2Rect.left + 100) + 'px';
        square1.style.top = square2.style.top;
        square2.removeEventListener('dblclick', toggleLines);
      } 
      else if (line.id.includes("left")) {
        square1.style.left = (square2Rect.left - 100) + 'px';
        square1.style.top = square2.style.top;
        square2.removeEventListener('dblclick', toggleLines);
      } 
      else if (line.id.includes("top")) {
        square1.style.top = (square2Rect.top - 100) + 'px';
        square1.style.left = square2.style.left;
        square2.removeEventListener('dblclick', toggleLines);
      } 
      else if (line.id.includes("bottom")) {
        square1.style.top = (square2Rect.top + 100) + 'px';
        square1.style.left = square2.style.left;
        square2.removeEventListener('dblclick', toggleLines);
      }

      let group = squareGroups.find(g => g.includes(square1) || g.includes(square2));
      if (!group) {
        group = [];
        squareGroups.push(group);
      }
      if (!group.includes(square1)) group.push(square1);
      if (!group.includes(square2)) group.push(square2);

      line.connectedSquare = square1;
    }
  });
}
  function strstr(amiben, needle) {
  const index = amiben.indexOf(needle);
  if (index !== -1) {
    return amiben.substring(index);
  }
  return null;
}

okButton.addEventListener('click', () => {
  fetch("script.php", { // Sends the request to script.php
    method: "POST", 
    headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Indicates the request is sent as a form
    },
    body: 
    new URLSearchParams({
        CSzam: encodeURIComponent(CSzam),
        HSzam: encodeURIComponent(HSzam),
    })
  })
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    console.log(data); // Log the parsed JSON object to inspect it
    if (data.nev) {
      nameBox.style.visibility = "visible";
      nameBox.innerText = data.nev; // Display the 'nev' value
    } else {
      nameBox.style.visibility = "visible";
      nameBox.innerText = "Nincs ilyen alkán"; // Handle missing 'nev'
    }
  })
  .catch(error => {
    console.error("Error:", error); // Handle any errors
  });
});

});
