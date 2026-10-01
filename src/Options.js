export default function Options({ questions, answer, dispatch }) {
  console.log(questions, answer);
  const hasAnswered = answer !== null; // 6.5) انا هنا عملت condition ده علشان لما اعمل click اي اجابة سوال ماقدرش بعد كده اعمل click علي other buttons of answers بمعني بعمل disable لل other buttons of answers
  // استخدمت conditon برضو ده في styleing بحيث اني لو مش مختار اجابة مش هيعمل styleing بتاعو لو مختار الاجابة الصح هيبقي لونه اخضر و هكذا
  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          // 6.4) انا دلوقتي محتاج اني اعمل styling لما اعمل click button فانت هتعمل styling with ternary-op علشان هتستخدم cond اللي بيعرفني هل index = answer ولا وحاجة كمان بيخلني لو index = correctanswer is to green bottun
          className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? (index === questions.correctOption ? "correct" : "wrong") : ""}`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
        // 6.3) فانا هنا هعمل click علي اجابة السوال اللي بيظهر فانا المفروض اقرا prop بتاعي اللي هو dispatch وده هبعت فيها { type: "newAnswer", payload: index } جبت ال index عن طريق اني map بتخود
        // 2 parameters و second-parameter بيكون index فانا عن طريق ده ببعت data اللي شايلة اجابة السوال اللي ممكن يكون 1 او 2 او 0
      ))}
    </div>
  );
}
