import { decode } from 'html-entities';
import { useQuiz } from '../QuizContext.tsx';

function Result() {

    const {state} = useQuiz();

    return (
        <>  
            {
                state.userAnswer == state.question?.correct_answer 
                ?
                    <div className="result correct">&#10003; Resposta correta!</div>
                :
                    <div className="result incorrect">
                        &#x274C; Resposta incorreta! A resposta correta é {decode(state.question?.correct_answer)}
                    </div>
            }
        </>
    )
}

export default Result
