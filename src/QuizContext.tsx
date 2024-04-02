import React, { createContext, useContext, useReducer } from "react";

export interface Question {
  type: 'multiple' | 'boolean';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionsResponse {
  response_code: number;
  results: Question[];
}


type Status = "idle" | "fetching" | "ready" | "error";

interface QuizState {
  gameStatus: Status;
  question: Question | null;
  userAnswer: string | null;
}

interface IQuizContext {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

type QuizAction = 
  { type: "setStatus" ; payload: Status } |
  { type: "setQuestion" ; payload: Question } |
  { type: "setUserAnswer" ; payload: string } 


interface QuizProps {
  children: React.ReactElement;
}

const initialState : QuizState = {
  gameStatus: "idle",
  question: null,
  userAnswer: null,
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
    case "setQuestion":
      return {...state, question: action.payload};
    case "setUserAnswer":
      return {...state, userAnswer: action.payload};
    case "setStatus":
      return {...state, gameStatus: action.payload};
    default:
      throw new Error("Unknown action");
  }
}