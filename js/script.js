var active = false;
var color = '#000'; // Default color for "painting in the grid"
var randomActive = false;


document.addEventListener('DOMContentLoaded', () => {

  // Toggle active/inactive when mouse clicks on board 
  const board = document.getElementById('board');
  board.onmousedown = () => {active = !active};
  board.onmouseup = () => {active = !active};
  board.onmouseleave = () => {active = false}; // Deactivate drawing when out of board

  // Default grid
  createGridOfSquareDivs(16)

  // New button
  document.getElementById('new').addEventListener('click', () => {

    let newGridSize = "";
    do {
      newGridSize = prompt('Please enter the size of the new square grid (max 100)');
    } while (newGridSize > 100 || newGridSize < 0 || isNaN(newGridSize) || !newGridSize)

    const board = document.getElementById('board');
    board.innerHTML = "";

    createGridOfSquareDivs(newGridSize);

  });

  // Clear button
  document.getElementById('clear').addEventListener('click', () => {

    document.querySelectorAll('.square-div').forEach( (div) => {
      
      div.style.backgroundColor = '#fff';

    });

  });

  // Rainbow color
  document.getElementById('random').addEventListener('click', () => {

    color = `#${Math.floor(Math.random()*16777215).toString(16)}`
    document.getElementById('color-picker').value = color;

  });

  // Color picker
  document.getElementById('color-picker').addEventListener('change', (event) => {
    color = event.target.value; 
  });

});

// Helpers
function createGridOfSquareDivs(gridSize) {
  const board = document.getElementById('board');
  board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize**2; i++) {
    const div = document.createElement('div');
    div.classList.add('square-div');

    board.appendChild(div);
  }

  // Add "drawing effect"
  const boardItems = document.querySelectorAll('.square-div');

  boardItems.forEach(
    item => {
      item.addEventListener('mousemove', (event) => { active ? event.target.style.backgroundColor = color : "" } )
    });
}

