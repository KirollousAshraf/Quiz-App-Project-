export default function FinishScreen({ points, maxPossiblePoints, highscore }) {
  // 9.2) ده component اللي بيظهر لما تدوس finish button بيعرض ليك points و maxPossiblePoints و highscore بتاعك في اللعبة وكمان ضيف هنا some of conditions علي حسب انا جبت score كام يظهر ليا emoji معين وكده
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>

      <p className="highscore">Highscore: {highscore} points</p>
    </>
  );
}
