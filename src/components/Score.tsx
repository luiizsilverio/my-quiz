import { useQuiz } from '../QuizContext.tsx';
import './Score.scss';

function Score() {

    const {state} = useQuiz();

    return (
        <>  
            <div className="score">
                <div>
                    <small>Correto</small>
                    <span className="point">{state.score.correct}</span>
                    <span>X</span>
                    <span className="point">{state.score.incorrect}</span>
                    <small>Incorreto</small>
                </div>
            </div>
            
        </>
    )
}

export default Score
