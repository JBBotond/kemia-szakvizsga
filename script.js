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

  let numSquare = 1;
  const initialSquare = document.getElementById("initialSquare");
  initializeSquare(initialSquare);
  let CSzam = 1;
  let HSzam = 0;

  squares.forEach(square => {
    setupSquare(square);
  });

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

	if(newSquare.textContent==='H') HSzam++;
	if(newSquare.textContent==='C') CSzam++;
	
	console.log(HSzam);
	console.log(CSzam);

    const lastSquare = document.querySelector('#main .square:last-of-type');
    if (lastSquare) {
      const lastRect = lastSquare.getBoundingClientRect();
      newSquare.style.top = (lastRect.top + 100) + "px";
      newSquare.style.left = (lastRect.left + 100) + "px";
    } else {
      newSquare.style.top = (headerRect.height + 100) + "px";
      newSquare.style.left = "100px";
    }

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

      const group = squareGroups.find(g => g.includes(elmnt)) || [elmnt];
      group.forEach(square => {
        square.style.top = Math.max(headerRect.height, square.offsetTop - pos2) + "px";
        square.style.left = Math.max(0, Math.min(square.offsetLeft - pos1, mainRect.width - square.offsetWidth)) + "px";
      });
    }

    function closeDragElement() {
      const trashRect = trash.getBoundingClientRect();
      const elmntRect = elmnt.getBoundingClientRect();

      if (
        elmntRect.left < trashRect.right &&
        elmntRect.right > trashRect.left &&
        elmntRect.top < trashRect.bottom &&
        elmntRect.bottom > trashRect.top
      ) {
		if (elmnt.textContent === 'H') HSzam--;
		if (elmnt.textContent === 'C') CSzam--;
        elmnt.remove();
        shake(trash, 1, 5);
        overflowMessage.style.visibility = "hidden";
        plusButtons.forEach(button => button.style.cursor = "pointer");
      }
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('mousemove', elementDrag);
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
    //const square2Rect = square2.getBoundingClientRect();
    const lines = Array.from(square2.querySelectorAll('.line'));
    lines.forEach(line => {
      //console.log(line.id);
      const lineRect = line.getBoundingClientRect();
      //check collision
      if (
        lineRect.left < square1Rect.right &&
        lineRect.right > square1Rect.left &&
        lineRect.top < square1Rect.bottom &&
        lineRect.bottom > square1Rect.top
      ) {
        // Collision detected 
		console.log(`Collision detected with line: ${line.id}`);
		
		if(strstr(line.id,"right")!=null){
			square1.style.left = (square2Rect.left + 100) + 'px';
			square1.style.top = square2.style.top;
			square1.style.bottom = square2.style.bottom;
			square2.removeEventListener('dblclick',toggleLines);}
       
        if(strstr(line.id,"left")!=null) {
			square1.style.left = (square2Rect.left - 100) + 'px';
			square1.style.top = square2.style.top;
			square1.style.bottom = square2.style.bottom;
			square2.removeEventListener('dblclick',toggleLines);}
		
		if(strstr(line.id,"top")!=null){
			square1.style.top = (square2Rect.top - 100) + 'px';
			square1.style.right = square2.style.right;
			square1.style.left = square2.style.left;
			square2.removeEventListener('dblclick',toggleLines);}
		if(strstr(line.id,"bottom")!=null){
			square1.style.top = (square2Rect.top + 100) + 'px';
			square1.style.right = square2.style.right;
			square1.style.left = square2.style.left;
			square2.removeEventListener('dblclick',toggleLines);}
        // Check if the line is already connected to a square
        if (!line.connectedSquare) {
          // Add squares to a group
          let group = squareGroups.find(g => g.includes(square1) || g.includes(square2));
          if (!group) {
            group = [];
            squareGroups.push(group);
          }
          if (!group.includes(square1)) group.push(square1);
          if (!group.includes(square2)) group.push(square2);

          // Mark the line as connected to the square
          line.connectedSquare = square1;
        }
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

});
