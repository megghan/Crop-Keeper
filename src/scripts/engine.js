const state={
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values:{        
        gameVelocity: 1000,
        hitPos: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }

};
// decidi não implementar som no jogo
// function playSong(){
//     let song = new Audio("./src/sfx/CogumeloFeliz.ogg");
//     song.volume = 1;
//     song.play();
// }


function playSFX(){
    let audio = new Audio("./src/sfx/pop.ogg");
    audio.volume = 1;
    audio.play();
}

function countDown(){
    state.values.currentTime--;
state.view.timeLeft.textContent= state.values.currentTime;

    if(state.values.currentTime <= 0){
        //game over
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi:" + state.values.result);
    }
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPos= randomSquare.id;
}


function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPos){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPos = null;
                playSFX();
            }

        });
    });
}

function initialize(){
    addListenerHitBox();
    
}

initialize();
