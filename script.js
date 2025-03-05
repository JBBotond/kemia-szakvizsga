
document.addEventListener('DOMContentLoaded', (event) => {
  const header= document.querySelector('header');
  const headerRect = header.getBoundingClientRect();
  const square = document.getElementById("square");
  square.style.position = "absolute"; // Ensure the element has a position style
  dragElement(square);

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
      elmnt.style.top = Math.max((elmnt.offsetTop - pos2), headerRect.height) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      console.log(`Element position: top=${elmnt.style.top}, left=${elmnt.style.left}`);
    }

    function closeDragElement() {
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('mousemove', elementDrag);
    }

  }
});
