import { useUnit } from 'effector-react'
import React from 'react'
import { $game, $turn, moveMade } from '../../store/game'
import './game.scss'

export const Game: React.FC = () => {

    const game = useUnit($game)
    const turn = useUnit($turn)

    return(
        <div className='game'>
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
        </div>
    )
}