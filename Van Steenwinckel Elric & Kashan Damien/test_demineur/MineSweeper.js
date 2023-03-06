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
        this.startGame('easy');
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
                cell.setAttribute('onclick', this.name+'.checkPosition('+i+', '+j+');'); 
                cell.setAttribute('oncontextmenu', this.name+'.markPosition('+i+', '+j+'); return false;');
                line.appendChild(cell);
                border.setAttribute('oncontextmenu', 'return false;');
            }
            field.appenChild(line);
        }



    },

    resetGame: function(){
        this.game.field = new Array();
        for (i =1; i <= this.settings['lines']; i++) {
            this.game.field[i] = new Array();
            for (j = 1; j<= this.settings['columns']; j++) {
                this.game.field[i][j] = 0;
            }
        }
    
        for (i = 1; i<= this.settings['mines']; i++) {
            x = math.floor(math.random() * (this.settings['columns'] - 1) + 1);
            y = math.floor(math.random() * (this.settings['lines'] - 1) + 1);
            while (this.game.field[x][y] == -1) {
            x = math.floor(math.random() * (this.settings['columns'] - 1) + 1);
            y = math.floor(math.random() * (this.settings['lines'] - 1) + 1);
            }
            this.game.field[x][y] = -1;

            for (j = x-1; j <= x+1; j++) {
                if (j == 0 || j == (this.settings['columns'] + 1))  {
                    continue;
                }
                for (k = y-1; k <= y+1; k++) {
                    if (k == 0 || k == (this.settings['lines'] + 1)) {
                        continue;
                    }
                    if (this.game.field[j][k] != -1) {
                        this.game.field[j][k] ++;
                    }
                }
            }
        }

    this.game.status = 1;

    

    },
    
    




}

