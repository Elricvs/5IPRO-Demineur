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

    resetGame: function() {

        /* créé le terrain vide */
        this.game.field = new Array();
        for (i = 1; i <= this.settings['lines']; i++) {
            this.game.field[i] = new Array();
            for (j = 1; j <= this.settings['columns']; j++) {
                this.game.field[i][j] = 0;
            }
        }

        /* ajout des mines */
        for (i = 1; i <= this.settings['mines']; i++) {
            /* placement des mines aléatoirement */
            x = Math.floor(Math.random() * (this.settings['columns'] - 1) + 1);
            y = Math.floor(Math.random() * (this.settings['lines'] - 1) + 1);
			/* tant qu'une mine est dans la case, cherche une nouvelle case */
			while (this.game.field[x][y] == -1) { 
                x = Math.floor(Math.random() * (this.settings['columns'] - 1) + 1);
                y = Math.floor(Math.random() * (this.settings['lines'] - 1) + 1);
            }
            this.game.field[x][y] = -1;

            /* mise a jour des cases adjacentes */
            for (j = x-1; j <= x+1; j++) {
				/* indique la présence d'une mine */
				if (j == 0 || j == (this.settings['columns'] + 1))
                    continue;
                for (k = y-1; k <= y+1; k++) {
                    if (k == 0 || k == (this.settings['lines'] + 1))
                        continue;
                    if (this.game.field[j][k] != -1)
                        this.game.field[j][k] ++;
                }
            }
        }

        /* initialise le jeu  */
        this.game.status = 1;
    },

    markPosition: function(x, y) {

        /* check si le jeu fonctionne */
        if (this.game.status != 1)
            return;

        /* check de la cellule si deja visitée */
        if (this.game.field[x][y] == -2)
            return;

        if (this.game.field[x][y] < -90) {
        /* retire le marquage */
            document.getElementById('cell-'+x+'-'+y).className = 'cell';
            document.getElementById('cell-'+x+'-'+y).innerHTML = '';
            this.game.field[x][y] += 100;

        } else {
        /* applique le marquage */
            document.getElementById('cell-'+x+'-'+y).className = 'cell marked';
            document.getElementById('cell-'+x+'-'+y).innerHTML = '!';
            this.game.field[x][y] -= 100;
        }
    },

    checkPosition: function(x, y, check) {

        /* check si le jeu fonctionne */
        if (this.game.status != 1)
            return;

        /* check de la cellule si deja visitée */
        if (this.game.field[x][y] == -2) {
            return;
        }

        /* check si la case est marquée */
        if (this.game.field[x][y] < -90) {
            return;
        }

        /* check si la cellule est une mine */
        if (this.game.field[x][y] == -1) {
            document.getElementById('cell-'+x+'-'+y).className = 'cell bomb';
            this.displayLose();
            return;
        }

        /* marque la cellule comme verifiée */
        document.getElementById('cell-'+x+'-'+y).className = 'cell clear';
        if (this.game.field[x][y] > 0) {
            /* marque le nombre de mine des cases adjacentes */
            document.getElementById('cell-'+x+'-'+y).innerHTML = this.game.field[x][y];

            /* marque la case comme visitée */
            this.game.field[x][y] = -2;
        } else if (this.game.field[x][y] == 0) {
            /* marque la case comme visitee */
            this.game.field[x][y] = -2;

            /* affiche les cases adjacentes */
            for (var j = x-1; j <= x+1; j++) {
                if (j == 0 || j == (this.settings['columns'] + 1))
                    continue;
                for (var k = y-1; k <= y+1; k++) {
                    if (k == 0 || k == (this.settings['lines'] + 1))
                        continue;
                    if (this.game.field[j][k] > -1) {
                        this.checkPosition(j, k, false);
                    }
                }
            }
        }

        /* check si victoire */
        if (check !== false)
            this.checkWin();
    },

    checkWin: function() {
        /* check toutes les cases */
        for (var i = 1; i <= this.settings['lines']; i++) {
            for (var j = 1; j <= this.settings['columns']; j++) {
                v = this.game.field[i][j];
                if (v != -1 && v != -2 && v != -101)
                    return;
            }
        }

        /* affiche la victoire si c'est le cas */
        this.displayWin();
    }, 
    
    
    displayWin: function() {
        /* affiche le résultat */
        document.getElementById('result').innerHTML = 'Gagnée;';
        document.getElementById('result').style.color = '#43b456';

        /* fin de partie */
        this.game.status = 0;
    },

    displayLose: function() {
        /* affiche le résultat */ 
        document.getElementById('result').innerHTML = 'Perdu';
        document.getElementById('result').style.color = '#CC3333';

        /* fin de partie */
        this.game.status = 0;
    },
};



