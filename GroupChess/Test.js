
/*
 This program plays a chess variant with new pieces and a new ruleset which is akin to that of Counter-Strike.
 Copyright (C) 2016  Aidan Globus, Adrean Ames, Michael Trunk

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//move is string in form "original-new"
//for example move = "A2-A4" would call for the A2 pawn to move up to A4

var debug = false;



var FEN_ClassicStart = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

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

var turn = 'W';

var WHITE_QUEEN_CASTLE = true;
var WHITE_KING_CASTLE = true;
var BLACK_QUEEN_CASTLE = true;
var BLACK_KING_CASTLE = true;

//variables for piece notations
var l = "LB"; var L = "LW"; //Berolina pawn - inverted pawn; moves diagonal and captures forward
var p = "PB"; var P = "PW"; //Classic pawn - the pawn we know and hate
var f = "FB"; var F = "FW"; //Ferz - moves one space diagonally in any direction
var u = "UB"; var U = "UW"; //Guard - moves and captures forward orthogonally and diagonally - powerful
var h = "HB"; var H = "HW"; //Half pawn - moves and captures forward
var w = "WB"; var W = "WW"; //Wazir - moves one space orthogonally
var k = "KB"; var K = "KW"; //king - the white king will not be checkmateable

var a = "AB"; var a = "AW"; //Alfil - moves two and only two spaces diagonally
var s = "SB"; var S = "SW"; //Alibaba - moves strictly two spaces diagonally or strictly two spaces vertically
var c = "CB"; var C = "CW"; //Camel - extended knight, moves in a (1,3) pattern
var d = "DB"; var D = "DW"; //Dababa - moves strictly two spaces orthogonally
var g = "GB"; var G = "GW"; //Giraffe - extended knight, moves in a (3,4) pattern
var n = "NB"; var N = "NW"; //Knight - as long as you have a knight, never give up
var z = "ZB"; var Z = "ZW"; //Zebra - extended knight, moves in a (2,3) pattern

var b = "BB"; var B = "BW"; //Bishop - the sniper on the board
var t = "TB"; var T = "TW"; //Cardinal - moves like a bishop or a knight
var e = "EB"; var E = "EW"; //Chancellor - moves likea rook or knight
var q = "QB"; var Q = "QW"; //Queen - she is a lady
var r = "RB"; var R = "RW"; //Rook - the king's trusty bastion
var y = "YB"; var Y = "YW"; //Royal rook - moves like a rook or a king

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
    var sFENraw = "";
    for (i = 0; i < FEN.length; i++)
    {
        if (FEN.charAt(i) == " ")
            break;
        if (!isNaN(parseInt(FEN.charAt(i))))
        {
            sFENraw += replaceNumbers(parseInt(FEN.charAt(i)));
        }
        else
        {
            sFENraw += FEN.charAt(i);
        }
    }

    //next just plainly convert board data into a two-dimensional array. We'll replace the substrings at the same time
    var sFENprocessMe = sFENraw;
    var newBoard = [[],[],[],[],[],[],[],[]];
    var index = 0;
    var kndex;
    while (index<8 && sFENprocessMe.charAt(0) != " ") //increment through ranks
    {
        kndex = 0;
        while (sFENprocessMe.charAt(0) != "/" && kndex<8) //increment through files
        {
            newBoard[index][kndex] = replaceNotation(sFENprocessMe.charAt(0));
            sFENprocessMe = sFENprocessMe.substring(1);
            kndex++;
        }
        if (sFENprocessMe.length != 0)
        {
            sFENprocessMe = sFENprocessMe.substring(1);

        }
        index++;
    }

    //finally apply the newBoard to the current board
    board = newBoard;

    //@debug - display the 2D board array
    if (debug = true)
    {
        for (j = 0; j<8; j++)
        {
            for (i=0; i<8; i++)
            {
                console.log(newBoard[j, i]);
                console.log(" ");
            }
            console.log("\n");
        }
    }

    //replaces a one-character number string with its number of the character "1"
    function replaceNumbers(sNumber)
    {
        var iNumber = parseInt(sNumber);
        var sNewNumber = "";
        for (jndex = 0; jndex<iNumber; jndex++)
        {
            sNewNumber += "1";
        }
        return sNewNumber;
    }

    var i = 0;

    //given th FEN notation, returns our notation as a string. The string variables are defined at the top of this .js
    function replaceNotation(cNotation)
    {
        switch(cNotation)
        {
            case 'a': return a;
            case 'b': return b;
            case 'c': return c;
            case 'd': return d;
            case 'e': return e;
            case 'f': return f;
            case 'g': return g;
            case 'h': return h;

            case 'k': return k;
            case 'l': return l;
            case 'n': return n;

            case 'p': return p;
            case 'q': return q;
            case 'r': return r;
            case 's': return s;
            case 't': return t;
            case 'u': return u;

            case 'w': return w;

            case 'y': return y;
            case 'z': return z;

            case 'A': return A;
            case 'B': return B;
            case 'C': return C;
            case 'D': return D;
            case 'E': return E;
            case 'F': return F;
            case 'G': return G;
            case 'H': return H;

            case 'K': return K;
            case 'L': return L;
            case 'N': return N;

            case 'P': return P;
            case 'Q': return Q;
            case 'R': return R;
            case 'S': return S;
            case 'T': return T;
            case 'U': return U;

            case 'W': return W;

            case 'Y': return Y;
            case 'Z': return Z;
            default: return "";
        }
    }
}

//resets castling rules, puts all pieces in starting position
function resetBoard(){

    importFEN()

    WHITE_QUEEN_CASTLE = true;
    WHITE_KING_CASTLE = true;
    BLACK_QUEEN_CASTLE = true;
    BLACK_KING_CASTLE = true;

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
            var move = loc+"-"+String.fromCharCode(j+65)+(8-i);
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
}}