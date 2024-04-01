import React, { createContext, useContext, useReducer } from "react";

interface Question {
  type: 'multiple' | 'boolean';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuizApiResponse {
  response_code: number;
  results: Question[];
}


type Status = "idle" | "fetching" | "ready";

interface QuizState {
  gameStatus: Status
}

interface IQuizContext {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

type QuizAction = {
  type: "setStatus";
  payload: Status;
}

interface QuizProps {
  children: React.ReactElement;
}

const initialState : QuizState = {
  gameStatus: "idle"
}

const QuizContext = createContext<IQuizContext>({
  state: initialState,
  dispatch: () => null
});

export function QuizProvider({ children }: QuizProps) {
  const [state, dispatch] = useReducer(QuizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  return useContext(QuizContext);
}

function QuizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "setStatus":
      return {...state, gameStatus: action.payload};
    default:
      throw new Error("Unknown action");
  }
}