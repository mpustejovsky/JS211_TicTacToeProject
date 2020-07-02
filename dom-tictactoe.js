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
let score = [0,0];
let currentMarker = 'X'
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
  if(!document.getElementById(element.id).innerHTML){
    addMarker(element.id)
    updateBoard(element.id)
    checkForWin()
  }
}

const addMarker = (id) => {
  console.log(`We'll place a mark on square: ${id}`)
  
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
     
    }
    if (currentMarker=='O'){
      score[1]++;
      //added setTimeout(s) to slow down if you win to allow board to populate
      setTimeout (function(){window.alert(`Congrats ${playerO}, you won with 0s!`);},100);
      setTimeout (function(){resetBoard();},2000);
    }

    
  } else {
    // if no win, change the marker from X to O, or O to X for the next player.
    changeMarker()
  }
  document.getElementById("score").innerHTML = playerX + ' '  + score[0] + " to " + playerO + ' ' + score[1] 
  
  if (currentMarker == 'X'){document.getElementById("turn").innerHTML = playerX +"'s" + " turn";}
  if (currentMarker == 'O'){document.getElementById("turn").innerHTML = playerO +"'s" + " turn";}
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

const resetBoard2 = () => {
  score =  [0,0];
  document.getElementById("score").innerHTML = playerX + ' '  + score[0] + " to " + playerO + ' ' + score[1] ;
  resetBoard();
 
}

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
}

// **BONUSES**

// 1. Display the current player's turn
// 2. Count number of wins for each player and display them
// 3. Reset the number of wins
// 4. Clear the board on alert window dismissal
// 5. Add players names and display who wins, i.e. "Congrats Emily, you won with 0s!"