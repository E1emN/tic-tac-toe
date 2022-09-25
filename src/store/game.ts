import { createDomain, sample } from 'effector'

type Values = 'o' | 'x'

interface Cell {
    position: number,
    value: Values | null
}

interface ChangeGameStore {
    game: Cell[],
    currentMove: Cell
}

const gameDomain = createDomain()

export const $game = gameDomain.store<Cell[]>(new Array(9).fill(null).map((_, i) => ({ position: i + 1, value: null })))
export const moveMade = gameDomain.event<number>()
const changeGameStoreFx = gameDomain.effect<ChangeGameStore, Cell[]>()

const $turn = gameDomain.store<Values>('o')
const changeTurn = gameDomain.event()

const deterVictory = gameDomain.effect<Cell[], ''>()

changeGameStoreFx.use(({ game, currentMove }) => {
    if (game.find(g => currentMove.position === g.position).value === null) {
        return game.map(g => {
            if (g.position === currentMove.position) {
                return currentMove
            } else {
                return g
            }
        })
    } 
    throw new Error('cell is occupied')
})

$game
    .on(changeGameStoreFx.doneData, (_, game) => game)

$turn
    .on(changeTurn, turn => turn === 'o' ? 'x' : 'o')

sample({
    clock: moveMade,
    source: {$game, $turn},
    fn: ({$game, $turn}, position) => ({
        game: $game,
        currentMove: {
            position,
            value: $turn
        }
    }),
    target: changeGameStoreFx  
})

sample({
    clock: $game,
    target: changeTurn
})