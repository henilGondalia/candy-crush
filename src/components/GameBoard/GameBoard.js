import React, { useState, useEffect } from 'react';
import BlueCandy from '../../assets/blue-candy.png';
import GreenCandy from '../../assets/green-candy.png';
import OrangeCandy from '../../assets/orange-candy.png';
import PurpleCandy from '../../assets/purple-candy.png';
import RedCandy from '../../assets/red-candy.png';
import YellowCandy from '../../assets/blue-candy.png';
import Blank from '../../assets/blank.png';
import './gameBoard.scss';

const width = 8;
const candyColors = [
  BlueCandy,
  GreenCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy,
];

const GameBoard = ({userName, moves}) => {
    const [currColorArrangement, setCurrColorArrangement] = useState([]);
    const [draggingSquare, setDraggingSquare] = useState(null);
    const [replaceSquare, setReplaceSquare] = useState(null);
    const [scoreDisplay, setScoreDisplay] = useState(0);

    const createBoard = () => {
        const rendomColorArrangment = [];
        for (let i = 0; i < width * width; i++) {
            const rendomColor =
            candyColors[Math.floor(Math.random() * candyColors.length)];
            rendomColorArrangment.push(rendomColor);
        }
        setCurrColorArrangement(rendomColorArrangment);
    };

    const checkForColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
          const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
          const decidedColor = currColorArrangement[i];
          const isBlank = currColorArrangement[i] === Blank;
          if (
            columnOfFour.every(
              (squre) => currColorArrangement[squre] === decidedColor
            ) &&
            !isBlank
          ) {
            setScoreDisplay((score) => score + 4);
            columnOfFour.forEach((squre) => (currColorArrangement[squre] = Blank));
            return true;
          }
        }
      };
    
      const checkForColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
          const columnOfThree = [i, i + width, i + width * 2];
          const decidedColor = currColorArrangement[i];
          const isBlank = currColorArrangement[i] === Blank;
          if (
            columnOfThree.every(
              (squre) => currColorArrangement[squre] === decidedColor
            ) &&
            !isBlank
          ) {
            setScoreDisplay((score) => score + 3);
            columnOfThree.forEach((squre) => (currColorArrangement[squre] = Blank));
            return true;
          }
        }
      };
    
      const checkForRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
          const rowOfFour = [i, i + 1, i + 2, i + 3];
          const decidedColor = currColorArrangement[i];
          const notValid = [
            5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
            54, 55, 62, 63, 64,
          ];
          if (notValid.includes(i)) continue;
          const isBlank = currColorArrangement[i] === Blank;
          if (
            rowOfFour.every(
              (squre) => currColorArrangement[squre] === decidedColor
            ) &&
            !isBlank
          ) {
            setScoreDisplay((score) => score + 4);
            rowOfFour.forEach((squre) => (currColorArrangement[squre] = Blank));
            return true;
          }
        }
      };
    
      const checkForRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
          const rowOfThree = [i, i + 1, i + 2];
          const decidedColor = currColorArrangement[i];
          const notValid = [
            6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
          ];
          if (notValid.includes(i)) continue;
          const isBlank = currColorArrangement[i] === Blank;
          if (
            rowOfThree.every(
              (squre) => currColorArrangement[squre] === decidedColor
            ) &&
            !isBlank
          ) {
            setScoreDisplay((score) => score + 3);
            rowOfThree.forEach((squre) => (currColorArrangement[squre] = Blank));
            return true;
          }
        }
      };
    
      const moveSqureDown = () => {
        for (let i = 0; i < 64 - width; i++) {
          const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
          const isFirstRow = firstRow.includes(i);
          if (isFirstRow && currColorArrangement[i] === Blank) {
            const rendomColor =
              candyColors[Math.floor(Math.random() * candyColors.length)];
            currColorArrangement[i] = rendomColor;
          }
          if (currColorArrangement[i + width] === Blank) {
            currColorArrangement[i + width] = currColorArrangement[i];
            currColorArrangement[i] = Blank;
          }
        }
      };

    const dragStart = (e) => {
        setDraggingSquare(e.target);
    };
    const dragDrop = (e) => {
        setReplaceSquare(e.target);
    };

    const dragEnd = (e) => {
        console.log("draging")
        debugger;
        const draggingSquareId = parseInt(draggingSquare.getAttribute('data-id'));
        const replaceSquareId = parseInt(replaceSquare.getAttribute('data-id'));
        currColorArrangement[replaceSquareId] = draggingSquare.getAttribute('src');
        currColorArrangement[draggingSquareId] = replaceSquare.getAttribute('src');
        const validMoves = [
          draggingSquareId - 1,
          draggingSquareId + width,
          draggingSquareId + 1,
          draggingSquareId - width,
        ];
        const validMove = validMoves.includes(replaceSquareId);
        const isColumnOfFour = checkForColumnOfFour();
        const isColumnOfThree = checkForColumnOfThree();
        const isRowOfFour = checkForRowOfFour();
        const isRowOfThree = checkForRowOfThree();
        if (
          replaceSquareId &&
          validMove &&
          (isColumnOfFour || isColumnOfThree || isRowOfFour || isRowOfThree)
        ) {
          setDraggingSquare(null);
          setReplaceSquare(null);
        } else {
          currColorArrangement[replaceSquareId] = replaceSquare.getAttribute('src');
          currColorArrangement[draggingSquareId] =
            draggingSquare.getAttribute('src');
          setCurrColorArrangement([...currColorArrangement]);
        }
    };

    useEffect(() => {
        console.log("start")
        createBoard();
      }, []);

    useEffect(() => {
        const timer = setInterval(() => {
          checkForColumnOfFour();
          checkForColumnOfThree();
          checkForRowOfFour();
          checkForRowOfThree();
          moveSqureDown();
          setCurrColorArrangement([...currColorArrangement]);
        }, 100);
        return () => clearInterval(timer);
      }, [
        checkForColumnOfFour,
        checkForColumnOfThree,
        checkForRowOfFour,
        checkForRowOfThree,
        moveSqureDown,
        currColorArrangement
      ]);

    return (
        <div className="game">
            <div className="game-header">
                <div className="header-line"></div>
                <div className="user">{userName}</div>
                <div className='game-status'>
                    <div className='score'>
                        <div className='score-bar' style={{ width: `${scoreDisplay}%` }}>
                            <span className="progress-bar__text">{scoreDisplay}</span>
                        </div>
                    </div>
                    <div className='target'>{moves}</div>
                </div>
            </div>
            <div className='game-board'>
            {currColorArrangement.map((candyColor, index) => (
                <img
                    key={index}
                    src={candyColor}
                    alt="candy"
                    data-id={index}
                    draggable={true}
                    onDragStart={dragStart}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDragLeave={(e) => e.preventDefault()}
                    onDrop={dragDrop}
                    onDragEnd={dragEnd}
                />
                ))}
            </div>
        </div>
    )
}

export default GameBoard;