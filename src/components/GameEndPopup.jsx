import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GameEndPopup = ({ socket, gameId, userId, gameResult, onRematch }) => {


    const handleRematch = () => {
        socket.emit('reset', { gameId, userId });
        setIsOpen(false);
        onRematch();
    };
    const getTitle = () => {
        if (gameResult.type === 'checkmate') {
            return gameResult.winner ? "Victory!" : "Checkmate!";
        }
        return "Game Drawn!";
    };

    const getMessage = () => {
        if (gameResult.type === 'checkmate') {
            return gameResult.winner
                ? "You delivered checkmate! 🏆"
                : "You were checkmated 😢";
        }

        switch (gameResult.drawReason) {
            case 'stalemate':
                return "Stalemate - No legal moves!";
            case 'threefold':
                return "Threefold repetition!";
            case '50moves':
                return "50-move rule applied!";
            case 'agreement':
                return "Draw by mutual agreement!";
            default:
                return "Game ended in a draw!";
        }
    };

    return (
        <AnimatePresence>
            {gameResult.type && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                >
                    <motion.div
                        initial={{ y: -50, scale: 0.9 }}
                        animate={{ y: 0, scale: 1 }}
                        className="bg-gray-800 rounded-xl p-8 max-w-md w-full text-center space-y-6"
                    >
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-gradient bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                {getTitle()}
                            </h2>
                            <div className="text-xl font-semibold">
                                {getMessage()}
                            </div>
                            {gameResult.type === 'checkmate' && (
                                <div className="text-lg">
                                    {gameResult.winner
                                        ? "Congratulations!"
                                        : "Better luck next time!"}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleRematch}
                                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                            >
                                {gameResult.type === 'draw' ? "🔄 Play Again" : "🎮 Request Rematch"}
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                            >
                                🏠 Exit to Main Menu
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GameEndPopup;