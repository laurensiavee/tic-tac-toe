const cells = document.querySelectorAll('[data-cell]')
const board = document.querySelector('[data-board]')
const screen = document.querySelector('[data-screen')
const win_msg = document.querySelector('[data-win-msg]')
const restart_btn = document.querySelector('[data-restart]')

const win_combination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]]

class Game{
    constructor(currentPlayer){
        this.currentPlayer = currentPlayer
        this.newGame()
    }

    newGame(){
        // reset
        cells.forEach(cell => {
            cell.classList.remove(class_o)
            cell.classList.remove(class_x)
        })
        board.classList.remove(board_o)
        board.classList.remove(board_x)
        
        screen.classList.remove(visible)

        this.resetListener()
        
        // hover board
        if(this.currentPlayer === 'o') {
            board.classList.add(board_o)
        } else{
            board.classList.add(board_x)            
        } 
    }

    changeBoard(){
        if(this.currentPlayer === 'o') {
            board.classList.remove(board_x)
            board.classList.add(board_o)
        } else{
            board.classList.remove(board_o)
            board.classList.add(board_x)  
        } 
    }

    placeMark(cell){
        if (this.currentPlayer === 'o'){
            this.currentPlayerClass = class_o
            this.currentPlayer = 'x'
        } else {
            this.currentPlayerClass = class_x
            this.currentPlayer = 'o'
        }
            
        cell.classList.add(this.currentPlayerClass)

        if (this.checkWin(this.currentPlayerClass))
            this.displayWin()

        this.changeBoard()
    }

    displayWin(){
        if (this.currentPlayer === 'x')
            win_msg.innerText = "O WIN!"
        else win_msg.innerText = "X WIN!"
        screen.classList.add(visible)
    }

    checkWin(currentPlayerClass){
        return win_combination.some(combination => {
            return combination.every(index => {
                if(cells[index].classList.contains(currentPlayerClass))
                    return true
            })
        })
    }

    resetListener(){
        cells.forEach(cell => {
            cell.removeEventListener('click', clicked)
            cell.addEventListener('click', clicked, {once: true})
        })
    }
}

const class_x = 'cell-x'
const class_o = 'cell-o'
const board_x = 'x'
const board_o = 'o'
const visible = 'visible'

const game = new Game('o')

function clicked(e) {
    cell = e.target
    game.placeMark(cell)
}

restart_btn.addEventListener('click', button => {
    game.newGame()
})