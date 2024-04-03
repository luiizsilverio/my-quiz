import { decode } from 'html-entities';
import { useQuiz } from '../QuizContext.tsx';
import './AnswerOption.scss';

function AnswerOption({answer}: {answer : string}) {
    
    const {state, dispatch} = useQuiz();

    return (
        <>  
            {
                answer &&
                <div className="answer-option">
                    <p 
                        className={`
                            ${answer == state.userAnswer ? 'selected' : ''}
                            ${state.gameStatus == 'answered' && answer == state.question?.correct_answer ? 'correct' : ''}
                        `}
                        onClick={() => dispatch({type: "setUserAnswer", payload: answer})}
                    > 
                       {decode(answer)}
                    </p>
                </div>
            }
            
        </>
    )
}

export default AnswerOption
