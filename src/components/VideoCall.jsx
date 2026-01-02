import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import io from "socket.io-client";

const VideoCall = ({ roomId }) => {
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const socketRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    const initializeConnection = async () => {
      try {
        socketRef.current = io("https://videocallbackend-pqmh.onrender.com");

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = stream;
        localVideoRef.current.srcObject = stream;

        pcRef.current = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        stream.getTracks().forEach((track) => {
          pcRef.current.addTrack(track, stream);
        });

        pcRef.current.ontrack = (event) => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        pcRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socketRef.current.emit("candidate", {
              candidate: event.candidate,
              roomId,
            });
          }
        };

        socketRef.current.emit("join", roomId);

        socketRef.current.on("offer", async (offer) => {
          await pcRef.current.setRemoteDescription(offer);
          const answer = await pcRef.current.createAnswer();
          await pcRef.current.setLocalDescription(answer);
          socketRef.current.emit("answer", { answer, roomId });
        });

        socketRef.current.on("answer", async (answer) => {
          await pcRef.current.setRemoteDescription(answer);
        });

        socketRef.current.on("candidate", async (candidate) => {
          try {
            await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (e) {
            console.error("Error adding ICE candidate:", e);
          }
        });

        socketRef.current.on("offerNeeded", async () => {
          const offer = await pcRef.current.createOffer();
          await pcRef.current.setLocalDescription(offer);
          socketRef.current.emit("offer", { offer, roomId });
        });
      } catch (error) {
        console.error("Error initializing connection:", error);
      }
    };

    initializeConnection();

    return () => {
      if (pcRef.current) pcRef.current.close();
      if (socketRef.current) socketRef.current.disconnect();
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [roomId]);

  const toggleMute = () => {
    const audioTracks = localVideoRef.current.srcObject.getAudioTracks();
    audioTracks.forEach((track) => (track.enabled = !track.enabled));
    setMuted(!muted);
  };

  const toggleVideo = () => {
    const videoTracks = localVideoRef.current.srcObject.getVideoTracks();
    videoTracks.forEach((track) => (track.enabled = !track.enabled));
    setVideoOn(!videoOn);
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
     
      <motion.video
        ref={localVideoRef}
        autoPlay
        muted
        className="absolute bg-black rounded-lg shadow-lg pointer-events-auto"
        drag
        dragConstraints={{ top: -300, left: -300, right: 300, bottom: 300 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: "150px", height: "100px" }}
      />

     
      <motion.video
        ref={remoteVideoRef}
        autoPlay
        className="absolute bg-black rounded-lg shadow-lg pointer-events-auto"
        drag
        dragConstraints={{ top: -300, left: -300, right: 300, bottom: 300 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: "150px", height: "100px" }}
      />

     
      <div className="fixed top-4 right-4 flex space-x-2 bg-black/50 p-2 rounded-lg pointer-events-auto">
        <button
          onClick={toggleMute}
          className={`px-4 py-2 rounded-lg ${muted ? "bg-red-500" : "bg-green-500"} text-white`}
        >
          {muted ? "Unmute" : "Mute"}
        </button>
        <button
          onClick={toggleVideo}
          className={`px-4 py-2 rounded-lg ${videoOn ? "bg-green-500" : "bg-red-500"} text-white`}
        >
          {videoOn ? "Stop Video" : "Start Video"}
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
