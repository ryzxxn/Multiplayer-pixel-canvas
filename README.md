# Realtime Pixel Drawing Canvas with WebSocket Integration

## Deployed Application

The application is deployed and can be accessed [Pixel-io](https://pixel-io.netlify.app/). Please note that due to the free tier hosting of the backend on Render.com, it may take around 40-50 seconds for the API to initialize. Once started, it should work as intended.

## Overview

This repository houses a pixel drawing canvas application that utilizes WebSockets to synchronize pixel changes in real-time across all connected clients. The frontend is built with React, and the backend is powered by Node.js, Express, and WebSocket technology. The backend is hosted on Render.com using the free tier. The project was initiated to explore the fascinating world of real-time interactions, learn WebSocket concepts, and understand the technology's advantages and disadvantages.

## Features

1. **Real-time Interaction:** Changes made to any pixel color by one user are instantly communicated to all other connected clients, providing a seamless and collaborative drawing experience.

2. **Color Diversity:** Users can use different colors to paint pixels, enhancing the creative aspect of the pixel drawing canvas.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express, WebSocket
- **Backend Hosting:** Render.com (Free Tier)

- ## Why?

The project was initiated to explore the cool concept of real-time interactions and to delve into the specifics of WebSocket technology. Choosing Render.com for backend hosting on the free tier offers a cost-effective solution for the infrastructure.

## Features and Future Plans

- **Real-time Interaction:** Achieved through WebSocket technology.
- **Color Diversity:** Users can use different colors for pixel painting.
- **Future Plans:**
  1. **Concurrency Implementation:** Allow users to resume drawing from where they left off.
  2. **Canvas Size Increase:** Expand the canvas size to accommodate more creative possibilities.

## Lessons Learned

1. **Race Condition Handling:** Addressing race conditions that arise when two clients attempt to update the same pixel simultaneously.
2. **Optimized Data Flow:** Instead of sending the entire canvas state, each pixel is associated with a unique pixel_id and pixel_color, optimizing data flow and reducing bandwidth usage.
