document.addEventListener('DOMContentLoaded', (event) => {
  const header = document.querySelector('header');
  const headerRect = header.getBoundingClientRect();
  var squares = document.querySelectorAll(".square");
  const addCarbon = document.getElementById("carbonButton");
  const addHidrogen = document.getElementById("hidrogenButton");
  const overflowMessage = document.getElementById("overflowMessage");
  const plusButtons = document.querySelectorAll(".plusButton");
  const trash = document.getElementById("trash");
  const resetButton = document.getElementById("reset");
  const mainRect = document.getElementById("main").getBoundingClientRect();

  var numSquare = 1;
  var initialSquare = document.getElementById("initialSquare");
  initialSquare.setAttribute("index",numSquare.toString());
  console.log(initialSquare.getAttribute('index'));

    //nincs, van, kotott
  initialSquare.setAttribute('vonal','nincs');
  console.log(initialSquare.getAttribute('vonal'));

  squares.forEach(square => {
    square.style.position = "absolute"; // Ensure the element has a position style
    dragElement(square);
    square.addEventListener('dblclick', toggleLines); // Add double-click event listener
  });

  addHidrogen.addEventListener('click', () => {
    var squareCount = $('.square').length
    console.log(squareCount + " hossz");
    if (squareCount >= 30) {
      console.log("tul sok");
      overflowMessage.style.visibility = "visible";
      plusButtons.forEach(element => {
        element.style.cursor = "not-allowed";
      });
      return 0;
    }
    numSquare++;
    
    var objTo = document.getElementById("main");
    const newSquare = document.createElement('p');
    newSquare.setAttribute('index', numSquare.toString());
    console.log(numSquare);
    console.log(newSquare.getAttribute('index'));

    //nincs, van, kotott
    newSquare.setAttribute('vonal','nincs');
    console.log(newSquare.getAttribute('vonal'));

    
    newSquare.textContent = "H";
    newSquare.classList.add('square');
    newSquare.style.position = "absolute";
    newSquare.setAttribute("align", "center");
    const lastSquare = objTo.querySelector('.square:last-of-type');
    if (lastSquare) {
      const lastRect = lastSquare.getBoundingClientRect();
      newSquare.style.top = (lastRect.top + 100) + "px";
      newSquare.style.left = (lastRect.left + 100) + "px";
    } else {
      newSquare.style.top = (headerRect.height + 100) + "px";
      newSquare.style.left = "100px";
    }
    objTo.appendChild(newSquare);
    dragElement(newSquare);
    newSquare.addEventListener('dblclick', toggleLines); // Add double-click event listener
  });

  addCarbon.addEventListener('click', () => {
    var squareCount = $('.square').length
    console.log(squareCount + " hossz");
    if (squareCount >= 30) {
      console.log("tul sok");
      overflowMessage.style.visibility = "visible";
      return 0;
    }
    numSquare++;
    
    console.log(numSquare);
    var objTo = document.getElementById("main");
    const newSquare = document.createElement('p');

    newSquare.setAttribute('index', numSquare.toString());
    console.log(newSquare.getAttribute('index'));

    //nincs, van, kotott
    newSquare.setAttribute('vonal','nincs');
    console.log(newSquare.getAttribute('vonal'));

    newSquare.textContent = "C";
    newSquare.classList.add('square');
    newSquare.style.position = "absolute";
    newSquare.setAttribute("align", "center");
    const lastSquare = objTo.querySelector('.square:last-of-type');
    if (lastSquare) {
      const lastRect = lastSquare.getBoundingClientRect();
      newSquare.style.top = (lastRect.top + 100) + "px";
      newSquare.style.left = (lastRect.left + 100) + "px";
    } else {
      newSquare.style.top = (headerRect.height + 100) + "px";
      newSquare.style.left = "100px";
    }
    objTo.appendChild(newSquare);
    dragElement(newSquare);
    newSquare.addEventListener('dblclick', toggleLines); // Add double-click event listener
  });

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id)) {
      document.getElementById(elmnt.id).addEventListener('mousedown', dragMouseDown);
    } else {
      elmnt.addEventListener('mousedown', dragMouseDown);
    }

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
      elmnt.style.top = Math.max(headerRect.height, Math.min((elmnt.offsetTop - pos2))) + "px";
      elmnt.style.left = Math.max(0, Math.min((elmnt.offsetLeft - pos1), mainRect.width - elmnt.offsetWidth)) + "px";
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
        elmnt.remove();
        shake(trash, 1, 5);
        //numSquare--;
        console.log(numSquare);
        overflowMessage.style.visibility = "hidden";
        plusButtons.forEach(element => {
          element.style.cursor = "pointer";
        });
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
      square.setAttribute('vonal','nincs');
      console.log(square.getAttribute('vonal'));
    } else {
      createLines(square);
      square.setAttribute('vonal','van');
      console.log(square.getAttribute('vonal'));
    }
  }
  
  function createLines(square) {
    const directions = ['top', 'right', 'bottom', 'left'];
    directions.forEach(direction => {
      const line = document.createElement('div');
      line.classList.add('line', 'line' + square.getAttribute("index"));
      line.id = direction + square.getAttribute('index');
      line.style.position = 'absolute';
      line.style.backgroundColor = 'black';
      line.setAttribute("index",square.getAttribute("index"));
      console.log(line.getAttribute("index"));
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
//amikor huzigalom a kockaimat
  resetButton.addEventListener('click', () => {
    shake(trash,2,10);
    const squares = document.querySelectorAll(".square");
    squares.forEach(element => {
      element.remove();
    });
    numSquare = 0;
    overflowMessage.style.visibility = "hidden";
    plusButtons.forEach(element => {
      element.style.cursor = "pointer";
    });
  });

});
