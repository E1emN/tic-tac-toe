import React from 'react'
import './game.scss'
import { useUnit } from 'effector-react'
import { $game, $isWinner, $turn, moveMade } from '../../store/game'
import { Winner } from './Winner/winner'

export const Game: React.FC = () => {

    const game = useUnit($game)
    const turn = useUnit($turn)
    const isWinner = useUnit($isWinner)

    return(
        <div className='game'>
            {
                isWinner ?
                <Winner />
                :
                <div className='container game__container'>
                    <span className='game__move'>Move: <span>{turn}</span></span>
                    <div className='game__grid'>
                        {
                            game.map(g => 
                                <div key={g.position} className='game__block' onClick={() => moveMade(g.position)}>
                                    {
                                        g.value === 'o' ?
                                        <div className='o' />
                                        :
                                        g.value === 'x' ?
                                        <div className='x'>
                                            <div />
                                            <div />
                                        </div>
                                        :
                                        ''
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}