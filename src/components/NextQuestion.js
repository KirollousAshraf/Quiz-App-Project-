export default function NextQuestion({ dispatch, answer }) {
  if (answer === null) return null; // 8.4) انا محتاج answer علشان مش عايز لما ابدا start game يظهر button لا المفروض يظهر بعد لما اختر الاجابة فعملت early return

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      next
    </button>
  );
}
