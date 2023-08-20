const puzzleContainer = document.getElementById("puzzle-container");
const gridSize = 3;

// Create puzzle pieces
for (let i = 0; i < gridSize * gridSize; i++) {
    const piece = document.createElement("div");
    piece.className = "puzzle-piece";
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    piece.style.backgroundImage = `url('cat.png')`;
    piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
    puzzleContainer.appendChild(piece);
}

const pieces = Array.from(document.querySelectorAll(".puzzle-piece"));
const emptyIndex = pieces.length - 1;
let currentEmptyIndex = emptyIndex;

// Add click event listener to each piece
pieces.forEach((piece, index) => {
    piece.addEventListener("click", () => {
        if (isAdjacent(index, currentEmptyIndex)) {
            swapPieces(index, currentEmptyIndex);
            currentEmptyIndex = index;
        }
    });

    // Add hover effect to highlight movable pieces
    piece.addEventListener("mouseenter", () => {
        if (isAdjacent(index, currentEmptyIndex)) {
            piece.classList.add("highlight");
        }
    });

    piece.addEventListener("mouseleave", () => {
        piece.classList.remove("highlight");
    });
});




// Check if two pieces are adjacent
function isAdjacent(index1, index2) {
    const row1 = Math.floor(index1 / gridSize);
    const col1 = index1 % gridSize;
    const row2 = Math.floor(index2 / gridSize);
    const col2 = index2 % gridSize;

    return (
        (Math.abs(row1 - row2) === 1 && col1 === col2) ||
        (Math.abs(col1 - col2) === 1 && row1 === row2)
    );
}

// Swap two pieces in the puzzle
function swapPieces(index1, index2) {
    const tempStyle = pieces[index1].style.backgroundPosition;
    pieces[index1].style.backgroundPosition = pieces[index2].style.backgroundPosition;
    pieces[index2].style.backgroundPosition = tempStyle;
}

// Initial shuffle (optional)
pieces.sort(() => Math.random() - 0.5);
pieces.forEach((piece, index) => {
    puzzleContainer.appendChild(piece);
    if (index === emptyIndex) currentEmptyIndex = pieces.length - 1;
});
