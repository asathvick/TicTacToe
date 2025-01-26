import { useState, useEffect } from "react";
import "./css/info.css";
const Choose = ({ userPlayer, setUserPlayer ,reset, setReset }) => {
  const [playerChosen, setPlayerChosen] = useState(-1);

  const settingPlayer = (decider) => {
    if (decider == 0) {
      //console.log("Player 1 is selected");
      setPlayerChosen(0);
      setUserPlayer("X");
    } else {
      //console.log("Player 2 is selected");
      setPlayerChosen(1);
      setUserPlayer("O");
    }
    //console.log("Setting player to "+playerChosen);
  };

  useEffect(() => {
    // Clearing the data state
    setPlayerChosen(-1);
    setUserPlayer("");
    // Getting all the children(cells) of the board
    setReset(false);
}, [reset, setReset]);

  return (
    <div>
      <div className="info">
        {(() => {
          if (playerChosen === -1) {
            return (
              <>
                <div className="player">Choose Player</div>
                <div className="player-choose" onClick={() => settingPlayer(0)}>
                  X
                </div>
                <div className="player-choose" onClick={() => settingPlayer(1)}>
                  O
                </div>
              </>
            );
          } else {
            return (
              <>
                {playerChosen === 0 && (
                  <p className="chose">User has chose X</p>
                )}
                {playerChosen === 1 && (
                  <p className="chose">User has chose O</p>
                )}
              </>
            );
          }
        })()}
      </div>
    </div>
  );
};
export default Choose;
