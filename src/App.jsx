import { useState } from 'react'
import './App.css'

const TURNS = {
  x: 'x',
  O: 'o'
}

const Square = ({children, isSelected,updateBoard, index}) => {
  
  const className = `square ${isSelected ? 'is-selected': ''}`
  
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setboard] = useState(Array(9).fill(null))
  
  const [turn, setTurn] = useState(TURNS.x)


  //null = no hay ganador, false = empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    //si no hay ganador
    return null
  }

  const resetGame = () => {
    setboard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
  }

  const updateBoard = (index) =>{

    // si la posicion tiene algo registrado
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setboard(newBoard)
    const newTurn = turn === TURNS.x ? TURNS.O : TURNS.x
    setTurn(newTurn)
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner) 
    }

  }

  return (
    <main className='board'>
      <h1>GAME</h1>
      <button onClick={resetGame}> RESETEAR JUEGO</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      
      {
        winner != null && (
          <section className='winner'>
            <div className="text">
              <h2>
                {
                  winner===false ? 'Empate' : 'Gano:'
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
    
}

export default App
