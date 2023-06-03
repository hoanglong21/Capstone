import React, { useEffect } from 'react';
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import './videoChatStyle.css';


const firebaseConfig = {
  apiKey: "AIzaSyD9Fo5y8qhokjfJ_t4Gc0Gd4DXwDC_V2tM",
  authDomain: "capstone-project-34253.firebaseapp.com",
  databaseURL: "https://capstone-project-34253-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "capstone-project-34253",
  storageBucket: "capstone-project-34253.appspot.com",
  messagingSenderId: "342570414778",
  appId: "1:342570414778:web:6f43802265129593d88883",
  measurementId: "G-0LG2E3HGPQ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

// Global State
const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

// HTML elements

const VideoChatContainer = () => {

  let webcamButton, webcamVideo, callButton, callInput, answerButton, remoteVideo, hangupButton;
  
  useEffect(() => {
    webcamButton = document.getElementById('webcamButton');
    webcamVideo = document.getElementById('webcamVideo');
    callButton = document.getElementById('callButton');
    callInput = document.getElementById('callInput');
    answerButton = document.getElementById('answerButton');
    remoteVideo = document.getElementById('remoteVideo');
    hangupButton = document.getElementById('hangupButton');
  }, [])

  let webcamButtonClick = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    remoteStream = new MediaStream();
  
    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });
  
    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
  
    webcamVideo.srcObject = localStream;
    remoteVideo.srcObject = remoteStream;
  
    callButton.disabled = false;
    answerButton.disabled = false;
    webcamButton.disabled = true;
  };

  let callButtonClick = async () => {
  // Reference Firestore collections for signaling
  const callDoc = firestore.collection('calls').doc();
  
  const offerCandidates = callDoc.collection('offerCandidates');
  const answerCandidates = callDoc.collection('answerCandidates');

  callInput.value = callDoc.id;

  // Get candidates for caller, save to db
  pc.onicecandidate = (event) => {
    event.candidate && offerCandidates.add(event.candidate.toJSON());
  };

  // Create offer
  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  await callDoc.set({ offer });

  // Listen for remote answer
  callDoc.onSnapshot((snapshot) => {
    const data = snapshot.data();
    if (!pc.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  // When answered, add candidate to peer connection
  answerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });

  hangupButton.disabled = false;
};

let answerButtonClick = async () => {
  const callId = callInput.value;
  const callDoc = firestore.collection('calls').doc(callId);
  const answerCandidates = callDoc.collection('answerCandidates');
  const offerCandidates = callDoc.collection('offerCandidates');

  pc.onicecandidate = (event) => {
    event.candidate && answerCandidates.add(event.candidate.toJSON());
  };

  const callData = (await callDoc.get()).data();

  const offerDescription = callData.offer;
  await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  };

  await callDoc.update({ answer });

  offerCandidates.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log(change);
      if (change.type === 'added') {
        let data = change.doc.data();
        pc.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
};

  return (
          <div>
              <h2>1. Start your Webcam</h2><div className="videos">
              <span>
                  <h3>Local Stream</h3>
                  <video id="webcamVideo" autoPlay playsInline></video>
              </span>
              <span>
                  <h3>Remote Stream</h3>
                  <video id="remoteVideo" autoPlay playsInline></video>
              </span>


          </div>
            <button id="webcamButton" onClick={webcamButtonClick} >Start webcam</button>
            <h2>2. Create a new Call</h2>
            <button id="callButton" onClick={callButtonClick}>Create Call (offer)</button>
            <h2>3. Join a Call</h2>
            <p>Answer the call from a different browser window or device</p>
            <input id="callInput" />
            <button id="answerButton" onClick={answerButtonClick}>Answer</button>
            <h2>4. Hangup</h2>
            <button id="hangupButton" disabled>Hangup</button>
          </div>
          
      )
}

export default VideoChatContainer