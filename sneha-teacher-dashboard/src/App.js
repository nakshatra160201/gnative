import React, { useState, useEffect } from "react";
import WebSocket from "ws";

function App() {
  const [data, setData] = useState([]);
  const ws = new WebSocket("ws://server-url");
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    setData((prevData) => [...prevData, message]);
    // Sort the data in descending order of words per minute
    setData((prevData) =>
      prevData.sort((a, b) => b.wordsPerMinute - a.wordsPerMinute)
    );
  };

  // Disconnect from the WebSocket server when the component unmounts
  useEffect(() => {
    return () => {
      ws.close();
    };
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Roll No.</th>
          <th>Image</th>
          <th>Total Words</th>
          <th>Total Characters</th>
          <th>Words/Minute</th>
          <th>Characters/Minute</th>
        </tr>
      </thead>
      <tbody>
        {data.map((student) => (
          <tr key={student.rollNo}>
            <td>{student.rollNo}</td>
            <td>
              <img src={student.image} alt="Student" />
            </td>
            <td>{student.totalWords}</td>
            <td>{student.totalCharacters}</td>
            <td>{student.wordsPerMinute}</td>
            <td>{student.charactersPerMinute}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
