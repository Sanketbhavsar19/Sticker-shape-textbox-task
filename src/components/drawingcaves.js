import React, { useRef, useEffect, useState } from 'react';

const DrawingCanvas = ({ selectedShape }) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [shapes, setShapes] = useState([]);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redrawShapes();
  };

  const handleMouseDown = (e) => {
    if (!selectedShape) return;
    setDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPos({ x, y });
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const currentShape = { shape: selectedShape, startX: startPos.x, startY: startPos.y, endX: x, endY: y };
    const newShapes = shapes.slice(0, -1);
    newShapes.push(currentShape);
    setShapes(newShapes);
  };

  const handleMouseUp = (e) => {
    if (!drawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const currentShape = { shape: selectedShape, startX: startPos.x, startY: startPos.y, endX: x, endY: y };
    setShapes([...shapes, currentShape]);
    setDrawing(false);
  };

  const redrawShapes = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach(({ shape, startX, startY, endX, endY }) => {
      if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        context.beginPath();
        context.arc(startX, startY, radius, 0, 2 * Math.PI);
        context.stroke();
      } else if (shape === 'rectangle') {
        context.strokeRect(startX, startY, endX - startX, endY - startY);
      }
    });
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    redrawShapes();
  }, [shapes]);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default DrawingCanvas;