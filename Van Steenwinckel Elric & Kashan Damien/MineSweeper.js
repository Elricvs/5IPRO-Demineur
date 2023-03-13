/* base/moteur du jeu */

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
    drawGameBoard: function() {
		/* récupère le plateau et le vider */
        board = document.getElementById('plateau');
        board.innerHTML = '';
		/* vider la partie précédente */
        document.getElementById('result').innerHTML = '';
		/* bord de table et intérieur de la table + classe de style */
        border = document.createElement('table');
        border.setAttribute('oncontextmenu', 'return false;'); /* return false pour eviter un probleme sur le clic droit */
        field = document.createElement('tbody');
        border.appendChild(field);
        border.className = 'field';
		/* ajout du champ au plateau */
        board.appendChild(border);
		/* créé autant de ligne par rapport au settings */
        for (i = 1; i <= this.settings['lines']; i++) {
            line = document.createElement('tr');
		/* créé les cellules + intéractions marquage d'une cellule ( mine? )*/
            for (j = 1; j <= this.settings['columns']; j++) {
                cell = document.createElement('td');
                cell.id = 'cell-'+i+'-'+j;
                cell.className = 'cell';
                cell.setAttribute('onclick', this.name+'.checkPosition('+i+', '+j+', true);');
                cell.setAttribute('oncontextmenu', this.name+'.markPosition('+i+', '+j+'); return false;');
                line.appendChild(cell); 
            }
            field.appendChild(line);
        }
    },