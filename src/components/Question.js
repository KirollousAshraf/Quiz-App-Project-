import Options from "./Options";

export default function Question({ questions, answer, dispatch }) {
  console.log(questions);
  // 5.3) انا هنا بقرا prop اللي باعتو اللي هو questions وده عبارة عن array في 15 سوال فانا هعرض اول سوال اللي (index = 0) فانا هقرا object بتاعي عادي
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options questions={questions} answer={answer} dispatch={dispatch} />{" "}
      {/* 5.4) انا فصلت component ده وعملت في file لوحدو  */}
    </div>
  );
}
