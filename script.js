const BOXES = $("#box-wrapper button"); 

const WIN_POSSIBILITIES = [
  [1,2,3], [4,5,6], [7,8,9],
  [1,4,7], [2,5,8], [3,6,9],
  [1,5,9], [3,5,7]
];
let turn = 1;
let winner = "None";
let [score_x, score_o, draws] = [0,0,0];


// initialize the click action listener for buttons and disable until user starts
for(let i = 0; i < 9; i++)
  BOXES[i].addEventListener("click", () => playClick(BOXES[i]))

disableAllBtn();


function playClick(btn){
  btn.textContent = turn % 2 === 1 ? "x" : "o";
  disableBtn(btn);
  evalWin();
  evalDraw();
  
  turn++;
  renderPlayerTurn();
}


function evalWin(){
  const len = WIN_POSSIBILITIES.length;

  for(let i = 0; i < len; i++){
    const game_over = checkFullRow(WIN_POSSIBILITIES[i], "x") || checkFullRow(WIN_POSSIBILITIES[i], 'o');

    if(game_over){
      disableAllBtn();

      if(turn%2 === 1){
        winner = "x";
        ++score_x;
        renderScore("player-x", score_x);
      }else{
        winner = "o";
        ++score_o;
        renderScore("player-o", score_o);
      }
      renderWinner();
      return;
    }
  }
}

function evalDraw(){
  for (let i = 0; i < 9; i++) {
    if(!BOXES[i].textContent)
      return false;
  }
  winner = "Draw";
  renderWinner();
  ++draws;
  renderScore("draws", draws);

  return true;
}


function checkFullRow(row, symbol) {
  return (
    BOXES[row[0]-1].textContent === symbol && 
    BOXES[row[1]-1].textContent === symbol && 
    BOXES[row[2]-1].textContent === symbol
  );
}



function disableAllBtn(){
  for(let i = 0; i < 9; i++)
    disableBtn(BOXES[i]);
}


function disableBtn(btn) {
  btn.setAttribute("disabled", "");
}


function enableBtn(btn){
  btn.removeAttribute("disabled");
}

function renderWinner(){
  $("#winner").text(winner);
}


function renderPlayerTurn(){
  $("#turn").text(turn % 2 === 1 ? "x" : "o");
}


function renderScore(player_id, score){
  $(`#${player_id}`).text(score);
}


function newRound(){
  for (let i = 0; i < 9; i++) {
    enableBtn(BOXES[i]);
    BOXES[i].textContent = "";
  }
}


function startGame(){
  newRound();
  score_o = score_x = 0;
  winner = "None";
  turn = (turn % 2 === 1) ? 1 : 2;

  $("#startBtn").text("Restart");
  renderWinner();
  enableBtn(document.querySelector("#newRound"));
  renderScore("player-o", score_o);
  renderScore("player-x", score_x);
}


function startCountdown(){

}