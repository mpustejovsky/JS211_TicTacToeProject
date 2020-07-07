//       ***********************
//            INSTRUCTIONS
//       ***********************

// 1. Read the code below and figure out the data flow
// 2. Add in your code from the terminal app (check for win logic)
// 3. Look for the @TODO, to fix
// next to each @TODO you will find tasks that need to be finished
// 4. GET THIS GAME WORKING!!
let player0 = 'PlayerO';
let playerX = 'PlayerX';
let score = [0,0,0];
let currentMarker = 'X'
let playerMoves=0;
let board = [
  ['','',''],
  ['','',''],
  ['','','']
];

if (currentMarker == 'X'){document.getElementById("turn").innerHTML = playerX +"'s" + " turn";}
if (currentMarker == 'O'){document.getElementById("turn").innerHTML = playerO +"'s" + " turn";}

// is called when a square is clicked. "this" = element here
const handleClick = (element) => {
  // check to see if the square clicked has anything in it, if not continue
  // this prevents an X being changed to an O
  
  addScore(element.id);
  if(!document.getElementById(element.id).innerHTML){
    addMarker(element.id)
    updateBoard(element.id)
    checkForWin()
  }
}

const addMarker = (id) => {
  console.log(`We'll place a mark on square: ${id}`)
  playerMoves++;
  
  document.getElementById(id).innerHTML = currentMarker;



//delay to allow marker to populate

 
}

// passes the element's id attribute from HTML to be used
const updateBoard = (id) => {
  //save names of entered
  playerX = document.getElementById("plyX").value;
  playerO = document.getElementById("plyO").value;
  if (playerX == ""){playerX="PlayerX"}
  if (playerO == ""){playerO="PlayerO"}

  // parses the id string into a number then captures the first and last part the newly create number as row & column
  const row = parseInt(id.charAt(0))
  const column = parseInt(id.charAt(2)) 

  console.log(`you clicked the sq at ${row} and ${column}`)
  board[row][column]=currentMarker;
  console.log(board)

  // @TODO, Your code here: use the above information to change the board variable(array of arrays)
  // HINT: in your browser open up the dev tools -> console
}

const checkForWin = () => {
  // calls each checkForWin possibility and if any are true gives a page alert,
  if(horizontalWin() || verticalWin() || diagonalWin()) {
    // **BONUS** you could make the dismissal of this alert window reset the board...
    if (currentMarker=='X'){
      score[0]++;
      //added setTimeout(s) to slow down if you win to allow board to populate
       setTimeout (function(){window.alert(`Congrats ${playerX}, you won with Xs!`);},100);
       setTimeout (function(){resetBoard();},2000);
       setTimeout (function(){changeMarker();},2100);
       if (computerModeTracker){
        setTimeout (function(){computerMove();},2200);
       }
    }
   else if (currentMarker=='O'){
      score[1]++;
      //added setTimeout(s) to slow down if you win to allow board to populate
      setTimeout (function(){window.alert(`Congrats ${playerO}, you won with 0s!`);},100);
      setTimeout (function(){resetBoard();},2000);
      changeMarker()
    } 
    else console.log ("no win")

    
  } else {
    // if no win, change the marker from X to O, or O to X for the next player.
    if (playerMoves==9){  
      setTimeout (function(){window.alert(`Tie Game`);},100);
       setTimeout (function(){resetBoard();},2000);
       score[2]++}
    else changeMarker()
  }
  document.getElementById("score").innerHTML = playerX + ' '  + score[0] + " to " + playerO + ' ' + score[1] + " with " + score[2] + " ties!"
  
  if (currentMarker == 'X'){document.getElementById("turn").innerHTML = playerX +"'s" + " turn";}
  if (currentMarker == 'O')
      {document.getElementById("turn").innerHTML = playerO +"'s" + " turn";
       if(computerModeTracker){computerMove()}
     }
}

const horizontalWin = () => {
  for (let i=0; i<3; i++)
  { console.log (i)
    if (board[i][0]==board[i][1]&& board[i][0]==board[i][2]){
      console.log (board[i][0])
    if(board[i][0]=='X' || board[i][0]=='O'){

  return true;}}
  
  }
  return false;
}

const verticalWin = () => {
  // @TODO, Your code here: to check for vertical wins
  for (let i=0; i<3; i++)
  { if (board[0][i]==board[1][i]&& board[0][i]==board[2][i]){
    if(board[0][i]=='X' || board[0][i]=='O'){
 
  return true;}}
 
  }
  return false;
}

const diagonalWin = () => {
  // @TODO, Your code here: to check for diagonal wins
  if (board[0][0]==board[1][1]&& board[0][0]==board[2][2]){
    if(board[0][0]=='X' || board[0][0]=='O'){
    return true;}}
  if (board[0][2]==board[1][1]&& board[0][2]==board[2][0]){
      if(board[0][2]=='X' || board[0][2]=='O'){
      return true;}}
    return false;
}

const changeMarker = () => {
  // ternary operator: if it's an X make it an O, if O make it an X
  currentMarker = currentMarker === "X" ? "O" : "X"
 
  
}

//resetBoard2 clears score and board

const resetBoard2 = () => {
  score =  [0,0,0];
  document.getElementById("score").innerHTML = playerX + ' '  + score[0] + " to " + playerO + ' ' + score[1] + " with " + score[2] + " ties!" ;
  resetBoard();
 
}

//resetBoard does not clear the board

const resetBoard = () => {
  // sanity check: this tells us the function is being called
  console.log("the board was cleared!")

  // collects all of the "td"s into an HTML Collection: https://www.w3schools.com/jsref/dom_obj_htmlcollection.asp  
  const squares = document.getElementsByTagName("TD")
  
  // loops over the HTML Collections and clears out the Xs and Os
  for (i=0; i<squares.length; i++) {
    console.log(squares[i])
    squares[i].innerHTML = null
  }
  
  // @TODO, Your code here: make sure to reset the array of arrays to empty for a new game
  board = [
    ['','',''],
    ['','',''],
    ['','','']
  ];
  playerOScore=0;
  playerXScore=0;
  playerMoves=0;
}

// **BONUSES**

// 1. Display the current player's turn
// 2. Count number of wins for each player and display them
// 3. Reset the number of wins
// 4. Clear the board on alert window dismissal
// 5. Add players names and display who wins, i.e. "Congrats Emily, you won with 0s!"

////////////////////////computermode below
let computerModeTracker = 0;
let playerXScore=0;
let playerOScore=0;

const computerMode = () => {
  resetBoard();

  //the first if/else determines which view the button will be and what mode to switch to
        if (computerModeTracker == 0){
        document.getElementById("name2").style.display = "none";
        document.getElementById("computerButt").innerHTML="Click for 2 Player"
        computerModeTracker=1;
        player0 = 'Computer';
        document.getElementById("plyO").value = "Computer";
      } 
      else {
        document.getElementById("name2").style.display = "Block";
        document.getElementById("computerButt").innerHTML="Click To Play Computer"
        computerModeTracker=0;        
      }  }


// computerMove function is called if the computerModeTracker is set and the currentMarker is O.

const computerMove = () => {
  let computerSpace='0-1'

  // smart win senerios are done first, to see if a win is possible on this move
  if ((countTotal(2,0,1,playerOScore) || countTotal(2,5,8,playerOScore )|| countTotal(2,4,6,playerOScore )) && checkBoard('0-2')){computerSpace='0-2'}
  else if ((countTotal(6,0,3,playerOScore) || countTotal(6,7,8,playerOScore )|| countTotal(6,4,2,playerOScore ) ) && checkBoard('2-0')){computerSpace='2-0'}
  else if ((countTotal(8,6,7,playerOScore) || countTotal(8,2,5,playerOScore )|| countTotal(8,0,4,playerOScore ) ) && checkBoard('2-2')){computerSpace='2-2'}
  else if ((countTotal(3,4,5,playerOScore) || countTotal(3,0,6,playerOScore )) && checkBoard('1-0')){computerSpace='1-0'}
  else if ((countTotal(5,2,8,playerOScore) || countTotal(5,3,4,playerOScore )) && checkBoard('1-2')){computerSpace='1-2'}
  else if ((countTotal(0,1,2,playerOScore) || countTotal(0,3,6,playerOScore )|| countTotal(0,4,8,playerOScore )) && checkBoard('0-0')){computerSpace='0-0'}
  else if ((countTotal(1,0,3,playerOScore) || countTotal(1,4,7,playerOScore ))&& checkBoard('0-1')){computerSpace='0-1'}
  else if ((countTotal(7,6,8,playerOScore) || countTotal(7,1,4,playerOScore )) && checkBoard('2-1')){computerSpace='2-1'}
  else if ((countTotal(4,1,7,playerOScore) || countTotal(4,3,5,playerOScore )) && checkBoard('1-1')){computerSpace='1-1'}
  // smart block senerios are checked if win is not possible on this move
  else if ((countTotal(2,0,1,playerXScore) || countTotal(2,5,8,playerXScore )|| countTotal(2,4,6,playerXScore )) && checkBoard('0-2')){computerSpace='0-2'}
  else if ((countTotal(6,0,3,playerXScore) || countTotal(6,7,8,playerXScore )|| countTotal(6,4,2,playerXScore ) ) && checkBoard('2-0')){computerSpace='2-0'}
  else if ((countTotal(8,6,7,playerXScore) || countTotal(8,2,5,playerXScore )|| countTotal(8,0,4,playerXScore ) ) && checkBoard('2-2')){computerSpace='2-2'}
  else if ((countTotal(3,4,5,playerXScore) || countTotal(3,0,6,playerXScore )) && checkBoard('1-0')){computerSpace='1-0'}
  else if ((countTotal(5,2,8,playerXScore) || countTotal(5,3,4,playerXScore )) && checkBoard('1-2')){computerSpace='1-2'}
  else if ((countTotal(0,1,2,playerXScore) || countTotal(0,3,6,playerXScore )|| countTotal(0,4,8,playerXScore )) && checkBoard('0-0')){computerSpace='0-0'}
  else if ((countTotal(1,0,3,playerXScore) || countTotal(1,4,7,playerXScore ))&& checkBoard('0-1')){computerSpace='0-1'}
  else if ((countTotal(7,6,8,playerXScore) || countTotal(7,1,4,playerXScore )) && checkBoard('2-1')){computerSpace='2-1'}
  else if ((countTotal(4,1,7,playerXScore) || countTotal(4,3,5,playerXScore )) && checkBoard('1-1')){computerSpace='1-1'}
  
  
  // if no smart wins or blocks are detected the else will pick the first available space on the board this logic covers all possible moves if there are any code errors
  else{
  if (checkBoard('1-1')){computerSpace='1-1'}
  else if (checkBoard('0-1')){computerSpace='0-1'}
  else if (checkBoard('0-2')){computerSpace='0-2'}
  else if (checkBoard('1-0')){computerSpace='1-0'}  
  else if (checkBoard('0-0')){computerSpace='0-0'}
  else if (checkBoard('1-2')){computerSpace='1-2'}
  else if (checkBoard('2-0')){computerSpace='2-0'}
  else if (checkBoard('2-1')){computerSpace='2-1'}
  else if (checkBoard('2-2')){computerSpace='2-2'}
    }

  addScore(computerSpace)
  addMarker(computerSpace)
  updateBoard(computerSpace)
  checkForWin();
  
}

const addScore =(id)=> {
  if (currentMarker=='X'){
    if (id == '0-0'){playerXScore=playerXScore+1}
    else if (id == '0-1'){playerXScore=playerXScore+2}
    else if (id == '0-2'){playerXScore=playerXScore+4}
    else if (id == '1-0'){playerXScore=playerXScore+8}
    else if (id == '1-1'){playerXScore=playerXScore+16}
    else if (id == '1-2'){playerXScore=playerXScore+32}
    else if (id == '2-0'){playerXScore=playerXScore+64}
    else if (id == '2-1'){playerXScore=playerXScore+128}
    else if (id == '2-2'){playerXScore=playerXScore+256}
    else console.log ("Must be PRoblem")
    console.log ("PlayerX Score = " + playerXScore)
  }
  if (currentMarker=='O'){
    if (id == '0-0'){playerOScore=playerOScore+1}
    else if (id == '0-1'){playerOScore=playerOScore+2}
    else if (id == '0-2'){playerOScore=playerOScore+4}
    else if (id == '1-0'){playerOScore=playerOScore+8}
    else if (id == '1-1'){playerOScore=playerOScore+16}
    else if (id == '1-2'){playerOScore=playerOScore+32}
    else if (id == '2-0'){playerOScore=playerOScore+64}
    else if (id == '2-1'){playerOScore=playerOScore+128}
    else if (id == '2-2'){playerOScore=playerOScore+256}
    else console.log ("Must be PRoblem")
    console.log ("PlayerO Score = " + playerOScore)
  }


}

//determine smart computer placement
const arryWinner=[1,2,4,8,16,32,64,128,256];



const countTotal = (winIndex, test1Index, test2Index,score) =>{
let testTotal=[];
let pushNumber=arryWinner[test1Index]+arryWinner[test2Index];
testTotal.push(pushNumber);
console.log (pushNumber)

for (i=0; i<9; i++)
{ if (i!=winIndex&&i!=test1Index&&i!=test2Index){
   pushNumber = (arryWinner[i]+arryWinner[test1Index]+arryWinner[test2Index])
   testTotal.push(pushNumber)}
}
console.log ("Win Index = " + winIndex)
console.log ("Score== " + score + " " + testTotal)
if (testTotal.includes(score)) return true;
else return false;
}



const checkBoard = (id) =>{

  const row = parseInt(id.charAt(0))
  const column = parseInt(id.charAt(2)) 
  if ((board[row][column]!='X') && (board[row][column]!='O')){return true}
  else return false;
}