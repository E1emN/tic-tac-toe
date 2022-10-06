import React from 'react'
import './winner.scss'
import { useUnit } from 'effector-react'
import { $isWinner, $turn, reset } from '../../../store/game'

export const Winner: React.FC = () => {

    const turn = useUnit($turn)
    
    return (
        <div className="winner">
            <span className="winner__text">
                <span>{turn}</span> is winner of the game!
            </span>
            <button onClick={() => reset()}>Play again</button>
        </div>
    )
}