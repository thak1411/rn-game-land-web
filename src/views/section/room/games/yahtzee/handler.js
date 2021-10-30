const scoreList = [
    {key:  1, label1: 'game.yahtzee.dice1', label2: 'game.yahtzee.sdice1'},
    {key:  2, label1: 'game.yahtzee.dice2', label2: 'game.yahtzee.sdice2'},
    {key:  3, label1: 'game.yahtzee.dice3', label2: 'game.yahtzee.sdice3'},
    {key:  4, label1: 'game.yahtzee.dice4', label2: 'game.yahtzee.sdice4'},
    {key:  5, label1: 'game.yahtzee.dice5', label2: 'game.yahtzee.sdice5'},
    {key:  6, label1: 'game.yahtzee.dice6', label2: 'game.yahtzee.sdice6'},
    {key:  7, label1: 'game.yahtzee.bonus', label2: 'game.yahtzee.sbonus'},
    {key:  8, label1: '', label2: ''},
    {key:  9, label1: 'game.yahtzee.three', label2: 'game.yahtzee.sthree'},
    {key: 10, label1: 'game.yahtzee.four', label2: 'game.yahtzee.sfour'},
    {key: 11, label1: 'game.yahtzee.full', label2: 'game.yahtzee.sfull'},
    {key: 12, label1: 'game.yahtzee.small', label2: 'game.yahtzee.ssmall'},
    {key: 13, label1: 'game.yahtzee.large', label2: 'game.yahtzee.slarge'},
    {key: 14, label1: 'game.yahtzee.yahtzee', label2: 'game.yahtzee.syahtzee'},
    {key: 15, label1: 'game.yahtzee.chance', label2: 'game.yahtzee.schance'},
]

function calcScore(dice, key) {
    if (dice.length < 1) return -1;
    let table = {}, vlist = [], sm = 0, sc1 = 1, sc2 = 1, sc3 = 1;
    for (let i = dice.length; i--; ) {
        if (table[dice[i]]) ++table[dice[i]];
        else table[dice[i]] = 1;
        sm += dice[i];
    }
    for (let i of Object.keys(table)) {
        vlist.push(table[i]);
    }
    vlist.sort((i, j) => i - j);

    if (key >= 1 && key <= 6) {
        return dice.filter(d => d == key).length * key
    } else {
        switch (key) {
        case 9:
            if (vlist[vlist.length - 1] >= 3) return sm;
            return 0;
        case 10:
            if (vlist[vlist.length - 1] >= 4) return sm;
            return 0;
        case 11:
            if (vlist.length == 2 && vlist[0] == 2 && vlist[1] == 3) return 25;
            return 0;
        case 12:
            for (let i = 4; i--; ) {
                sc1 *= table[i] ? table[i] : 0;
                sc2 *= table[i + 1] ? table[i + 1] : 0;
                sc3 *= table[i + 2] ? table[i + 2] : 0;
            }
            if (sc1 > 0 || sc2 > 0 || sc3 > 0) return 30;
            return 0;
        case 13:
            for (let i = 5; i--; ) {
                sc1 *= table[i] ? table[i] : 0;
                sc2 *= table[i + 1] ? table[i + 1] : 0;
            }
            if (sc1 > 0 || sc2 > 0) return 40;
            return 0;
        case 14:
            if (vlist.length == 1 && vlist[0] == 5) return 50;
            return 0;
        case 15:
            return sm;
        }
    }
}

export default {
    scoreList,
    calcScore,
}