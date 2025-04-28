import { FC, useEffect, useRef, useState} from "react";
import pointerImg from "../assets/images/fortune-wheel-arrow.webp";
import centerGif from "../assets/images/center ball.gif";
import {placeOccurrences, SPIN_SPINNING, WheelData} from "../Utils/type.ts";

interface SpinCanvasProps {
    spinState: number | null;
    wheelData:  WheelData[];
    onsetWheelData: (data: WheelData[]) => void;
    setWinningSegment: (segment: WheelData) => void;
}

const SpinClassicCanvas: FC<SpinCanvasProps> = ({spinState, wheelData, onsetWheelData,setWinningSegment}) => {
    const wheelCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const pointerCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [rotationAngle, setRotationAngle] = useState<number>(0);

    const [spinResult, setSpinResult] = useState<number | null>(null);
    const numSegments = 35;
    const canvasSize = 400;
    const canvasPadding = 20;
    const center = canvasSize / 2;
    const radius = center - canvasPadding;
    const segmentAngle = 360 / numSegments;

    const useImageData = () => {

        useEffect(() => {
            const segments = placeOccurrences.flatMap(({ color, positions, label }) =>
                positions.map((position) => ({ position, color, label }))
            );
            segments.sort((a, b) => a.position - b.position);
            onsetWheelData(segments);
        }, []);

        return wheelData;
    };

    const updatedWheelData = useImageData();

    useEffect(() => {
        if (spinState === SPIN_SPINNING && wheelData.length > 0) {
            const chosenSegment = wheelData[Math.floor(Math.random() * wheelData.length)];

            const segmentAngle = 360 / numSegments;
            const segmentStartAngle = chosenSegment.position * segmentAngle;
            const spinRotations = Math.floor(Math.random() * 21) - 10;
            const spinAngles = Math.random() * (6.0 - 1.1) + 1.1;
            const point = segmentAngle / spinAngles;
            const finalAngle = (-90 + point) - segmentStartAngle + spinRotations * 360;

            setSpinResult(finalAngle);
            setWinningSegment(chosenSegment);
        }
    }, [spinState, wheelData]);


    useEffect(() => {
        if (spinResult !== null) {
            setRotationAngle(spinResult);
            onsetWheelData(wheelData);
        }
    }, [spinResult]);

    useEffect(() => {
        const canvas = wheelCanvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!ctx || wheelData.length === 0) return;

        ctx.clearRect(0, 0, canvasSize, canvasSize);

        // Draw Wheel
        updatedWheelData.forEach(({color, position, label}) => {
            const startAngle = ((position - 1) * segmentAngle * Math.PI) / 180;
            const endAngle = startAngle + (segmentAngle * Math.PI) / 180;

            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.arc(center, center, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw Label
            ctx.fillStyle = "#fff";
            ctx.font = "bold 14px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const textDistance = radius * 0.85;
            const textX = center + textDistance * Math.cos((startAngle + endAngle) / 2);
            const textY = center + textDistance * Math.sin((startAngle + endAngle) / 2);

            ctx.save();
            ctx.translate(textX, textY);
            ctx.rotate((startAngle + endAngle) / 2 + Math.PI / 2);
            ctx.fillText(label, 0, 0);
            ctx.restore();
        });

        // Draw Outer Rim
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        const outerGradient = ctx.createLinearGradient(0, 0, canvasSize, canvasSize);
        outerGradient.addColorStop(0, "#F9E898");
        outerGradient.addColorStop(0.5, "#FF8C00");
        outerGradient.addColorStop(1, "#F9E898");

        ctx.beginPath();
        ctx.arc(center, center, radius + 6, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = outerGradient;
        ctx.stroke();
        ctx.restore();

        // Draw Pointer
        const pointerCtx = pointerCanvasRef.current?.getContext("2d");
        if (pointerCtx) {
            const pointerImage = new Image();
            pointerImage.src = pointerImg;
            pointerImage.onload = () => {
                pointerCtx.clearRect(0, 0, canvasSize, canvasSize);
                pointerCtx.drawImage(pointerImage, center - 15, 0, 30, 40);
            };
        }
    }, [wheelData]);

    return (
        <div className="spin-canvas" style={{position: "relative"}}>
            {/* Main Wheel Canvas */}
            <canvas
                ref={wheelCanvasRef}
                width={canvasSize}
                height={canvasSize}
                style={{
                    width:"100%",
                    transform: `rotate(${rotationAngle}deg)`,
                    transition: spinResult ? "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
                }}
            />

            {/* GIF Centered Over the Wheel */}
            <img
                src={centerGif}
                alt="Center GIF"
                style={{
                    position: "absolute",
                    width: "220px",
                    height: "220px",
                    pointerEvents: "none",
                }}
            />

            {/* Pointer Canvas */}
            {/*<canvas*/}
            {/*    ref={pointerCanvasRef}*/}
            {/*    style={{*/}
            {/*        width:"100%",*/}
            {/*        position: "absolute",*/}
            {/*        pointerEvents: "none",*/}
            {/*        top: 0,*/}
            {/*        left: 0,*/}
            {/*    }}*/}
            {/*/>*/}
        </div>
    );
};

export default SpinClassicCanvas;
