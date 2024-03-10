import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Canvas() {
  const [color, setColor] = useState('black');
  const [pixeldata, setPixeldata] = useState({
    pixel_id: null,
    pixel_color: color,
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
      socket.off('pixel-data');
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
          onMouseDown={() => changePixelColor(index)}
          onDoubleClick={() => resetPixelColor(index)}
        ></div>
      );
    }
    return pixels;
  }

  function changePixelColor(pixel_index) {
    let pix = document.getElementById(pixel_index);
    if (pix) {
      pix.style.backgroundColor = color;
    }

    // Use the callback function to ensure emission after state update
    setPixeldata((prevData) => {
      const updatedData = {
        ...prevData,
        pixel_id: pixel_index,
        pixel_color: color,
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

    // Emit the 'pixel-data' event only when the color changes
    const updatedData = {
      pixel_id: pixel_index,
      pixel_color: 'white',
    };

    // Use the callback function to ensure emission after state update
    setPixeldata((prevData) => {
      const mergedData = {
        ...prevData,
        ...updatedData,
      };
      socket.emit('pixel-data', mergedData);
      return mergedData;
    });

    // Remove the 'pixel-data' event listener to avoid duplicates
    socket.off('pixel-data');
  }

  function pickColor(e) {
    const newColor = e.target.value;
    if (newColor !== color) {
      setColor(newColor);
      // Emit the 'pixel-data' event only when the color changes
      socket.emit('pixel-data', {
        pixel_id: pixeldata.pixel_id,
        pixel_color: newColor,
      });
    }
  }

  return (
    <>
      <div className='tool_container'>
        <input onInput={pickColor} type='color' />
      </div>
      <div className='canvas_container'>
        <div className='canvas'>{pixelrender()}</div>
      </div>
    </>
  );
}
