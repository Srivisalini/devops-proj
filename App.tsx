
import React, { useState, useEffect, useCallback } from 'react';
import { Die } from './components/Die';
import { DiceIcon } from './components/DiceIcon';

const MAX_DICE = 6;

const App: React.FC = () => {
  const [numberOfDice, setNumberOfDice] = useState<number>(1);
  const [diceValues, setDiceValues] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);

  const rollDice = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
    setKey(prevKey => prevKey + 1); // Remounts dice to replay animation

    setTimeout(() => {
      const newValues = Array.from({ length: numberOfDice }, () =>
        Math.floor(Math.random() * 6) + 1
      );
      setDiceValues(newValues);
      setIsRolling(false);
    }, 1000); // Duration of the rolling animation
  }, [numberOfDice, isRolling]);

  useEffect(() => {
    setDiceValues(Array.from({ length: numberOfDice }, () => Math.floor(Math.random() * 6) + 1));
  }, [numberOfDice]);


  const total = diceValues.reduce((sum, val) => sum + val, 0);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-gray-900 text-slate-200 min-h-screen flex flex-col items-center justify-center p-4 font-sans antialiased">
      <div className="w-full max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
            Interactive Dice Roller
          </h1>
          <p className="text-slate-400 mt-2">Select your dice and try your luck!</p>
        </header>

        <main className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 space-y-8">
          <section id="controls" className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-3 text-slate-300">Number of Dice</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[...Array(MAX_DICE)].map((_, i) => {
                  const num = i + 1;
                  const isActive = num === numberOfDice;
                  return (
                    <button
                      key={num}
                      onClick={() => setNumberOfDice(num)}
                      className={`
                        p-3 rounded-lg text-lg font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500
                        ${isActive ? 'bg-cyan-500 text-white shadow-lg scale-105' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}
                      `}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              onClick={rollDice}
              disabled={isRolling}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <DiceIcon className="w-6 h-6" />
              <span className="text-xl">{isRolling ? 'Rolling...' : 'Roll Dice'}</span>
            </button>
          </section>

          <hr className="border-slate-700" />
          
          <section id="results" className="text-center space-y-6">
            <div key={key} className="flex justify-center items-center flex-wrap gap-4 sm:gap-6 min-h-[128px]">
              {diceValues.map((value, index) => (
                <Die key={index} value={value} isRolling={isRolling} />
              ))}
            </div>
            {total > 0 && !isRolling && (
              <div className="bg-slate-900/50 inline-block px-8 py-4 rounded-xl border border-slate-700">
                <h2 className="text-2xl font-semibold text-slate-400">Total</h2>
                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
                  {total}
                </p>
              </div>
            )}
          </section>
        </main>

        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Built with React, TypeScript, and Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
