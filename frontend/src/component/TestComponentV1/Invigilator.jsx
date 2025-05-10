import { useEffect, useRef, useState } from "react";
import "@tensorflow/tfjs-backend-wasm";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";
import { onerrorToast } from "../Tostify";
import "./Invigilator.scss";

export default function Invigilator() {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [warning, setWarning] = useState("");
    const [warningCount, setWarningCount] = useState(0);

    useEffect(() => {
        // Drag-and-drop logic
        const container = containerRef.current;
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const handleMouseDown = (e) => {
            isDragging = true;
            offsetX = e.clientX - container.getBoundingClientRect().left;
            offsetY = e.clientY - container.getBoundingClientRect().top;
            container.style.cursor = "grabbing";
        };

        const handleMouseMove = (e) => {
            if (isDragging) {
                container.style.left = `${e.clientX - offsetX}px`;
                container.style.top = `${e.clientY - offsetY}px`;
            }
        };

        const handleMouseUp = () => {
            isDragging = false;
            container.style.cursor = "grab";
        };

        container.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            container.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    useEffect(() => {
        async function setupCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Failed to access webcam:", err);
                setWarning("Error accessing the webcam. Please check your camera permissions.");
                setWarningCount((prevCount) => prevCount + 1);
                if (warningCount >= 3) {
                    setWarning("Multiple errors accessing the webcam. Please check your camera settings.");
                    onerrorToast("Your Face is not detected, please check your camera settings.");
                }
            }
        }

        async function startDetection() {
            try {
                await tf.setBackend("wasm");
                await tf.ready();

                const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
                const detectorConfig = {
                    runtime: "mediapipe",
                    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@latest",
                };

                const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);

                async function detectFace() {
                    if (videoRef.current) {
                        const predictions = await detector.estimateFaces(videoRef.current);
                        console.log(predictions);

                        if (!predictions.length) {
                            setWarning("No face detected! Please ensure your face is clearly visible.");
                            if (warningCount >= 3) {
                                setWarning("Multiple errors accessing the webcam. Please check your camera settings.");
                                onerrorToast("Your Face is not detected, please check your camera settings.");
                            }
                        } else {
                            setWarning(""); // Reset the warning if a face is detected
                        }
                    }
                    requestAnimationFrame(detectFace);
                }

                detectFace();
                if (warningCount >= 3) {
                    setWarning("Multiple errors accessing the webcam. Please check your camera settings.");
                    onerrorToast("Your Face is not detected, please check your camera settings.");
                }
            } catch (error) {
                console.error("Error initializing TensorFlow.js:", error);
                setWarning("Face detection initialization failed. Please try again.");
            }
        }

        setupCamera().then(() => startDetection());
    }, []);

    return (
        <div
            className="invigilator_container"
            ref={containerRef}
            style={{ position: "absolute", cursor: "grab" }}
        >
            <video
                ref={videoRef}
                id="webcam"
                autoPlay
                playsInline
                style={{
                    width: "100%",
                    maxWidth: "250px",
                    height: "250px",
                    borderRadius: "100%",
                    objectFit: "cover",
                    // border: "15px solid #f8f6f6",
                    border: warning ? "15px solid red" : "15px solid #f8f6f6",
                    marginTop: "20px",
                }}
                onError={(e) => {
                    console.error("Error accessing webcam:", e);
                    setWarning("Error accessing the webcam. Please check your camera permissions.");
                    setWarningCount((prevCount) => prevCount + 1);
                }}
            />
            {warning && (
                <p
                    className="error_message"
                    style={{
                        color: "Black",
                        fontWeight: "bold",
                        fontSize: "15px",
                    }}
                >
                    {warning}
                </p>
            )}
        </div>
    );
}