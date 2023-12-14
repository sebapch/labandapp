'use client'
import React, { useState, useEffect, useRef } from "react";
import "./SnakeGame.css"; // Importa tu archivo CSS de estilos Tailwind

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("RIGHT");
  const [score, setScore] = useState(0);

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
    } else {
      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        // Snake ate the food - increase score and place new food
        setScore(score + 1);
        setFood(getRandomPosition());
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

    // Clean up key event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
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
    // Move the snake periodically
    const intervalId = setInterval(() => moveSnake(), 200);

    // Clean up interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [snake, direction, food, score]);

  return (
    <div>
      <h1>Snake Game</h1>
      <p>Score: {score}</p>
      <canvas
        ref={canvasRef}
        width={canvasSize * cellSize}
        height={canvasSize * cellSize}
        className="border border-gray-500"
      />
    </div>
  );
};

export default SnakeGame;
