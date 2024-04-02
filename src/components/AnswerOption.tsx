import { decode } from 'html-entities';
import { useQuiz } from '../QuizContext.tsx';
import './AnswerOption.scss';

function AnswerOption({answer}: {answer : string}) {
    const {dispatch} = useQuiz();

    return (
        <>  
            {
                answer &&
                <div className="answer-option">
                    <p onClick={() => dispatch({type: "setUserAnswer", payload: answer})}> 
                       {decode(answer)}
                    </p>
                </div>
            }
            
        </>
    )
}

export default AnswerOption
