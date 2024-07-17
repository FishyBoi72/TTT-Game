// Importing the useState hook from React
import { useState } from 'react';

// Functional component for Square, taking value and onSquareClick as props
function Square({ value, onSquareClick }) {
  return (
    // Rendering a button with a class "square" and onClick event handler
    <button className="square" onClick={onSquareClick}>
      {/* Display the value passed as a prop */}
      {value}
    </button>
  );
}

// Functional component for Board, taking xIsNext, squares, and onPlay as props
function Board({ xIsNext, squares, onPlay }) {
  // Function to handle click events on squares
  function handleClick(i) {
    // If there is a winner or the square is already filled, do nothing
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Create a copy of the squares array
    const nextSquares = squares.slice();
    // Assign 'X' or 'O' to the clicked square based on xIsNext
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // Call the onPlay function with the updated squares array
    onPlay(nextSquares);
  }

  // Determine if there is a winner
  const winner = calculateWinner(squares);
  // Set the game status message
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // Render the game board with 3 rows of squares
  return (
    <>
      {/* Display the game status */}
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Default export of the Game component
export default function Game() {
  // State to track the history of moves, initialized with an array of 9 nulls
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // State to track the current move index
  const [currentMove, setCurrentMove] = useState(0);
  // Determine if 'X' is the next player based on the current move index
  const xIsNext = currentMove % 2 === 0;
  // Get the current state of the board
  const currentSquares = history[currentMove];

  // Function to handle playing a move
  function handlePlay(nextSquares) {
    // Create a new history up to the current move and add the new move
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // Update the state with the new history and set the current move index
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Function to jump to a specific move in the history
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Function to reset the game to the initial state
  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  // Map over the history to create a list of move buttons
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        {/* Button to jump to the specific move */}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Render the game layout with the board, move history, and reset button
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <button onClick={handleReset}>Reset Game</button>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Function to calculate the winner of the game
function calculateWinner(squares) {
  // Winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Check each winning combination
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // If there is a winner, return the winning symbol ('X' or 'O')
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // If no winner, return null
  return null;
}
