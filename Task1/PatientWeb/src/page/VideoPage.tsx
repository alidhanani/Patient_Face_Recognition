import { useEffect, useRef, useState } from "react";
import useUserStore from "../store/UserStore";
import { DefaultSidebar } from "../component/Sidebar";
import * as faceapi from "face-api.js";
import "@tensorflow/tfjs";
import FirebaseAPI from "../service/Firebase";

const VideoPage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [shouldDetectFaces, setShouldDetectFaces] = useState(false);
  const videoCont = useRef<HTMLVideoElement | null>(null);
  const [ageGender, setAgeGender] = useState<{ gender: string; age: number }>();
  const canvasCont = useRef<HTMLDivElement | null>(null);
  const [imageResult, setImageResult] = useState<
    faceapi.WithFaceDescriptor<
      faceapi.WithFaceLandmarks<
        {
          detection: faceapi.FaceDetection;
        },
        faceapi.FaceLandmarks68
      >
    >[]
  >([]);

  const patientVideoPath = useUserStore((state) => state.patientVideoPath);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        FirebaseAPI()
          .fetchVideoURL(patientVideoPath)
          .then(async (data) => {
            if (data.url) {
              setVideoUrl(data.url);
              console.log(data.url);

              await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("./weights"),
                faceapi.nets.faceLandmark68Net.loadFromUri("./weights"),
                faceapi.nets.faceRecognitionNet.loadFromUri("./weights"),
                faceapi.nets.faceExpressionNet.loadFromUri("./weights"),
                faceapi.nets.ageGenderNet.loadFromUri("./weights"),
              ])
                .then(() => {
                  setMediaLoaded(true);
                  setShouldDetectFaces(true);
                })
                .catch((error) => {
                  console.log("Error loading faceapi models:", error);
                });
            }
          });
      } catch (error) {
        console.error("Error fetching video URL:", error);
      }
    };

    fetchVideoUrl();
  }, [patientVideoPath, imageResult]);

  useEffect(() => {
    if (videoUrl && mediaLoaded && shouldDetectFaces) {
      detectFaces();
      setShouldDetectFaces(false); // Reset the flag after detecting faces
    }
  }, [videoUrl, mediaLoaded, shouldDetectFaces]);

  const detectFaces = async () => {
    try {
      const videoEl = videoCont.current;

      if (videoEl instanceof HTMLVideoElement) {
        const canvasData = faceapi.createCanvasFromMedia(videoEl);
        const videoFrame = faceapi.tf.browser.fromPixels(videoEl);

        const options = new faceapi.TinyFaceDetectorOptions();
        canvasData.getContext("2d", { willReadFrequently: true });
        const result = await faceapi
          .detectAllFaces(canvasData, options)
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender()
          .withFaceDescriptors();

        setAgeGender({
          gender: result[0]?.gender,
          age: result[0]?.age,
        });
        setImageResult(result);

        const displaySize = {
          width: videoEl.height / 1.2,
          height: videoEl.width / 1.2,
        };

        // Ensure proper alignment of overlay canvas with video dimensions
        faceapi.matchDimensions(canvasData, displaySize);

        // Draw rectangles on the overlay canvas
        faceapi.draw.drawDetections(
          canvasData,
          faceapi.resizeResults(result, displaySize)
        );
        const minProbability = 0.05;
        faceapi.draw.drawFaceLandmarks(
          canvasData,
          faceapi.resizeResults(result, displaySize)
        );
        faceapi.draw.drawFaceExpressions(
          canvasData,
          faceapi.resizeResults(result, displaySize),
          minProbability
        );
        if (canvasCont.current instanceof HTMLDivElement) {
          // Remove existing children before appending
          while (canvasCont.current.firstChild) {
            canvasCont.current.removeChild(canvasCont.current.firstChild);
          }

          canvasCont.current.appendChild(canvasData);
        }
        videoFrame.dispose();
      }
    } catch (error) {
      console.error("Error detecting faces:", error);
    }
  };

  return (
    <div className="flex">
      <DefaultSidebar />
      <div className="flex-1 bg-gray-100 p-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-semibold mb-6">Video</h1>
          {videoUrl && (
            <div style={{ position: "relative" }}>
              <video
                crossOrigin="anonymous"
                onLoadedData={() => setShouldDetectFaces(true)}
                ref={videoCont}
                width="640"
                height="360"
                controls
                style={{ marginBottom: "16px", zIndex: 2 }} // Ensure higher z-index
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div
                ref={canvasCont}
                style={{
                  position: "absolute",
                  top: "90px",
                  right: "40px",
                  zIndex: 0, // Lower z-index than video controls
                }}
              ></div>
              {imageResult.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    zIndex: 1, // Lower z-index than the video controls
                    background: "rgba(255, 255, 255, 0.8)",
                    padding: "8px",
                    borderRadius: "8px",
                  }}
                >
                  <p>alignedRect: {imageResult[0]["alignedRect"]["_score"]}</p>
                  <p>Detection: {imageResult[0]["detection"]["_score"]}</p>
                  <p>Age: {ageGender?.age}</p>
                  <p>Gender: {ageGender?.gender}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
