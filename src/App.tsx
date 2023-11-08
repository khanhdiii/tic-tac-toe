import React, { useState } from "react";
import "./App.css";

const rowStyle: React.CSSProperties = {
  display: "flex",
};

const squareStyle: React.CSSProperties = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const boardStyle: React.CSSProperties = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle: React.CSSProperties = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle: React.CSSProperties = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

const winnerStyle: React.CSSProperties = {
  color: "red",
  fontSize: "16px",
  fontWeight: "bolder",
};

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

function Square({ value, onClick }: SquareProps) {
  const styleColor = value === "X" ? "blue" : "red";
  const dynamicStyle: React.CSSProperties = {
    ...squareStyle,
    color: styleColor,
  };
  return (
    <div className="square" style={dynamicStyle} onClick={onClick}>
      {value}
    </div>
  );
}

function CaculatorWinner(squares: Array<string | null>): string | null {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index: number) => {
    const newSquares = squares.slice();
    console.log(newSquares);

    newSquares[index] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index: number) => {
    return <Square value={squares[index]} onClick={() => handleClick(index)} />;
  };

  const winner = CaculatorWinner(squares);

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{xIsNext ? "X" : "O"}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{winner}</span>
      </div>
      <button style={buttonStyle} onClick={handleReset}>
        Reset
      </button>
      {winner && (
        <div className="board-row" style={winnerStyle}>
          THE WINNER IS: {winner}
        </div>
      )}
      {!winner && (
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row" style={rowStyle}>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row" style={rowStyle}>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      {/* <button style={buttonStyle}>Reset</button> */}
    </div>
  );
}

export default App;
