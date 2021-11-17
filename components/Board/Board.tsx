import React, { useEffect, useState } from 'react';

import Square from '../Square/Square';
import { Player } from '../../helpers/Player';
import { lines } from '../../helpers/lines';

const Board = () => {
  const [ squares, setSquares ] = useState(Array(9).fill(null));
  const [ currentPlayer, setCurrentPlayer ] = useState<'X' | 'O'>(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
  const [ winner, setWinner ] = useState<Player>(null);

  const reset = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O');
  };

  const setSquareValue = (index: number) => {
    const newData = squares.map((val, i) => {
      if (i === index) return currentPlayer;

      return val;
    });

    setSquares(newData);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const calculateWinnder = (squares: Player[]) => {
    for(let i = 0; i < lines.length; i++) {
      const [ a, b, c ] = lines[i];
  
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
  
    return null;
  };

  useEffect(() => {
    const win = calculateWinnder(squares);
    if (win) setWinner(win);
    if (!win && !squares.filter((square) => !square).length) setWinner('Both');
  });

  return (
    <div>
      {<p className="player">Your turn Player | {currentPlayer}</p>}
      {<p className="player">Winner | {winner === 'Both' ? 'Both' : winner}</p> }

      <div className="grid">
        {Array(9).fill(null).map((_, i) => {
          return (
            <Square 
              key={i} 
              onClick={() => setSquareValue(i)} 
              value={squares[i]}
              winner={winner}
            />
          )
        })}
      </div>

      <button 
        className="reset" 
        onClick={reset}
        >RESET
      </button>
    </div>
  );
};

export default Board;
