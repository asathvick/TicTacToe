// Filename - App.js

// Importing the required components
import Board from "./Board";
import Info from "./Info";
import Choose from './Choose';

// Importing the CSS File
import "./App.css";

// Importing the useState hook
import { useState } from "react";

function App() {
	// Creating a reset state, which indicates whether
	// the game should be reset or not
	const [reset, setReset] = useState(false);

	// Creating a winner state, which indicates
	// the current winner
	const [winner, setWinner] = useState("");


  const [userPlayer,setUserPlayer] =useState("");

  const [userWins, setUserWins]= useState(0);
  const [computerWins, setComputerWins]= useState(0);

	// Sets the reset property to true
	// which starts the chain
	// reaction of resetting the board
	const resetBoard = () => {
		setReset(true);
	};

	return (
		<div className="App">
			{/* Shrinks the popup when there is no winner */}
			<div
				className={`winner ${
					winner !== "" ? "" : "shrink"
				}`}
			>
				{/* Display the current winner */}
				<div className="winner-text">{winner}</div>
				{/* Button used to reset the board */}
				<button onClick={() => resetBoard()}>
					Reset Board
				</button>
			</div>
			{/* Custom made board component comprising of 
			the tic-tac-toe board */}
			<Choose userPlayer={userPlayer} setUserPlayer={setUserPlayer} reset={reset} setReset={setReset} />
			<Board
				reset={reset}
				setReset={setReset}
				winner={winner}
				setWinner={setWinner}
				userPlayer={userPlayer}
				setUserPlayer={setUserPlayer}
				setUserWins={setUserWins}
				setComputerWins={setComputerWins}
				userWins={userWins}
				computerWins={computerWins}
			/>
			<Info userWins={userWins} computerWins={computerWins}/>
		</div>
	);
}

export default App;
