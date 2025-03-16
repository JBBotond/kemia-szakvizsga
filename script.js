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
    square.addEventListener('dblclick', toggleLines);
    square.addEventListener('mouseup', () => {
      document.querySelectorAll('.square').forEach(otherSquare => {
        if (square !== otherSquare) {
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
      elmnt.style.top = Math.max(headerRect.height, elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = Math.max(0, Math.min(elmnt.offsetLeft - pos1, mainRect.width - elmnt.offsetWidth)) + "px";
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
    overflowMessage.style.visibility = "hidden";
    plusButtons.forEach(button => button.style.cursor = "pointer");
  }

  function stickSquares(square1, square2) {
    const square1Rect = square1.getBoundingClientRect();
    const square2Rect = square2.getBoundingClientRect();

    const overlapX = Math.max(0, Math.min(square1Rect.right, square2Rect.right) - Math.max(square1Rect.left, square2Rect.left));
    const overlapY = Math.max(0, Math.min(square1Rect.bottom, square2Rect.bottom) - Math.max(square1Rect.top, square2Rect.top));

    if (overlapX > 0 && overlapY > 0) {
      if (square1.getAttribute('vonal') === 'van' && square2.getAttribute('vonal') === 'nincs') {
        square2.querySelectorAll('.line').forEach(line => line.remove());
        createLines(square2);
        square2.setAttribute('vonal', 'van');
      } else if (square2.getAttribute('vonal') === 'van' && square1.getAttribute('vonal') === 'nincs') {
        square1.querySelectorAll('.line').forEach(line => line.remove());
        createLines(square1);
        square1.setAttribute('vonal', 'van');
      }

      const combinedSquare = document.createElement('div');
      combinedSquare.classList.add('combinedSquare');
      combinedSquare.style.position = 'absolute';
      combinedSquare.style.top = Math.min(square1Rect.top, square2Rect.top) + 'px';
      combinedSquare.style.left = Math.min(square1Rect.left, square2Rect.left) + 'px';
      combinedSquare.style.width = Math.max(square1Rect.right, square2Rect.right) - Math.min(square1Rect.left, square2Rect.left) + 'px';
      combinedSquare.style.height = Math.max(square1Rect.bottom, square2Rect.bottom) - Math.min(square1Rect.top, square2Rect.top) + 'px';

      document.getElementById('main').appendChild(combinedSquare);

      combinedSquare.appendChild(square1);
      combinedSquare.appendChild(square2);

      square1.style.position = 'absolute';
      square1.style.top = (square1Rect.top - combinedSquare.getBoundingClientRect().top) + 'px';
      square1.style.left = (square1Rect.left - combinedSquare.getBoundingClientRect().left) + 'px';

      square2.style.position = 'absolute';
      square2.style.top = (square2Rect.top - combinedSquare.getBoundingClientRect().top) + 'px';
      square2.style.left = (square2Rect.left - combinedSquare.getBoundingClientRect().left) + 'px';

      dragElement(combinedSquare);
    }
  }

});
