// Filename - Info.js

// Importing the css for the info
import "./css/info.css";

const Info = ({userWins, computerWins}) => {
	return (
		<div className="info">
			<div className="player">User Wins : {userWins}</div>
			<div className="player">Computer Wins : {computerWins}</div>
		</div>
	);
};

export default Info;
