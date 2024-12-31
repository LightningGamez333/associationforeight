document.getElementById('startButton').addEventListener('click', function() {
    const whiteboardArea = document.getElementById('whiteboardArea');
    whiteboardArea.style.display = 'block'; // Show the whiteboard area
    startDrawing(); // Initialize drawing
});

const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

let drawing = false;
let brushColor = '#ffffff';
let brushSize = 5;
let eraserMode = false;
let actions = [];
let redoStack = [];
let backgroundColor = '#121212'; // Default background color

function startDrawing() {
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    document.getElementById('colorPicker').addEventListener('input', (e) => {
        brushColor = e.target.value;
        eraserMode = false; // Disable eraser mode when changing color
    });
    document.getElementById('brushSize').addEventListener('change', (e) => {
        brushSize = e.target.value;
    });
    document.getElementById('clearButton').addEventListener('click', clearCanvas);
    document.getElementById('saveButton').addEventListener('click', saveCanvas);
    document.getElementById('eraserButton').addEventListener('click', toggleEraser);
    document.getElementById('undoButton').addEventListener('click', undo);
    document.getElementById('redoButton').addEventListener('click', redo);
    document.getElementById('addTextButton').addEventListener('click', addText);
    document.getElementById('toggleBackgroundButton').addEventListener('click', toggleBackground);
    setCanvasBackground(); // Set initial background color
}

function setCanvasBackground() {
    canvas.style.backgroundColor = backgroundColor; // Set the canvas background color
}

function toggleBackground() {
    backgroundColor = (backgroundColor === '#121212') ? '#ffffff' : '#121212'; // Toggle between black and white
    setCanvasBackground(); // Update the canvas background
    ctx.fillStyle = backgroundColor; // Set the fill style for erasing
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the new background color
}

function startPosition(e) {
    drawing = true;
    draw(e); // Call draw function to start drawing immediately
}

function endPosition() {
    drawing = false;
    ctx.beginPath(); // Reset the path
    actions.push(canvas.toDataURL()); // Save the current state for undo
    redoStack = []; // Clear redo stack
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = brushSize; // Set line width
    ctx.lineCap = 'round'; // Set line cap style
    ctx.strokeStyle = eraserMode ? backgroundColor : brushColor; // Use background color for eraser

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    actions.push(canvas.toDataURL()); // Save the cleared state for undo
    redoStack = []; // Clear redo stack
    setCanvasBackground(); // Reset background color
}

function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
}

function toggleEraser() {
    eraserMode = !eraserMode; // Toggle eraser mode
    document.getElementById('eraserButton').textContent = eraserMode ? 'Pencil' : 'Eraser'; // Change button text
}

function addText() {
    const textInput = document.getElementById('textInput');
    const text = textInput.value;
    if (text) {
        ctx.fillStyle = brushColor; // Set text color
        ctx.font = `${brushSize * 2}px Arial`; // Set font size
        ctx.fillText(text, 50, 50); // Draw text at a fixed position
        actions.push(canvas.toDataURL()); // Save the current state for undo
        textInput.value = ''; // Clear the text input
    }
}

function undo() {
    if (actions.length > 0) {
        redoStack.push(actions.pop()); // Move last action to redo stack
        const lastAction = actions[actions.length - 1];
        if (lastAction) {
            const img = new Image();
            img.src = lastAction;
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            };
        } else {
            clearCanvas(); // Clear if no actions left
        }
    }
}

function redo() {
    if (redoStack.length > 0) {
        const lastRedo = redoStack.pop();
        actions.push(lastRedo); // Move last redo action to actions
        const img = new Image();
        img.src = lastRedo;}}