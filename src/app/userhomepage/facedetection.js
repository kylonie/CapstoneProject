import React, {useState, useRef, useEffect} from 'react'
import * as faceapi from 'face-api.js'
import { count } from 'firebase/firestore';
export default function FaceDetection() {
const [maxExpression, setMaxExpression] = useState('');
const videoRef = useRef();
const [expressionCount, setExpressionCount] = useState({});
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error(err));
    };

    const getMaxExpression = (expressions) => {
      let maxExpressionKey = '';
      let maxScore = 0;

      for (const [expression, score] of Object.entries(expressions)) {
        if (score > maxScore) {
          maxExpressionKey = expression;
          maxScore = score;
        }
      }

      return maxExpressionKey;
    };

    const processVideo = () => {
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        if (detections.length > 0) {
          const firstFaceExpressions = detections[0].expressions;
          const maxExpressionKey = getMaxExpression(firstFaceExpressions);
          setMaxExpression(maxExpressionKey);
          setExpressionCount((prevCount)=>({
            ...prevCount, [maxExpressionKey]:(prevCount[maxExpressionKey]||0) + 1,
          }))
        } else {
          setMaxExpression('No faces detected');
        }
      }, 3000);
    };

    loadModels().then(processVideo);
  }, []);
  return (
    <div>
        <video ref={videoRef} autoPlay muted></video>
        <h1>Expression: {maxExpression}</h1>
        {Object.entries(expressionCount).map(([expression, count])=>(
            <p key={expression}>{expression}:{count}</p>
        ))}
    </div>
  )
}
