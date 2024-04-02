import { useEffect } from 'react';

import Score from './components/Score.tsx';
import Game from './components/Game.tsx';
import FullPageLoader from './components/FullPageLoader.tsx';
import { useQuiz, Question, QuestionsResponse } from './QuizContext.tsx';
import './App.scss'

function App() {
  const {state, dispatch} = useQuiz();

  async function fetchQuestion() {
    dispatch({ type: "setStatus", payload: "fetching" });

    try {
      const response = await fetch('http://opentdb.com/api.php?amount=1&category=18'); //&encode=url3986');
      let data : QuestionsResponse = await(response.json());

      if (data.response_code === 0) {
        let question : Question = data.results[0];
        console.log(question.question);
        
        let randomIndex = Math.round(Math.random() * question.incorrect_answers.length);
        
        question.incorrect_answers.splice(randomIndex, 0, question.correct_answer);

        dispatch({ type: "setStatus", payload: "ready" });
        dispatch({ type: "setQuestion", payload: question });

      } else {
        dispatch({ type: "setStatus", payload: "error" });
      }
    }
    catch (err) {
      console.log(err);
      dispatch({ type: "setStatus", payload: "error" });
    }
  }

  useEffect(() => {
    if (state.gameStatus == "idle") {
      fetchQuestion();
    }
  }, [])

  return (
    <>
      {
        state.gameStatus == 'fetching' 
        ?
          <FullPageLoader />
        : 
        state.gameStatus == 'error' 
        ?
          <p>Erro...</p>
        :
          <>
            <Score />
            <Game /> 
            <h2>Status: {state.gameStatus}</h2>
          </>
      }
    </>
  )
}

export default App
