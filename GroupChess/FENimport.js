//move is string in form "original-new"
//for example move = "A2-A4" would call for the A2 bishop to move up to to A4

var FEN =  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

importBoard(FEN)

function importBoard(FEN)
{
    //FEN starting position: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
    //black is lowercase, white is uppercase

    //first replace numbers with 1s
    var sFENlong = "";
    for (i = 0; i < FEN.length; i++)
    {
        if (!isNaN(parseInt(FEN.charAt(i))))
        {
            sFENlong += replaceNumbers(parseInt(FEN.charAt(i)));
        }
        else
        {
            sFENlong += FEN.charAt(i);
        }
    }

    //next just plainly convert board data into a two-dimensional array. We'll replace the substrings later
    var sFENprocessMe = sFENlong;
    var newBoard = [[],[],[],[],[],[],[],[]];
    var index = 0;
    while (index<sFENlong.length && sFENprocessMe.charAt(0) != " ") //increment through ranks
    {
        var j = 0;
        while (sFENprocessMe.charAt(0) != '//') //increment through files
        {
            newBoard[index,j] = replaceNotation(sFENprocessMe.charAt(0));
            sFENprocessMe = sFENprocessMe.substring(1);
            j++;
        }
        if (sFENprocessMe.length != 0)
        {
            sFENprocessMe = sFENprocessMe.substring(1);

        }
        index++;
    }

    for (j = 0; j<8; j++)
    {
        for (i=0; i<8; i++)
        {
            console.log(newBoard[j, i]);
            console.log(" ");
        }
        console.log("\n");
    }

    //replaces a one-character number string with its number of the character "1"
    function replaceNumbers(sNumber)
    {
        var iNumber = parseInt(sNumber);
        var sNewNumber = "";
        for (i = 0; i<iNumber; i++)
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
