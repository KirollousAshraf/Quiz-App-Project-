export default function NextQuestion({
  dispatch,
  answer,
  index,
  numQuestions,
}) {
  if (answer === null) return null; // 8.4) انا محتاج answer علشان مش عايز لما ابدا start game يظهر button لا المفروض يظهر بعد لما اختر الاجابة فعملت early return

  // 9.3) انا دلوقتي محتاج لما اوصل لاخر سوال عندك في array المفروض يعرض button finish مش next يعني لازم index = 14 وكمان numquestions = 14 فكده يظهر بس قبل ده لازم تشيل button next فانت هتعمل
  // condition بيقولي اني طول ما index بتاعك اصغر من عدد الاسئلة افضل اعرض next غير كده لا فهيظر button finish
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        finish
      </button>
    );
}
