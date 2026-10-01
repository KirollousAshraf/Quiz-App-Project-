import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

// 2.6) ده current state بتاعتك عبارة عن object فيها questions ده بيكون array فاضي علشان ده اللي احطي في data اللي بتيجي من api و status ده حالة state يعني هل questions جاهزة ولا لا هل في error او loading
const initialState = {
  questions: [],
  // 'loading','error','ready'
  status: "loading",
  index: 0, // 5.1) انا محتاج زي موشر يخليني اعرض اول سوال عندي لما user يضغط علي button يعرض اول سوال فانت محتاج تعرض اول سوال عندك في array ازاي بقي عن [index] ولما يضغط علي next button المفروض
  // (index + 1) يعرض السوال اللي بعد (zero)
  answer: null, // 6.1) انا محتاج هنا اني بعد لما الاسئلة ظهرت انا دلوقتي محتاج اني اختر الاجابة علي السوال اللي بيظهر لما تختار الاجابة بيحصل كذا حاجة عندك :
  // -1) اني الاجابة صح بتكون لونه اخضر و الباقي احمر
  // -2) button بتاع next علشان يظهر زرار بيكون ظهر
  // -3) وبيظهر points لما تكون الاجابة صح
  // فده يعتبر state علشان تعمل render ui فبيظهر حاجة جديدة فانت محتاج تعمل handle لل case ده تعال نعرف ازاي
  points: 0,
};

// 2.4) ده reducer function بيكون فيها كل logic اللي هيتعمل ماشي بيخود (2 parameters) عندك state => currentState , action ده بيتبعت عن طريق dispatch اكنو زي setterFunction
function reducer(state, action) {
  // console.log(state, action);
  // 2.5) انا هنا بعمل switch علي action.type اني مثلا انا ببعت dataReceived ده action بيكون موجود في dispatch object بيرجعلك باقي object و شوف الحاجة اللي انت تتغير لية لاني useReducer زي useState
  // بمعني اني هي بتخود نسخة من object وبعد كده بتعدل عليه عادي

  const question = state.questions[state.index];
  // console.log(question);

  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start": // 4.2) انا هنا عملت case جديدة لما user يعمل click on button for start the questions المفروض يعرض الاسئلة صح
      return { ...state, status: "active" };
    case "newAnswer": // 6.2) عملت case جديدة عبارة اني action بتاعه newAnswer ده بيرجع object فيها اني محتاج ابعت لية index بتاع الاجابة بحيث لما اختر يكون index-option === questionofcorrectoption
      // فانا هبعت answer , dispatch ك props في question
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    default:
      throw new Error("Unknown Action");
  }
}

export default function App() {
  // 2.3) دلوقتي انا عندي cases هتكون كتير لل state هتستخدم هنا useReducer تمام علشان هيبقي في حاجات كتير من state ماشي فانت بيرجعلك منها حاجتين هم :
  // 1) اول حاجة state ده بتكون current state بتاعتك سواء بقي هتكون (0 and object كبير فيها data تمام)
  // 2) عندك dispatch اللي بيبعت actions اللي هتتنفذه جواه حاجة اسمها reducer function
  // 3) useReducer بتخود (2 parameters) => 1) بيكون reducer function ده اللي بيرجعلي new state , 2) initialState بتكون يا 0 او object

  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState,
  ); // 3.3) انا هنا بدل ماعمل اني استخدم state.status جواه component لا عملت desturct لل object بحيث تكون سهلة عليا في write
  // const { questions, status } = state;
  const numQuestions = questions.length; // 3.4) انا لية عملت derivied state هنا علشان انا عايز عدد الاسئلة اللي موجودة في array اللي هم 15 فعملت send لل variable ده اكنو props علشان استخدم في component اللي
  // محتاج الرقم ده

  // 2.1) اول حاجة بعد ماعملت fakeApi بتاعي و عملت run server انت دلوقتي محتاج تعمل fetch data from fakeApi فلازم تستخدم هنا useEffect علشان انا عايز اعمل fetch لل data بعد render component تمام
  // 2.2) في الاول هنستخدم then&catch بعد كده هنستخدم ل fetch data عن طريق async&await
  useEffect(function () {
    fetch("http://localhost:7000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {/* 3.1) انا هنا عايز اخلي ui يكون علي حسب حالة بتاعت الاسئلة هل هي جاهزة ولا لا ولا في error فيظهر لل users اني في مشكلة وابين اني الاسئلة جاهزة و كده
        3.2) فانا عملت الكلام ده ازاي عن طريق con-rendering بمعني اني لو مثلا status بتاعتنا بتحمل الاسئلة اعرض ليا ui-component of loading بحيث user لما يستخدم app يفهم اني الاسئلة بيتعمل لية fetch وهكذا  */}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {/* 4.3) اللي المفروض اعملوا فاكر لما كنت بتبعت fun اللي بتخلي component يعمل re-render للحاجة الجديدة هي هي نفس الفكرة انت هنا هتبعت dispatch ك props لاني ده يعتبر action فتعال نشوف هنعمل اية  */}
        {status === "active" && (
          <Question
            questions={questions[index]}
            answer={answer}
            dispatch={dispatch}
          />
        )}{" "}
        {/* 5.2) انا هنا بعت questions array as prop علشان ده هيعرض اول سوال في array اللي index بتاعو ب zero و كمان questions في كل الاسئلة بتاعتك فاحنا هنعرض اول رقم اللي هو 0*/}
        {/* 4.1) انا هنا زودت component جديدة وهو اني ابدا اعرض الاسئلة بتاعتي فانا عملت condition علي status اني هي لو active ابدا اعرض الاسئلة تعال نعرف flow بيمشي ازاي */}
      </Main>
    </div>
  );
}

// 1) انا نزلت package بتاعت json-server علشان اعمل create fake api فانت علشان تقرا api اللي معمول لية create لازم تروح package.json وتعمل script يقرا فيها fake api اللي معمول علشان بتكتب script هنا
// ده شكل script => "server": "json-server --watch data/questions.json --port انت اللي بتختر port" علشان يشتغل لازم تكتب command ده npm run server => امتي اعمل كل الكلام ده لو انت مش شغال علي realapi بس
