 
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
export default getValidMove
