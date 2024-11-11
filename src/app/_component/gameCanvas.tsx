"use client";
import { useRef, useEffect, useState } from "react";

export default function GameCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const timer = useRef(0);
    const [cacti, setCacti] = useState<Cactus[]>([]);
    const maxCacti = 3;
    const canvasWidth = 800;
    const canvasHeight = 500;
    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.width = canvasWidth;
            canvasRef.current.height = canvasHeight;
        }
    }, []);

    const ctx = canvasRef.current?.getContext('2d');

    const dino = {
        x: 10,
        y: 200,
        width: 50,
        height: 50,
        draw() {
            if (ctx) { // ctx가 존재하는지 확인
                ctx.fillStyle = 'gray';
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    }


    class Cactus {
        x: number;
        y: number;
        width: number;
        height: number;

        constructor() {
            this.x = 500;
            this.y = 200;
            this.width = 50;
            this.height = 50;
        }
        draw() {
            if (ctx) { // ctx가 존재하는지 확인
                ctx.fillStyle = 'green';
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
    }

    function frameExcute() {
        requestAnimationFrame(frameExcute);
        timer.current++;

        ctx?.clearRect(0, 0, canvasWidth, canvasHeight);

        if (timer.current % 120 === 0) {
            if (cacti.length < maxCacti) { // 현재 cacti 길이를 확인
                setCacti(prevCacti => [...prevCacti, new Cactus()]); // Cactus 추가
            }
        }
        cacti.forEach(cactus => {
            cactus.x--;
            cactus.draw()}
        );
        dino.draw();
    }
    //frameExcute();

    return (
        <canvas id="canvas" ref={canvasRef}></canvas>
    );
}