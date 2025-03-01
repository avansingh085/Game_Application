import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { motion } from "framer-motion";

const socket = io(""); // Replace with your backend URL

const VideoCall = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [isLarge, setIsLarge] = useState(false);
    const roomId = "testRoom";
    
    useEffect(() => {
        let pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            localVideoRef.current.srcObject = stream;
            stream.getTracks().forEach(track => pc.addTrack(track, stream));
        });

        socket.emit("join-room", roomId, socket.id);

        socket.on("user-connected", async (userId) => {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.emit("offer", { to: userId, offer });
        });

        socket.on("offer", async ({ from, offer }) => {
            await pc.setRemoteDescription(offer);
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            socket.emit("answer", { to: from, answer });
        });

        socket.on("answer", async ({ answer }) => {
            await pc.setRemoteDescription(answer);
        });

        socket.on("ice-candidate", async ({ candidate }) => {
            await pc.addIceCandidate(candidate);
        });

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("ice-candidate", { to: roomId, candidate: event.candidate });
            }
        };

        pc.ontrack = (event) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        return () => {
            socket.off("user-connected");
            socket.off("offer");
            socket.off("answer");
            socket.off("ice-candidate");
        };
    }, []);

    return (
        <div className="z-50 flex flex-col items-center bg-transparent text-white">
            <motion.div
                className="relative cursor-pointer"
                drag
                dragConstraints={{ top: -300, left: -300, right: 300, bottom: 300 }}
                onDoubleClick={() => setIsLarge(!isLarge)}
                style={{ width: isLarge ? "80%" : "30%" }}
            >
                <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    className="border-2 border-blue-500 rounded-lg w-full"
                />
            </motion.div>
            <motion.div
                className="absolute bottom-5 right-5 cursor-pointer"
                drag
                onDoubleClick={() => setIsLarge(!isLarge)}
                style={{ width: isLarge ? "80%" : "30%" }}
            >
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="border-2 border-green-500 rounded-lg w-full"
                />
            </motion.div>
        </div>
    );
};

export default VideoCall;
