import React, { useEffect } from 'react';
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useParams, useLocation  } from 'react-router-dom'
import {
  getDatabase,
  ref,
  child,
  push,
  update,
  onChildAdded,
  remove,
  onChildRemoved,
} from "firebase/database";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import { AES, enc } from 'crypto-js';

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

// add
// Initialize Firebase
let firebaseApp;
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.app();
}
const database = getDatabase(firebaseApp);
var myUsername;
var newPostKey 
// end of add

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
    const { call } = useParams()
    const navigate = useNavigate();
    const location = useLocation();
    

  useEffect(() => {
    webcamButton = document.getElementById('webcamButton');
    webcamVideo = document.getElementById('webcamVideo');
    callButton = document.getElementById('callButton');
    callInput = document.getElementById('callInput');
    answerButton = document.getElementById('answerButton');
    remoteVideo = document.getElementById('remoteVideo');
    hangupButton = document.getElementById('hangupButton');

    let string = localStorage.getItem("token");
    // console.log(string)
    if (string == null) {
      // TODO navigation
      navigate("/login");
    } else {
      let decode = jwt_decode(string);
      myUsername = decode.sub;
    }
    if(call != null) {
      document.getElementById('callInput').value = call;
    }
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

      //Add a bit - if
      if (remoteStream != null) {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track);
        });
      }
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

   // for short
   const searchParams = new URLSearchParams(location.search);
   const paramValue = searchParams.get('param');
   // const key = "6A576E5A7234753778217A25432A462D4A614E645267556B5870327335763879"; //256-bit && hex
 // TODO when done add to backend all of key
   var message = document.getElementById('callInput').value
   // var receiverUsername = AES.decrypt(param, key).toString(enc.Utf8);
   var receiverUsername = paramValue
 
   // save in database
   // A post entry.
   const postData = {
     sender: myUsername,
     receiver: receiverUsername,
     message: message,
     video_call: true,
   };
 
   // Get a key for a new Post.
   newPostKey = push(child(ref(database), "messages")).key;
 
   const updates = {};
   updates["/messages/" + newPostKey] = postData;
   update(ref(database), updates);
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
      // console.log(change);
      if (change.type === 'added') {
        let data = change.doc.data();
        pc.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
};

let hangupButtonClick = () => {
  // console.log("hangup")
  //  const videoEndMessage = document.getElementById('videoEndMessage');
  //   videoEndMessage.style.display = 'block';
  pc.close();
  // Add a bit - if 
  if (localStream != null) {
    localStream.getTracks().forEach((track) => track.stop());
  }
  if (remoteStream != null) {
    remoteStream.getTracks().forEach((track) => track.stop());
  }
  

  localStream = null;
  remoteStream = null;

  webcamVideo.srcObject = null;
  remoteVideo.srcObject = null;

  callButton.disabled = true;
  answerButton.disabled = true;
  hangupButton.disabled = true;
  webcamButton.disabled = false;

  // Reference Firestore collections for signaling
  const callId = callInput.value;
  if (callId) {
    const callDoc = firestore.collection('calls').doc(callId);
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');

    offerCandidates.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });

    answerCandidates.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });

    callDoc.delete();
    if(newPostKey!=null) {
      deleteMessage(newPostKey);
    }
  }
    // Wait for the connection state to transition to "disconnected"
  setTimeout(() => {
    console.log(pc.iceConnectionState); // "disconnected"
  }, 5000); // Wait for 5 seconds for the state to change

  alert("Call has disconnected, turn off");
  window.close();
};

window.addEventListener('beforeunload', function(event) {
  event.preventDefault();
  hangupButtonClick();
});

pc.oniceconnectionstatechange = (event) => {
  console.log('ICE Connection State changed: ', pc.iceConnectionState);
  
  if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'closed') {
    alert("Call has disconnected, turn off");
    window.close();
  }
};

const deleteMessage = (messageId) => {
  // console.log(self);
  // var messageId = self.getAttribute("data-id");

  const rootRef = ref(database, "messages/");
  const messageRef = child(rootRef, messageId); // Retrieve the Reference object for the message
  remove(messageRef); // Remove the message from the database
  // rootRef.child(messageId).remove();
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
            <button id="hangupButton" onClick={hangupButtonClick}>Hangup</button>
             <div id="videoEndMessage" style={{display: 'none'}}>Video end</div>
          </div>

      )
}

export default VideoChatContainer