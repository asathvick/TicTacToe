// Filename - Board.js

// Importing the CSS for the board
import "./css/board.css";

// Importing the useState hook, useEffect hook and useRef hook
import { useState, useEffect, useRef } from "react";

const Board = ({ reset, setReset, winner, setWinner , userPlayer, setUserPlayer, setUserWins, setComputerWins, userWins, computerWins }) => {
	// Creating a turn state, which indicates the current turn
	const [turn, setTurn] = useState(0);
    const [compPlayer, setCompPlayer]=useState(-1);

	// Creating a data state, which contains the
	// current picture of the board
	const [data, setData] = useState([
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
	]);

	// Creating a reference for the board
	const boardRef = useRef(null);

    useEffect(() => {
		// Clearing the data state
		setData(["", "", "", "", "", "", "", "", ""]);

		// Getting all the children(cells) of the board
		const cells = boardRef.current.children;

		// Clearing out the board
		for (let i = 0; i < 9; i++) {
			cells[i].innerText = "";
		}

		// Resetting the turn to player 0
		setTurn(0);
        setCompPlayer(-1);
		// Resetting the winner
		setWinner("");
		setReset(false);
	}, [reset, setReset, setWinner]);
    useEffect(()=>{
        if(turn==compPlayer){
            //convert 1d array to 2d array board
            var board=[];
            var idx=0;
            for(let i=0;i<3;i++)
            {   var dem=[];
                for(let j=0;j<3;j++){
                    if(data[idx]===""){
                    dem.push("*");
                    }
                    else{
                    dem.push(data[idx]);
                    }
                    idx=idx+1;
                }
                board.push(dem);
            }
            // for(let i=0;i<3;i++){
            //     for(let j=0;j<3;j++)
            //         console.log(board[i][j]);
            // }
            let resIdx=convert2Dto1D(findBestMove(board,"O","X"));
            console.log(resIdx);
            setTimeout(()=>{
                drawComp(resIdx);
            },1500);
        }
    },[turn,setTurn,compPlayer]);


             // Checks for the win condition in rows
		const checkRow = () => {
			let ans = false;
			for (let i = 0; i < 9; i += 3) {
				ans |=
					data[i] === data[i + 1] &&
					data[i] === data[i + 2] &&
					data[i] !== "";
			}
			return ans;
		};

		// Checks for the win condition in cols
		const checkCol = () => {
			let ans = false;
			for (let i = 0; i < 3; i++) {
				ans |=
					data[i] === data[i + 3] &&
					data[i] === data[i + 6] &&
					data[i] !== "";
			}
			return ans;
		};

		// Checks for the win condition in diagonals
		const checkDiagonal = () => {
			return (
				(data[0] === data[4] &&
					data[0] === data[8] &&
					data[0] !== "") ||
				(data[2] === data[4] &&
					data[2] === data[6] &&
					data[2] !== "")
			);
		};

		// Checks if at all a win condition is present
		const checkWin = () => {
			return (
				checkRow() || checkCol() || checkDiagonal()
			);
		};

        // Checks for a tie
		const checkTie = () => {
			let count = 0;
			data.forEach((cell) => {
				if (cell !== "") {
					count++;
				}
			});
			return count === 9;
		};
   
        // useEffect hook used to check for a winner
	// useEffect(() => {

	// 	// Setting the winner in case of a win
	// 	if (checkWin()) {
	// 		setWinner(
	// 			turn === 0
	// 				? "Player 2 Wins!"
	// 				: "Player 1 Wins!"
	// 		);
    //         //setCompPlayer(-1);
	// 	} else if (checkTie()) {
	// 		// Setting the winner to tie in case of a tie
	// 		setWinner("It's a Tie!");
	// 	}
	// });
    const checkWinFunc=()=>{
        if (checkWin()) {
			setWinner(
				turn === 0
					? "X Wins!"
					: "O Wins!"
			);
            if(turn!==compPlayer)setUserWins(userWins+1);
            else if(turn===compPlayer)setComputerWins(computerWins+1);
            return true;
            //setCompPlayer(-1);
		} else if (checkTie()) {
			// Setting the winner to tie in case of a tie
			setWinner("It's a Tie!");
            return true;
		}
        return false;
    }
	// Function to draw on the board
	const draw = (event, index) => {
		// Draws only if the position is not taken
		// and winner is not decided yet
        if(compPlayer==-1)return;
		if (data[index - 1] === "" && winner === "") {
			// Draws X if it's player 1's turn else draws O
			const current = turn === 0 ? "X" : "O";

			// Updating the data state
			data[index - 1] = current;

			//Drawing on the board
			event.target.innerText = current;

			// Switching the turn

            
            if(!checkWinFunc())
			setTurn(turn === 0 ? 1 : 0);

            //if(turn==0)console.log("palyer2 is playing");
		}
	};
    const drawComp = (index) => {
        console.log("computer is playing");
		// Draws only if the position is not taken
		// and winner is not decided yet
		if (data[index] === "" && winner === "") {
			// Draws X if it's player 1's turn else draws O
			const current = turn === 0 ? "X" : "O";

			// Updating the data state
			data[index] = current;

			//Drawing on the board
			//event.target.innerText = current;
            const cells = boardRef.current.children;
            cells[index].innerText=current

			// Switching the turn
            if(!checkWinFunc())
			setTurn(turn === 0 ? 1 : 0);

            //if(turn==0)console.log("palyer2 is playing");
		}
	};

	// UseEffect hook used to reset the board whenever
	// a winner is decided
	


    useEffect(() => {
        if(userPlayer==="X")
        setCompPlayer(1);
        else if(userPlayer==="O")
        setCompPlayer(0);
	}, [userPlayer, setUserPlayer]);

    //New implementation start
    class Move 
{ 
    constructor() 
    { 
        let row,col; 
    } 
} 
    function isMovesLeft(board) 
    { 
        for(let i = 0; i < 3; i++) 
            for(let j = 0; j < 3; j++) 
                if (board[i][j] == '*') 
                    return true; 
                      
        return false; 
    } 
   function evaluate(b,player, opponent) 
   { 
       // Checking for Rows for X or O victory. 
       for(let row = 0; row < 3; row++) 
       { 
           if (b[row][0] == b[row][1] && 
               b[row][1] == b[row][2]) 
           { 
               if (b[row][0] == player) 
                   return +10; 
                     
               else if (b[row][0] == opponent) 
                   return -10; 
           } 
       } 
      
       // Checking for Columns for X or O victory. 
       for(let col = 0; col < 3; col++) 
       { 
           if (b[0][col] == b[1][col] && 
               b[1][col] == b[2][col]) 
           { 
               if (b[0][col] == player) 
                   return +10; 
      
               else if (b[0][col] == opponent) 
                   return -10; 
           } 
       } 
      
       // Checking for Diagonals for X or O victory. 
       if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) 
       { 
           if (b[0][0] == player) 
               return +10; 
                 
           else if (b[0][0] == opponent) 
               return -10; 
       } 
      
       if (b[0][2] == b[1][1] &&  
           b[1][1] == b[2][0]) 
       { 
           if (b[0][2] == player) 
               return +10; 
                 
           else if (b[0][2] == opponent) 
               return -10; 
       } 
      
       // Else if none of them have 
       // won then return 0 
       return 0; 
   } 
   // This is the minimax function. It  
// considers all the possible ways  
// the game can go and returns the  
// value of the board 
function minimax(board, depth, isMax, player, opponent) 
{ 
    let score = evaluate(board, player,opponent); 
   
    // If Maximizer has won the game 
    // return his/her evaluated score 
    if (score == 10) 
        return score; 
   
    // If Minimizer has won the game 
    // return his/her evaluated score 
    if (score == -10) 
        return score; 
   
    // If there are no more moves and 
    // no winner then it is a tie 
    if (isMovesLeft(board) == false) 
        return 0; 
   
    // If this maximizer's move 
    if (isMax) 
    { 
        let best = -1000; 
   
        // Traverse all cells 
        for(let i = 0; i < 3; i++) 
        { 
            for(let j = 0; j < 3; j++) 
            { 
                  
                // Check if cell is empty 
                if (board[i][j]=='*') 
                { 
                      
                    // Make the move 
                    board[i][j] = player; 
   
                    // Call minimax recursively  
                    // and choose the maximum value 
                    best = Math.max(best, minimax(board, 
                                    depth + 1, !isMax,player, opponent)); 
   
                    // Undo the move 
                    board[i][j] = '*'; 
                } 
            } 
        } 
        return best; 
    } 
   
    // If this minimizer's move 
    else
    { 
        let best = 1000; 
   
        // Traverse all cells 
        for(let i = 0; i < 3; i++) 
        { 
            for(let j = 0; j < 3; j++) 
            { 
                  
                // Check if cell is empty 
                if (board[i][j] == '*') 
                { 
                      
                    // Make the move 
                    board[i][j] = opponent; 
   
                    // Call minimax recursively and  
                    // choose the minimum value 
                    best = Math.min(best, minimax(board, 
                                    depth + 1, !isMax,player,opponent)); 
   
                    // Undo the move 
                    board[i][j] = '*'; 
                } 
            } 
        } 
        return best; 
    } 
} 
// This will return the best possible 
// move for the player 
function findBestMove(board,player, opponent) 
{ 
    let bestVal = -1000; 
    let bestMove = new Move(); 
    bestMove.row = -1; 
    bestMove.col = -1; 
   
    // Traverse all cells, evaluate  
    // minimax function for all empty  
    // cells. And return the cell 
    // with optimal value. 
    for(let i = 0; i < 3; i++) 
    { 
        for(let j = 0; j < 3; j++) 
        { 
              
            // Check if cell is empty 
            if (board[i][j] == '*') 
            { 
                  
                // Make the move 
                board[i][j] = player; 
   
                // compute evaluation function  
                // for this move. 
                let moveVal = minimax(board, 0, false,player,opponent); 
   
                // Undo the move 
                board[i][j] = '*'; 
   
                // If the value of the current move  
                // is more than the best value, then  
                // update best 
                if (moveVal > bestVal) 
                { 
                    bestMove.row = i; 
                    bestMove.col = j; 
                    bestVal = moveVal; 
                } 
            } 
        } 
    } 
    return bestMove; 
} 
function convert2Dto1D(bestMove){
    let dataIdx=bestMove.row*3+ bestMove.col;
    return dataIdx;
}
    //New implementation end




	return (
        <>
		<div ref={boardRef} className="board">
			<div
				className="input input-1"
				onClick={(e) => draw(e, 1)}
			></div>
			<div
				className="input input-2"
				onClick={(e) => draw(e, 2)}
			></div>
			<div
				className="input input-3"
				onClick={(e) => draw(e, 3)}
			></div>
			<div
				className="input input-4"
				onClick={(e) => draw(e, 4)}
			></div>
			<div
				className="input input-5"
				onClick={(e) => draw(e, 5)}
			></div>
			<div
				className="input input-6"
				onClick={(e) => draw(e, 6)}
			></div>
			<div
				className="input input-7"
				onClick={(e) => draw(e, 7)}
			></div>
			<div
				className="input input-8"
				onClick={(e) => draw(e, 8)}
			></div>
			<div
				className="input input-9"
				onClick={(e) => draw(e, 9)}
			></div>
		</div>
        {turn===compPlayer && <p className="comp-color">Computer is playing</p>}
        </>
	);
};

export default Board;
