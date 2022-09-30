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

export const $turn = gameDomain.store<Values>('o')
const changeTurn = gameDomain.event()

const determineVictory = gameDomain.effect<Cell[], boolean>()

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

determineVictory.use(game => {
    const values = game.map(g => g.value)
    let isHasWinner = false
    // horizontal
    values.forEach((value, index) => {
        if (index === 2 || index === 5 || index === 8) {
            if (!value) return
            if (new Set([values[index], values[index - 1], values[index - 2]]).size === 1) {
                isHasWinner = true
            }
        }
    })
    // vertical
    values.forEach((value, index) => {
        if (index === 6 || index === 7 || index === 8) {
            if (!value) return
            if (new Set([values[index], values[index - 3], values[index - 6]]).size === 1) {
                isHasWinner = true
            }
        }
    })
    // diagonal
    values.forEach((value, index) => {
        if (index === 8 || index === 6) {
            if (!value) return
            if (index === 6 && new Set([values[index], values[index - 2], values[index - 4]]).size === 1) {
                isHasWinner = true
            }
            if (index === 8 && new Set([values[index], values[index - 4], values[index - 8]]).size === 1) {
                isHasWinner = true
            }
        }
    })
    if (isHasWinner) {
        return true
    }
    return false
})

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
    target: [determineVictory]
})

sample({
    clock: determineVictory.doneData,
    filter: isWinner => !isWinner,
    target: changeTurn
})