import {handwriting, results} from './handwriting.canvas.jsx'
import React, { useEffect } from 'react';

var canvas
const Draw = () => {
    useEffect(()=> {
        if(handwriting!=null) {
            canvas = new handwriting.Canvas(document.getElementById("myCanvas"));     
        } else {
        }
    }, [])


    function erase() {
        canvas.erase();
    };
    var a

    function recognition() {
        a = handwriting.recognize(canvas.trace, {}, function(result, error) {
            if (error) {
                // console.error(error);
            } else {
                // console.log(result);
                document.getElementById("result").innerHTML = result;
            }
        });
    };


  return (
      <div>
        <h1>DRAW</h1>
          <canvas id="myCanvas" width="400" height="300"></canvas>
          <button id="eraseBtn" onClick={erase}>Erase</button>
          <button id="recognizeBtn" onClick={recognition}>Recognize</button>

          <p id="result"></p>
    </div>
  );
};

export default Draw;