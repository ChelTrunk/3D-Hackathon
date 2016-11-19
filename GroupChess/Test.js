//move is string in form "original-new"
//for example move = "A2-A4" would call for the A2 pawn to move up to A4
var turn = 'W';
var initialBoard;
var standardBoard = [["RB","NB", "BB", "QB", "KB", "BB", "NB", "RB"],
    ["PB","PB", "PB", "PB", "PB", "PB", "PB", "PB"],
    ["","", "", "", "", "", "", ""],
    ["","", "", "", "", "", "", ""],
    ["","", "", "", "", "", "", ""],
    ["","", "", "", "", "", "", ""],
    ["PW","PW", "PW", "PW", "PW", "PW", "PW", "PW"],
    ["RB","NW", "BW", "QW", "KW", "BW", "NW", "RW"]];
var board;

var WHITE_QUEEN_CASTLE = true;
var WHITE_KING_CASTLE = true;
var BLACK_QUEEN_CASTLE = true;
var BLACK_KING_CASTLE = true;

var l = "LB";
var p = "PB";
var f = "FB";
var l = "LB";
var u = "UB";
var h = "HB";
var w = "WB";
var k = "KB";

var a = "AB";
var s = "SB";
var c = "CB";
var d = "DB";
var g = "GB";
var n = "NB";
var z = "ZB";

var b = "BB";
var t = "TB";
var e = "EB";
var q = "QB";
var r = "RB";

//prereq loc in form "A1"
function getPieceAt(loc){
    var bloc = convertNotation(loc);
    return(board[bloc[0]][bloc[1]]);
}

//prereq loc is string in form "A1",
//returns 2 element 1d array such that board[array[0]][array[1]] will be board location of input
function convertNotation(loc){
    //returns coordinate location on board
    var col = loc.substring(0,1);
    var row = loc.substring(1);
    var numCol;
    var numRow=8-parseInt(row);
    if(col=="A"){
        numCol=0;
    }else if(col=="B"){
        numCol=1;
    }else if(col=="C"){
        numCol=2;
    }else if(col=="D"){
        numCol=3;
    }else if(col=="E"){
        numCol=4;
    }else if(col=="F"){
        numCol=5;
    }else if(col=="G"){
        numCol=6;
    }else{
        numCol=7;
    }
    return [numRow,numCol]
}

//converts board FEN to one of our format and then applies it to the current board
function importBoard(FEN)
{
    //FEN starting position: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
    //black is lowercase, white is uppercase

    //first replace numbers with 1s
    var sFENlong;
    for (i = 0; i < FEN.length; i++)
    {
        if (!isNaN(sFEN.substring(i, i+1)))
        {
            sFENlong += replaceNumbers(parseInt(sFen.substring(i, i+1)));
        }
        else
        {
            sFENlong += sFEN.substring(i, i+1);
        }
    }

    //next just plainly convert it into a two-dimensional array. We'll replace the substrings later



    //replaces a one-character number string with its number of the character "1"
    var replaceNumbers = function(sNumber)
    {
        var iNumber = parseInt(sNumber);
        var sNewNumber = "";
        for (i = 0; i<iNumber; i++)
        {
            sNewNumber += "1";
        }
    }

    function replaceNotation(cNotation)
    {
        switch(cNotation)
        {

        }
    }
}

//resets castling rules, puts all pieces in starting position
function resetBoard(){

}

//type is a 2d array of 8x8 elements, see var stardardBoard for reference
function createBoard(type){
    //sets global variable board to specific board setup
    //void return

}

//replaces destination coordinate with piece at origin and clears origin
function updateBoard(move){
    var origin=convertNotation(move.substring(0,2));
    var destination = convertNation(move.substring(2));
    var piece = getPieceAt(origin);
    board[origin[0]][origin[1]]="";
    board[destination[0]][destination[1]]=piece;
}

//given a location, returns a two dimensional bitfield of everywhere the piece could move
function generateMoves(loc){
    //given a move, returns true if it is valid and false otherwise. Checks for checks, out-of-bounds, and blocking
    function isValidMove(move){
        //return boolean
        function isValidSquare(loc){
            //return boolean
        }
    }
    var piece = getPieceAt(loc);
    var moves =[[],[],[],[],[],[],[],[]];
    for(i=0;i<8;i++){
        for(j=0;j<8;j++){
            var move = loc+"-"+String.fromCharCode(j+65)+(8-i)
            if(isValid(move)){
                moves[i][j]=true;
            }else{
                moves[i][j]=false;
            }
        }
    }
    return moves;

}


//prereq valid move
function move(move){
    //indicates square as enpassantable
    //updates castling ability after move
    //calls updateBoard
}

function causesCheck(move){
    //return 0 for no, -1 for puts white in check, 1 for puts black in check

}

function endOfTurn(){
    //removes en passant of opposite color
    //check for checkmate
    //ends game if checkmate else passes turn to other color
}

//inserts a string at the specified index
function insertString(origString, inString, index)
{
    string1 = origString.substring(0,index);
    string2 = origString.substring(index);
    return string1 + inString + string2;
}