import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//In React, 'function components' are a simpler way to write components that only contain a render method and don’t have their own state.
//--> function component
function Square(props) {
  return ( //we take everything out of the props. the onClick function and the value
    <button className="square" onClick={props.onClick}> 
      {props.value} 
    </button>
  );
}

//--> function component 
function calculateWinner(squares) {
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

//--> component 
class Board extends React.Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: true,
  };

  handleClick(i) {
    const squares = this.state.squares.slice();
    //Note how in handleClick, we call .slice() to create a copy of the squares array to modify instead of modifying the existing array
    //Immutability is muy importante. Always make a copy of arrays + objects
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext, //update the squares property of state 
  });
};


  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)} //we add the function here, so we can use it like we can use every prop (except for keys)
        //We work with an arrow function here, so we don't have to bind the function
      />
    );
  }

  render() {
    //if xIsNext then render 'X', otherwise render 'o':
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

