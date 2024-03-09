import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Canvas() {
    const [Color, setColor] = useState('black')
  const [pixeldata, setPixeldata] = useState({
    pixel_id: null,
    pixel_color: Color,
  });
  const socket = io.connect('http://localhost:3001');

  useEffect(() => {
    socket.on('pixel-client', (pixData) => {
      let pi = document.getElementById(pixData.pixel_id);
      if (pi) {
        pi.style.backgroundColor = pixData.pixel_color;
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('pixel-client');
    };
  }, [socket]); // Only re-run the effect if the socket connection changes

  function pixelrender() {
    let pixels = [];
    for (let index = 0; index < 2500; index++) {
      pixels.push(
        <div
          id={index}
          key={index}
          className='pixel'
          onMouseUp={() => changePixelColor(index)}
          onDoubleClick={() => resetPixelColor(index)}
        ></div>
      );
    }
    return pixels;
  }

  function changePixelColor(pixel_index) {
    let pix = document.getElementById(pixel_index);
    if (pix) {
      pix.style.backgroundColor = Color;
    }

    // Use the callback function to ensure emission after state update
    setPixeldata((prevData) => {
      const updatedData = {
        ...prevData,
        pixel_id: pixel_index,
        pixel_color: Color,
      };
      socket.emit('pixel-data', updatedData);
      return updatedData;
    });
  }

  function resetPixelColor(pixel_index) {
    let pix = document.getElementById(pixel_index);
    if (pix) {
      pix.style.backgroundColor = 'white';
    }

    // Use the callback function to ensure emission after state update
    setPixeldata((prevData) => {
      const updatedData = {
        ...prevData,
        pixel_id: pixel_index,
        pixel_color: 'white',
      };
      socket.emit('pixel-data', updatedData);
      socket.off('pixel-data')
      return updatedData;
    });
  }

    function pickColor(e) {
        setColor(e.target.value)
    }

  return (
    <>
        <div className='tool_container'>
          <input onInput={pickColor} type='color'/>
      </div>
      <div className='canvas'>{pixelrender()}</div>
    </>
  );
}
