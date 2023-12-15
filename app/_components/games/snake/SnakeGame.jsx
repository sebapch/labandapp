'use client'
import React, { useState, useEffect, useRef } from "react";
import "./SnakeGame.css"; // Importa tu archivo CSS de estilos Tailwind
import { createClient, kv } from "@vercel/kv";

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("RIGHT");
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [gameRunning, setGameRunning] = useState(false);
  const [scores, setScores] = useState([]); 
  const [level, setLevel] = useState(1);

  const client = createClient({
    url: "https://subtle-stallion-49535.kv.vercel-storage.com",
    token:
      "AcF_ASQgOTNiZGQ0ZTItYmQ1Yi00NDE1LTk2YjQtMGY2YmM1MzY4NDYyMzQ1YjI0OTgxZGFkNGM3NWFlMTRkYzAyMzI1Y2ZjYTY=",
  });

  const startGame = () => {
    setSnake([{ x: 0, y: 0 }]);
    setFood(getRandomPosition());
    setDirection("RIGHT");
    setScore(0);
    setLevel(1);
    setGameRunning(true);
  };


  const saveGame = async () => {
    const key = Date.now();
    await client.set(`snakeGames:${key}`, { name, score });
    // Fetch all scores after saving a new game
    fetchAllScores();
    return `snakeGames:${key}`;
  };

  const canvasSize = 10;
  const cellSize = 30;
  const canvasRef = useRef();

  const getRandomPosition = () => ({
    x: Math.floor(Math.random() * canvasSize),
    y: Math.floor(Math.random() * canvasSize),
  });

  const checkCollision = (head, array) =>
    array.some((segment) => segment.x === head.x && segment.y === head.y);

  const handleKeyPress = (e) => {
    switch (e.key) {
      case "ArrowUp":
        setDirection("UP");
        break;
      case "ArrowDown":
        setDirection("DOWN");
        break;
      case "ArrowLeft":
        setDirection("LEFT");
        break;
      case "ArrowRight":
        setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;

    document.addEventListener("touchmove", handleTouchMove);

    function handleTouchMove(e) {
      e.preventDefault();

      const touch = e.touches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          setDirection("RIGHT");
        } else {
          setDirection("LEFT");
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          setDirection("DOWN");
        } else {
          setDirection("UP");
        }
      }
    }

    document.addEventListener("touchend", () => {
      document.removeEventListener("touchmove", handleTouchMove);
    });
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case "UP":
        head.y = (head.y - 1 + canvasSize) % canvasSize;
        break;
      case "DOWN":
        head.y = (head.y + 1) % canvasSize;
        break;
      case "LEFT":
        head.x = (head.x - 1 + canvasSize) % canvasSize;
        break;
      case "RIGHT":
        head.x = (head.x + 1) % canvasSize;
        break;
      default:
        break;
    }

    if (checkCollision(head, newSnake)) {
      // Game over - reset the game
      setSnake([{ x: 0, y: 0 }]);
      setFood(getRandomPosition());
      setDirection("RIGHT");
      setScore(0);
      setGameRunning(false);
      setLevel(1); 
      saveGame();
    } else {
      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        // Snake ate the food - increase score and place new food
        setScore(score + 1);
        setFood(getRandomPosition());
        if (score > 0 && (score + 1) % 3 === 0) {
          setLevel(level + 1);
        }
      } else {
        // Remove the last segment of the snake if it didn't eat food
        newSnake.pop();
      }

      setSnake(newSnake);
    }
  };

  useEffect(() => {
    // Set up key event listener
    window.addEventListener("keydown", handleKeyPress);

    // Set up touch event listener
    const canvas = canvasRef.current;
    canvas.addEventListener("touchstart", handleTouchStart);

    // Clean up key and touch event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      canvas.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawCell = (x, y) => {
      ctx.fillStyle = "#333"; // Cell color
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    };

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach((segment) => drawCell(segment.x, segment.y));

    // Draw the food
    drawCell(food.x, food.y);
  }, [snake, food]);

  useEffect(() => {
    // Move the snake periodically only if the game is running
    if (gameRunning) {
      const intervalId = setInterval(() => moveSnake(), 200 - level * 20);;
      // Clean up interval on component unmount
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [snake, direction, food, score, gameRunning]);

  const fetchAllScores = async () => {
    const keys = await client.keys("snakeGames:*");
    const allScores = await Promise.all(
      keys.map(async (key) => {
        const game = await client.get(key);
        return {
          key: key,
          name: game.name,
          score: game.score,
        };
      })
    );

    allScores.sort((a, b) => b.score - a.score); // Sort scores in descending order
    setScores(allScores);
  };

  useEffect(() => {
    // Fetch scores when the component mounts
    fetchAllScores();
  }, []);

  return (
    <div className="flex items-center flex-col mt-4">
      <h1>Snake Game</h1>
      {!gameRunning && (
        <>
          <label>Enter your name:</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 p-2 border"
          />
          <button onClick={startGame} className="mt-2 text-white">
            Start
          </button>
        </>
      )}
      {gameRunning && <label>Score: {score}</label>}
      <canvas
        ref={canvasRef}
        width={canvasSize * cellSize}
        height={canvasSize * cellSize}
        className="border border-gray-500"
      />
      <h2 className="text-white">All Scores:</h2>
      <ul className="text-white">
        {scores.map((game) => (
          <li key={game.key}>
            {`${game.name}: ${game.score}`}
          </li>
        ))}
      </ul>
    </div>

  );
};

export default SnakeGame;
