import React, { useEffect, useState } from "react";
import ShowOption from './showOptionChess';
const initializeBoard = () => {
  return [
    ["rb", "nb", "bb", "qb", "kb", "bb", "nb", "rb"], 
    Array(8).fill("pb"),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill("Pw"),
    ["Rw", "Nw", "Bw", "Qw", "Kw", "Bw", "Nw", "Rw"], 
  ];
};

const getChessSymbol = (piece) => {
  const symbols  = {
    P: "♙", // White Pawn
    R: "♖", // White Rook
    N: "♘", // White Knight
    B: "♗", // White Bishop
    Q: "♕", // White Queen
    K: "♔", // White King
    p: "♙",  
    r: "♜", // Black Rook
    n: "♞", // Black Knight
    b: "♝", // Black Bishop
    q: "♛", // Black Queen
    k: "♚", // Black King
  };
  
  return symbols[piece] || "";
};

const ChessGame = () => {
  const [chessBoard, setBoard] = useState(initializeBoard());
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [turn, setTurn] = useState("b");
  const [validMove, setValidMove] = useState([]);
  const [showOptionPawn,setShowOptionPawn]=useState([false,""]);
  const checkIsKingIsSafe=async(fromRow,fromCol,toRow,toCol)=>{
    let kingRow=0,kingCol=0;
     for(let i=0;i<8;i++)
     {
         for(let j=0;j<8;j++)
         {
             if(chessBoard[i][j]!==""&&chessBoard[i][j][1]===turn&&(chessBoard[i][j][0]==="k"||chessBoard[i][j][0]==="K"))
             {
                       kingRow=i;
                       kingCol=j;
             }
         }
     }
     let newBoard=[];
     for(let i=0;i<8;i++)
     {
           newBoard[i]=[...chessBoard[i]]
     }
     
    newBoard[toRow][toCol]=chessBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol]="";
    console.log(newBoard)
     for(let i=0;i<8;i++)
     {
        for(let j=0;j<8;j++)
        {
            if(newBoard[i][j]!==""&&newBoard[i][j][1]!==turn)
            {
                
                let MoveCheck=await getValidMove(i,j,true,newBoard);
                
                for(let k=0;k<MoveCheck.length;k++)
                {
                    if(MoveCheck[k][0]===kingRow&&MoveCheck[k][1]==kingCol)
                    {
                       
                        return false;
                    }
                }
            }
        }
     }
     return true;
}
  const getValidMove =async (row, col,isOnlyMoveData,board) => {
    const Move = []; 
    if (board[row][col][0] === 'q' || board[row][col][0] === 'Q') {
        // Share row
        for (let i = col + 1; i < 8; i++) {
            if (board[row][i] === "") {
                Move.push([row, i]);
            } else {
                if (board[row][i][1] !== board[row][col][1]) {
                    Move.push([row, i]);
                }
                break;
            }
        }
        for (let i = col - 1; i >= 0; i--) {
            if (board[row][i] === "") {
                Move.push([row, i]);
            } else {
                if (board[row][i][1] !== board[row][col][1]) {
                    Move.push([row, i]);
                }
                break;
            }
        }
        for (let i = row + 1; i < 8; i++) {
            if (board[i][col] === "") {
                Move.push([i, col]);
            } else {
                if (board[i][col][1] !== board[row][col][1]) {
                    Move.push([i, col]);
                }
                break;
            }
        }
        for (let i = row - 1; i >= 0; i--) {
            if (board[i][col] === "") {
                Move.push([i, col]);
            } else {
                if (board[i][col][1] !== board[row][col][1]) {
                    Move.push([i, col]);
                }
                break;
            }
        }
        for (let j = col + 1, i = row + 1; i < 8 && j < 8; i++, j++) {
            if (board[i][j] === "") {
                Move.push([i, j]);
            } else {
                if (board[i][j][1] !== board[row][col][1]) {
                    Move.push([i, j]);
                }
                break;
            }
        }
        for (let j = col - 1, i = row + 1; i < 8 && j >= 0; i++, j--) {
            if (board[i][j] === "") {
                Move.push([i, j]);
            } else {
                if (board[i][j][1] !== board[row][col][1]) {
                    Move.push([i, j]);
                }
                break;
            }
        }
        for (let j = col - 1, i = row - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === "") {
                Move.push([i, j]);
            } else {
                if (board[i][j][1] !== board[row][col][1]) {
                    Move.push([i, j]);
                }
                break;
            }
        }
        for (let j = col + 1, i = row - 1; i >= 0 && j < 8; i--, j++) {
            if (board[i][j] === "") {
                Move.push([i, j]);
            } else {
                if (board[i][j][1] !== board[row][col][1]) {
                    Move.push([i, j]);
                }
                break;
            }
        }
    } else {
        if (board[row][col][0] === 'R' || board[row][col][0] === 'r') {
            for (let i = col + 1; i < 8; i++) {
                if (board[row][i] === "") {
                    Move.push([row, i]);
                } else {
                    if (board[row][i][1] !== board[row][col][1]) {
                        Move.push([row, i]);
                    }
                    break;
                }
            }
            for (let i = col - 1; i >= 0; i--) {
                if (board[row][i] === "") {
                    Move.push([row, i]);
                } else {
                    if (board[row][i][1] !== board[row][col][1]) {
                        Move.push([row, i]);
                    }
                    break;
                }
            }
            for (let i = row + 1; i < 8; i++) {
                if (board[i][col] === "") {
                    Move.push([i, col]);
                } else {
                    if (board[i][col][1] !== board[row][col][1]) {
                        Move.push([i, col]);
                    }
                    break;
                }
            }
            for (let i = row - 1; i >= 0; i--) {
                if (board[i][col] === "") {
                    Move.push([i, col]);
                } else {
                    if (board[i][col][1] !== board[row][col][1]) {
                        Move.push([i, col]);
                    }
                    break;
                }
            }
        } else if (board[row][col][0] === 'b' || board[row][col][0] === 'B') {
            for (let j = col + 1, i = row + 1; i < 8 && j < 8; i++, j++) {
                if (board[i][j] === "") {
                    Move.push([i, j]);
                } else {
                    if (board[i][j][1] !== board[row][col][1]) {
                        Move.push([i, j]);
                    }
                    break;
                }
            }
            for (let j = col - 1, i = row + 1; i < 8 && j >= 0; i++, j--) {
                if (board[i][j] === "") {
                    Move.push([i, j]);
                } else {
                    if (board[i][j][1] !== board[row][col][1]) {
                        Move.push([i, j]);
                    }
                    break;
                }
            }
            for (let j = col - 1, i = row - 1; i >= 0 && j >= 0; i--, j--) {
                if (board[i][j] === "") {
                    Move.push([i, j]);
                } else {
                    if (board[i][j][1] !== board[row][col][1]) {
                        Move.push([i, j]);
                    }
                    break;
                }
            }
            for (let j = col + 1, i = row - 1; i >= 0 && j < 8; i--, j++) {
                if (board[i][j] === "") {
                    Move.push([i, j]);
                } else {
                    if (board[i][j][1] !== board[row][col][1]) {
                        Move.push([i, j]);
                    }
                    break;
                }
            }
        } else if (board[row][col][0] === 'n' || board[row][col][0] === 'N') {
            const knightMoves = [
                [1, 2], [-1, 2], [2, 1], [-2, 1],
                [2, -1], [-2, -1], [1, -2], [-1, -2]
            ];
            for (let i = 0; i < knightMoves.length; i++) {
                const r = row + knightMoves[i][0];
                const c = col + knightMoves[i][1];
                if (r >= 0 && c >= 0 && r < 8 && c < 8 && board[row][col][1] !== board[r][c][1]) {
                    Move.push([r, c]);
                }
            }
        } else if (board[row][col][0] === 'p') {
            let cut=0;
            if (row + 1 < 8) {
                if (col - 1 >= 0 &&board[row + 1][col - 1] !== ""&& board[row + 1][col - 1][1] !== board[row][col][1]) {
                    Move.push([row + 1, col - 1]);
                    cut++;
                }
                if (col + 1 < 8 &&board[row + 1][col + 1] !==""&&board[row + 1][col + 1][1] !== board[row][col][1]) {
                    Move.push([row + 1, col + 1]);
                    cut++;
                }
                if (board[row + 1][col] === ""&&cut===0) {
                    Move.push([row + 1, col]);
                }
            }
        } else if (board[row][col][0] === 'P') {
            let cut=0;
            if (row - 1 >= 0) {
                if (col - 1 >= 0 &&board[row - 1][col - 1]!==""&&board[row - 1][col - 1][1] !== board[row][col][1]) {
                    Move.push([row - 1, col - 1]);
                    cut++;
                }
                if (col + 1 < 8 &&board[row - 1][col + 1]!==""&&board[row - 1][col + 1][1] !== board[row][col][1]) {
                    Move.push([row - 1, col + 1]);
                    cut++;
                }
                if (board[row - 1][col] === ""&&cut===0) {
                    Move.push([row - 1, col]);
                }
            }
        }
        else
        {
            if(board[row][col][0]==="k"||board[row][col][0]==="K")
            {
                let kingMove=[[-1,1],[-1,-1],[1,1],[1,-1],[1,0],[-1,0],[0,-1],[0,1]];
                   for(let k=0;k<kingMove.length;k++)
                   {
                          let c=col+kingMove[k][1];
                          let r=row+kingMove[k][0];
                          if (r >= 0 && c >= 0 && r < 8 && c < 8 && board[row][col][1] !== board[r][c][1]) {
                            Move.push([r, c]);
                        }
                   }
            }
        }
    }
    if(isOnlyMoveData)
        return Move;
   
    let newMove=[];
    for(let i=0;i<Move.length;i++)
    {
        if(chessBoard[Move[i][0]][Move[i][1]][0]==="k"||chessBoard[Move[i][0]][Move[i][1]][0]==="K")
            continue;
        if(await checkIsKingIsSafe(Move[i][0],Move[i][1],row,col))
        {
            newMove.push(Move[i]);
        }
    }
    await setValidMove(newMove);
    return;
};
  const handleSelect = (row, col) => {
    let isRightMove = false;
    let newValidMove=[...validMove];
   
    
    for (let i = 0; i < validMove.length; i++) {
      if (validMove[i][0] === row && validMove[i][1] === col) {
        isRightMove = true;
        break;
      }
    }

    if (isRightMove && selectedPiece) {
      
      const newBoard = [...chessBoard];
      newBoard[row][col] = selectedPiece.piece;
      if(newBoard[row][col][0]==="p"&&row===7||newBoard[row][col][0]==="P"&&row===0)
      {
            
             setShowOptionPawn([true,"",row,col,newBoard]);
              
      }
      else{
        const nextTurn = turn === "w" ? "b" : "w";
        setTurn(nextTurn);
      }
      newBoard[selectedPiece.row][selectedPiece.col] = "";
      setBoard(newBoard);

    
     
      
      setSelectedPiece(null);
      setValidMove([]);
    } else {
      if (chessBoard[row][col] !== "" && chessBoard[row][col][1] === turn) {
        setSelectedPiece({ piece: chessBoard[row][col], row, col });
        getValidMove(row, col,false,chessBoard);
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 min-h-screen text-white p-4">
   
    <h1 className="text-3xl font-bold mb-4">Chess Game</h1>
    <div className="flex justify-center space-x-4 mb-6">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Play Online
      </button>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Play Offline
      </button>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Play vs Computer
      </button>
    </div>
  
   
    <div className="grid grid-cols-8 w-96 mx-auto rounded-lg shadow-lg">
      {chessBoard.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isWhiteSquare = (rowIndex + colIndex) % 2 === 0;
          const bgColor = isWhiteSquare ? "bg-pink-200" : "bg-purple-600";
          const pieceSymbol = cell ? getChessSymbol(cell[0]) : "";
          const isValidMove = validMove.some(
            ([validRow, validCol]) => validRow === rowIndex && validCol === colIndex
          );
          const highlight = isValidMove ? "bg-yellow-400" : "";
  
          
          const isPlayerPiece = cell && cell[1] === turn;  
          const isOpponentPiece = cell && cell[1] !== turn; 
  
          
          const pieceColor = isPlayerPiece ? "text-white" : isOpponentPiece ? "text-black" : "";
  
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`h-12 w-12 flex text-4xl items-center justify-center ${bgColor} ${highlight} border-gray-900`}
              onClick={() => handleSelect(rowIndex, colIndex)}
              style={{
                transition: "all 0.3s ease",
                boxShadow: isValidMove ? "0 0 10px 2px rgba(255, 255, 0, 0.7)" : "",
                cursor: "pointer",
              }}
            >
              <span className={pieceColor}>{pieceSymbol}</span>
            </div>
          );
        })
      )}
    </div>
  
    {/* Footer Section */}
    <div className="mt-6">
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setBoard(initializeBoard())}
      >
        Restart Game
      </button>
    </div>
     {showOptionPawn[0] ? <ShowOption  setShowOptionPawn={setShowOptionPawn} showOptionPawn={showOptionPawn} turn={turn} setBoard={setBoard} setTurn={setTurn}/> : null}
  </div>
  
  );
};

export default ChessGame;
