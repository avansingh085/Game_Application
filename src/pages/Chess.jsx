import React, { useEffect, useState,useRef } from "react";
import ShowOption from '../components/showOptionChess';
import io from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GameEndPopup from "../components/GameEndPopup"
import VideoCall from "../components/VideoCall";
import {useSelector} from 'react-redux';
import { getUserID } from "../services/authService";
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
  const [socket,setSocket]=useState(null);
  const [online,setOnline]=useState(false);
  const [onlineTurn,setOnlineTurn]=useState('');
  const [reJoin,setReJoin]=useState(false);
  const audioRef = useRef(null);
  const [gameId,setGameId]=useState(null);
  const [turn, setTurn] = useState("b");
  const [validMove, setValidMove] = useState([]);
  const [showOptionPawn,setShowOptionPawn]=useState([false,""]);
  const [userId,setUserId]=useState(Math.random().toString(36).substring(7));
  const [isMove,setisMove]=useState(0);
  const [checkMate,setCheckMate]=useState(false);
  const [isDraw,setDraw]=useState(false);
  const [boardTheme, setBoardTheme] = useState('classic'); 
  const [gameResult,setGameResult]=useState({type:"",winner:false,drawReason:""});
  useEffect(() => {
    if (selectedPiece) {
      getValidMove(selectedPiece.row, selectedPiece.col, false, chessBoard);
    } else {
      setValidMove([]);
    }
   
  }, [selectedPiece, chessBoard]);
  
 
  const checkIsKingIsSafe = async (fromRow, fromCol, toRow, toCol) => {
    let kingRow = -1, kingCol = -1;
    
    const newBoard = chessBoard.map(row => [...row]);

   
    const movingPiece = chessBoard[fromRow][fromCol];
    newBoard[toRow][toCol] = movingPiece;
    newBoard[fromRow][fromCol] = "";

   
    if (movingPiece[0] === "k" || movingPiece[0] === "K") {
        kingRow = toRow;
        kingCol = toCol;
    } else {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (newBoard[i][j] !== "" && newBoard[i][j][1] === turn &&
                    (newBoard[i][j][0] === "k" || newBoard[i][j][0] === "K")) {
                    kingRow = i;
                    kingCol = j;
                }
            }
        }
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (newBoard[i][j] !== "" && newBoard[i][j][1] !== turn) {
                const validMoves = await getValidMove(i, j, true, newBoard); 
                for (let move of validMoves) {
                    if (move[0] === kingRow && move[1] === kingCol) {
                        return false; 
                    }
                }
            }
        }
    }

    return true; 
};

const getValidMove = async (row, col, isOnlyMoveData, board) => {
    const Move = [];
    const piece = board[row][col];

    
    const addMove = (r, c) => {
        if (r >= 0 && c >= 0 && r < 8 && c < 8) {
            if (board[r][c] === "" || board[r][c][1] !== piece[1]) {
                Move.push([r, c]);
            }
        }
    };

   
    switch (piece[0].toLowerCase()) {
        case "q": 
        case "r": 
            for (let i = col + 1; i < 8; i++) {
                if (board[row][i] === "") addMove(row, i);
                else {
                    addMove(row, i);
                    break;
                }
            }
            for (let i = col - 1; i >= 0; i--) {
                if (board[row][i] === "") addMove(row, i);
                else {
                    addMove(row, i);
                    break;
                }
            }
            for (let i = row + 1; i < 8; i++) {
                if (board[i][col] === "") addMove(i, col);
                else {
                    addMove(i, col);
                    break;
                }
            }
            for (let i = row - 1; i >= 0; i--) {
                if (board[i][col] === "") addMove(i, col);
                else {
                    addMove(i, col);
                    break;
                }
            }
            if (piece[0].toLowerCase() === "r") break; 

        case "b": 
            for (let i = 1; row + i < 8 && col + i < 8; i++) {
                if (board[row + i][col + i] === "") addMove(row + i, col + i);
                else {
                    addMove(row + i, col + i);
                    break;
                }
            }
            for (let i = 1; row + i < 8 && col - i >= 0; i++) {
                if (board[row + i][col - i] === "") addMove(row + i, col - i);
                else {
                    addMove(row + i, col - i);
                    break;
                }
            }
            for (let i = 1; row - i >= 0 && col + i < 8; i++) {
                if (board[row - i][col + i] === "") addMove(row - i, col + i);
                else {
                    addMove(row - i, col + i);
                    break;
                }
            }
            for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
                if (board[row - i][col - i] === "") addMove(row - i, col - i);
                else {
                    addMove(row - i, col - i);
                    break;
                }
            }
            break;

        case "n": 
            const knightMoves = [
                [1, 2], [-1, 2], [2, 1], [-2, 1],
                [2, -1], [-2, -1], [1, -2], [-1, -2],
            ];
            knightMoves.forEach(([dr, dc]) => addMove(row + dr, col + dc));
            break;

           
        

        case "k": 
            const kingMoves = [
                [1, 0], [0, 1], [-1, 0], [0, -1],
                [1, 1], [-1, -1], [1, -1], [-1, 1],
            ];
            kingMoves.forEach(([dr, dc]) => addMove(row + dr, col + dc));
            break;

        default:
            break;
    }
    if (board[row][col][0] === "p") {
       
        if (row + 1 < 8 && board[row + 1][col] === "") {
            Move.push([row + 1, col]);
    
          
            if (row === 1 && board[row + 2][col] === "") {
                Move.push([row + 2, col]);
            }
        }
    
        if (row + 1 < 8 && col - 1 >= 0 && board[row + 1][col - 1] !== "" && board[row + 1][col - 1][1] !== board[row][col][1]) {
            Move.push([row + 1, col - 1]);
        }
    
        if (row + 1 < 8 && col + 1 < 8 && board[row + 1][col + 1] !== "" && board[row + 1][col + 1][1] !== board[row][col][1]) {
            Move.push([row + 1, col + 1]);
        }
    }
    if (board[row][col][0] === "P") {
        
        if (row - 1 >= 0 && board[row - 1][col] === "") {
            Move.push([row - 1, col]);
    
           
            if (row === 6 && board[row - 2][col] === "") {
                Move.push([row - 2, col]);
            }
        }
    
        if (row - 1 >= 0 && col - 1 >= 0 && board[row - 1][col - 1] !== "" && board[row - 1][col - 1][1] !== board[row][col][1]) {
            Move.push([row - 1, col - 1]);
        }
    
       
        if (row - 1 >= 0 && col + 1 < 8 && board[row - 1][col + 1] !== "" && board[row - 1][col + 1][1] !== board[row][col][1]) {
            Move.push([row - 1, col + 1]);
        }
    }
        
    if (isOnlyMoveData) return Move;
    const newMove = [];
    for (const [toRow, toCol] of Move) {
       
        const newBoard = board.map(r => [...r]);
        newBoard[toRow][toCol] = piece;
        newBoard[row][col] = "";

        if (await checkIsKingIsSafe(row, col, toRow, toCol)) {
            newMove.push([toRow, toCol]);
        }
    }

    if(selectedPiece)
    setValidMove(newMove);
    return newMove;
};
console.log(userId,"AK_$&")
useEffect(() => {
  if (!online || !userId) return;

  const newSocket = io("https://game-backend-28ge.onrender.com", { query: { id: userId, gameType: "chess" } });
  setSocket(newSocket);

  newSocket.emit("join", { board: initializeBoard() });

  newSocket.on("waiting", (message) => toast.info(message));
  newSocket.on("startGame", ({ gameId, players }) => {
    console.log(gameId,players)
    const assignedSymbol = players.X.socketId === newSocket.id ? "b" : "w";
   
    setOnlineTurn(assignedSymbol)
    setGameId(gameId);
    toast.success(`Game started! You are ${assignedSymbol}`);
  });
  newSocket.on("checkMate",({gameId,turn,winner})=>{
   
      if(winner===userId)
      {
            setGameResult({type:"checkmate",winner:true}); 
      }
      else
      {
         setGameResult({type:"checkmate",winner:false}); 
      }
  })
  newSocket.on("Draw",({data})=>{
    setGameResult({type:"draw game",winner:false,drawReason:"game draw"}); 
  })
  newSocket.on("move", ({ board: newBoard, symbol }) => {
   
    setBoard(newBoard);
    setTurn(symbol)
  
  });

  newSocket.on("reset", () => {
    setBoard(initializeBoard());
  });

  newSocket.on("opponentDisconnected", (message) => {
    toast.error(message);
    resetGame();
    setIsOnline(false);
  });

  return () => {
    if (newSocket) {
      newSocket.disconnect();
    }
  };
}, [online, userId]);


const handleSelect = async (row, col) => {
  if(online && onlineTurn !== turn) return;

  let isRightMove = validMove.some(move => move[0] === row && move[1] === col);

  if (isRightMove && selectedPiece) {
    console.log("isWrite");
    const newBoard = chessBoard.map(row => [...row]);
    newBoard[row][col] = selectedPiece.piece;
    const nextTurn = turn==='b' ? 'w' : 'b';
   setTurn(nextTurn)
     
    if ((newBoard[row][col][0] === "p" && row === 7) || (newBoard[row][col][0] === "P" && row === 0)) {
      setShowOptionPawn([true, "", row, col, newBoard]);
    }

    newBoard[selectedPiece.row][selectedPiece.col] = "";
    setBoard(newBoard);
    setSelectedPiece(null);
    setValidMove([]);

   setisMove((pre)=>pre+1);
   
     
    
  } else {
    
    if(chessBoard[row][col] !== "" && chessBoard[row][col][1] === turn) {
      setSelectedPiece({ piece: chessBoard[row][col], row, col });
      await getValidMove(row, col, false, chessBoard);
      console.log(validMove, "Valid Moves");
    } else {
      setSelectedPiece(null);
      setValidMove([]);
    }
  }

};
const checkIsKingCheakedOrDrawOrSafe=async (newBoard)=>{
  let kingRow=-1;
  let kingCol=-1;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        if (newBoard[i][j] !== "" && newBoard[i][j][1] === turn &&
            (newBoard[i][j][0] === "k" || newBoard[i][j][0] === "K")) {
            kingRow = i;
            kingCol = j;
        }
    }
}
let isAnyMove=false,checked=false;
  for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
       // console.log(newBoard[i][j])
         
          if (newBoard[i][j] !== "" && newBoard[i][j][1]=== turn){
            let validMoves = await getValidMove(i, j, false, newBoard);
          
            if(validMoves.length!==0)
            {
              isAnyMove=true;
            }
          }
      }
  }
  let res=await checkIsKingIsSafe(0,0,0,0);
  if(!res)
  checked=true;
  if(!isAnyMove&&checked)
  {
    setCheckMate(true);
    return;
  }

    if(!isAnyMove)
    {
        setDraw(true);
    }

}

const playMoveSound = () => {
  if (audioRef.current) {
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((error) => console.error("Audio play error:", error));
  }
};


useEffect(()=>{
  checkIsKingCheakedOrDrawOrSafe(chessBoard);
  playMoveSound();
 },[chessBoard])


 useEffect(()=>{
  if(checkMate)
  {
    toast.success("checkmate by opponent you loss");
    if(online&&socket)
    {
      socket.emit("checkMate",{gameId,turn,winner:userId});
    }
  }

    if(isDraw&&!checkMate)
    {
      toast.success("game draw no win");
       if(online&&socket)
        {
          socket.emit("Draw",{gameId,turn});
        }
    }
  
 },[checkMate,isDraw])



useEffect(()=>{
 if(!socket)
  return;
  socket.emit("move", { symbol:turn,board:chessBoard, gameId });
},[isMove])


  return (
    <div className="flex flex-col items-center bg-gray-800 min-h-screen text-white p-4 space-y-4">
      <audio ref={audioRef} src="/chess.mp3" preload="auto" />
  <header className="text-center space-y-4">
    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
      Chess Master
    </h1>
  
    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
      <div className="flex gap-2 flex-wrap justify-center">
        <button 
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-all transform hover:scale-105"
          onClick={(e) => { e.stopPropagation(); setOnline(!online) }}
        >
          {!online ? "🌐 Play Online" : "📴 Play Offline"}
        </button>
        
        {online && (
          <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-all transform hover:scale-105">
            🔄 Rejoin Game
          </button>
        )}
      </div>
      
   
    </div>
  </header>

 
  <div className="flex flex-col md:flex-row gap-4 items-center">
    
    <div className={`p-3 rounded-lg ${turn === 'w' ? 'bg-amber-100 text-black' : 'bg-gray-900 text-white'} 
      transition-all duration-300 transform hover:scale-105`}>
      <div className="flex items-center gap-2 font-bold text-lg">
        <span className="text-2xl">{turn === 'w' ? '♔' : '♚'}</span>
        {turn === 'w' ? "White's Turn" : "Black's Turn"}
      </div>
      {online && (
        <div className="text-sm mt-1 text-center">
          (You're playing as {onlineTurn === 'w' ? '⚪ White' : '⚫ Black'})
        </div>
      )}
    </div>
   
    <div className="bg-gray-700 p-3 rounded-lg space-y-2">
      <h3 className="font-semibold text-center">Board Theme</h3>
      <div className="flex gap-2">
        {['classic', 'green', 'blue', 'pink'].map((theme) => (
          <button
            key={theme}
            onClick={() => setBoardTheme(theme)}
            className={`w-8 h-8 rounded-full border-2 ${
              boardTheme === theme ? 'border-yellow-400 scale-110' : 'border-transparent'
            } transition-all ${theme === 'classic' ? 'bg-amber-200' : ''} ${
              theme === 'green' ? 'bg-emerald-400' : ''
            } ${theme === 'blue' ? 'bg-sky-400' : ''} ${theme === 'pink' ? 'bg-pink-400' : ''}`}
            title={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme`}
          />
        ))}
      </div>
    </div>
  </div>

  
  <div className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[600px] aspect-square">
    <div className="grid grid-cols-8 gap-1 w-full h-full shadow-xl rounded-lg overflow-hidden border-4 border-gray-700">
      {chessBoard.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isWhiteSquare = (rowIndex + colIndex) % 2 === 0;
          const isValidMove = validMove.some(
            ([validRow, validCol]) => validRow === rowIndex && validCol === colIndex
          );
          const pieceSymbol = cell ? getChessSymbol(cell[0]) : "";
          const pieceColor = cell?.charAt(1) === "w" ? "text-white" : "text-black";

          let squareColor = '';
          switch(boardTheme) {
            case 'green':
              squareColor = isWhiteSquare ? 'bg-emerald-200' : 'bg-emerald-800';
              break;
            case 'blue':
              squareColor = isWhiteSquare ? 'bg-sky-200' : 'bg-sky-800';
              break;
            case 'pink':
              squareColor = isWhiteSquare ? 'bg-pink-200' : 'bg-pink-800';
              break;
            default:
              squareColor = isWhiteSquare ? 'bg-amber-200' : 'bg-amber-800';
          }

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`relative aspect-square flex items-center justify-center
                ${squareColor}
                ${isValidMove ? 'cursor-pointer bg-yellow-400/80' : 'cursor-pointer'}
                transition-all duration-200 hover:scale-105`}
              onClick={async () => await handleSelect(rowIndex, colIndex)}
            >
              <span className={`${pieceColor} text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-2xl`}>
                {pieceSymbol}
              </span>
              {isValidMove && (
                <div className="absolute inset-0 border-4 border-yellow-400 animate-pulse rounded-lg" />
              )}
            </div>
          );
        })
      )}
    </div>
  </div>

  <button
    className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
    onClick={async () => {
      await setBoard(initializeBoard());
      if (online && socket) socket?.emit('reset', { gameId, board: initializeBoard() });
    }}
  >
    <svg className="w-5 h-5 animate-spin-once" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
    Restart Game
  </button>
 { (checkMate||isDraw) ? <GameEndPopup
  socket={socket}
  gameId={gameId}
  userId={userId}
  gameResult={gameResult}
  onRematch={() => {
    setBoard(initializeBoard());
    setTurn('w');
    setCheckMate(false);
    setDraw(false)
    setGameState('playing');
  }}
/>:null
}
  {online&&gameId&&socket ? <VideoCall  roomId={gameId}/>: null}
  {showOptionPawn[0] && <ShowOption setShowOptionPawn={setShowOptionPawn} showOptionPawn={showOptionPawn} setBoard={setBoard} setTurn={setTurn} turn={turn} />}
</div>)
}

export default ChessGame;
