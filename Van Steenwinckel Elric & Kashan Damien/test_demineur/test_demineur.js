var MineSweeper = {
    name: 'MineSweeper',
    
    difficulties: {
    easy: {
        lines: 8,
        columns: 8,
        mines: 10,
    },
    normal: {
        lines: 12,
        columns: 12,
        mines: 20,
    },
    hard: {
        lines: 16,
        columns: 16,
        mines: 32,
    },
    extreme: {
        lines: 20,
        columns: 20,
        mines: 48,
    },
    },
    
    settings: {
    },
    
    game: {
        status: 0,
        field: new Array(),
    },
    
    initialise: function() {
    },
    
    startGame: function(difficulty) {
        this.settings = this.difficulties[difficulty];
        this.drawGameBoard();
        this.resetGame();
    },

    drawGameBoard: function(){
        board = document.getElementById('plateau');
        board.innerHTML = '';
        
        document.getElementById('result').innerHTML = '';

        border = document.createElement('table');
        border = document.createElement('tbody');
        border.appendChild(field);

        border.className = 'field';

        board.appenChild(border);

        for (i = 1; i <= this.settings['lines']; i++) {
            line = document.createElement('tr');
            
            for (j = 1; j <= this.settings['columns']; j++) {
                cell = document.createElement('td');
                cell.id = 'cell-'+i+'-'+j;
                cell.className = 'cell';
                line.appendChild(cell);
            }
            field.appenChild(line);
        }



    },

    resetGame: function(){

    },
    }