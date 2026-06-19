/* =========================
   AI ENGINE V1
========================= */

function aiMove(){

    if(gameOver) return;

    switch(gameMode){

        case "easy":
            easyAI();
            break;

        case "medium":
            mediumAI();
            break;

        case "hard":
            hardAI();
            break;

        case "boss":
            bossAI();
            break;

    }

}

/* =========================
   EASY
========================= */

function easyAI(){

    const moves =
    getLegalMoves(
        game.p2,
        game.p1
    );

    if(moves.length === 0) return;

    const randomMove =
    moves[
        Math.floor(
            Math.random() *
            moves.length
        )
    ];

    game.p2.x =
    randomMove.x;

    game.p2.y =
    randomMove.y;

    finishAITurn();

}

/* =========================
   MEDIUM
========================= */

function mediumAI(){

    const moves =
    getLegalMoves(
        game.p2,
        game.p1
    );

    let bestMove =
    moves[0];

    let bestScore =
    -999999;

    moves.forEach(move => {

        const score =
        move.y * 10;

        if(score > bestScore){

            bestScore =
            score;

            bestMove =
            move;

        }

    });

    game.p2.x =
    bestMove.x;

    game.p2.y =
    bestMove.y;

    finishAITurn();

}

/* =========================
   HARD
========================= */

function hardAI(){

    const moves =
    getLegalMoves(
        game.p2,
        game.p1
    );

    let bestMove =
    moves[0];

    let bestScore =
    -999999;

    moves.forEach(move => {

        let score = 0;

        score += move.y * 100;

        const distanceToGoal =
        8 - move.y;

        score -=
        distanceToGoal * 20;

        const playerDistance =
        game.p1.y;

        score +=
        playerDistance * 5;

        if(score > bestScore){

            bestScore =
            score;

            bestMove =
            move;

        }

    });

    game.p2.x =
    bestMove.x;

    game.p2.y =
    bestMove.y;

    finishAITurn();

}

/* =========================
   EXTRA SCARY BOSS
========================= */

function bossAI(){

    const moves =
    getLegalMoves(
        game.p2,
        game.p1
    );

    let bestMove =
    moves[0];

    let bestScore =
    -999999999;

    moves.forEach(move => {

        let score = 0;

        score += move.y * 1000;

        const aiDistance =
        8 - move.y;

        const playerDistance =
        game.p1.y;

        score -=
        aiDistance * 100;

        score +=
        playerDistance * 75;

        const centerBonus =
        4 - Math.abs(
            move.x - 4
        );

        score +=
        centerBonus * 25;

        if(score > bestScore){

            bestScore =
            score;

            bestMove =
            move;

        }

    });

    game.p2.x =
    bestMove.x;

    game.p2.y =
    bestMove.y;

    finishAITurn();

}

/* =========================
   END TURN
========================= */

function finishAITurn(){

    checkWin();

    if(gameOver){

        draw();

        return;
    }

    currentPlayer = 1;

    updateUI();

    draw();

}
