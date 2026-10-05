export default function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>{" "}
      {/* 4.4) فانا هنا بعد dispatch as prop فانا عايز اخلي user وقت لما يعمل click يعرض الاسئلة فانت عارف اني dispatch بيكون جواه object بتحطي فيها type,payload فانا احطي type بتاعي هنا start 
      بمعني اية الكلام ده انك لما تبعت action بتاعك هيدور علي case اللي فيها start وهيبدا يعرض component اللي status بتاعتو is active */}
    </div>
  );
}
