
import React from 'react';

interface DieProps {
  value: number;
  isRolling: boolean;
}

const Dot: React.FC = () => (
    <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-slate-800 rounded-full shadow-inner"></div>
);

// Helper component defined outside the main Die component
const DieFace: React.FC<{ value: number }> = ({ value }) => {
    const faceStyle = "w-full h-full p-2 flex";
    switch (value) {
        case 1:
            return (
                <div className={`${faceStyle} justify-center items-center`}>
                    <Dot />
                </div>
            );
        case 2:
            return (
                <div className={`${faceStyle} justify-between`}>
                    <div className="flex items-start"><Dot /></div>
                    <div className="flex items-end"><Dot /></div>
                </div>
            );
        case 3:
            return (
                <div className={`${faceStyle} justify-between`}>
                     <div className="flex items-start"><Dot /></div>
                     <div className="flex items-center"><Dot /></div>
                     <div className="flex items-end"><Dot /></div>
                </div>
            );
        case 4:
            return (
                <div className={`${faceStyle} justify-between`}>
                    <div className="flex flex-col justify-between"><Dot /><Dot /></div>
                    <div className="flex flex-col justify-between"><Dot /><Dot /></div>
                </div>
            );
        case 5:
            return (
                <div className={`${faceStyle} justify-between`}>
                    <div className="flex flex-col justify-between"><Dot /><Dot /></div>
                    <div className="flex justify-center items-center"><Dot /></div>
                    <div className="flex flex-col justify-between"><Dot /><Dot /></div>
                </div>
            );
        case 6:
            return (
                <div className={`${faceStyle} justify-between`}>
                    <div className="flex flex-col justify-between"><Dot /><Dot /><Dot /></div>
                    <div className="flex flex-col justify-between"><Dot /><Dot /><Dot /></div>
                </div>
            );
        default:
            return null;
    }
};


export const Die: React.FC<DieProps> = ({ value, isRolling }) => {
    return (
        <div className={`
            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 
            bg-slate-200 rounded-lg shadow-lg flex items-center justify-center
            transition-all duration-1000 ease-out
            ${isRolling ? 'animate-spin opacity-70 scale-75' : 'opacity-100 scale-100'}
        `}>
            {!isRolling && <DieFace value={value} />}
        </div>
    );
};
