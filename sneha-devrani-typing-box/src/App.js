import React, { useState } from "react";
import MQTT from "mqtt/dist/mqtt";

function App() {
  const [rollNo, setRollNo] = useState("");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const client = MQTT.connect("tcp://broker.hivemq.com");
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    const words = event.target.value.split(" ");

    words.forEach((word) => {
      // client.publish("words", word);
      client.publish("SnehasGrowth", word);
    });
  };

  return (
    <div>
      <form>
        <label>
          Roll No:
          <input
            type="text"
            value={rollNo}
            onChange={(event) => setRollNo(event.target.value)}
          />
        </label>
        <br />
        <label>
          Image:
          <input type="file" onChange={handleImageChange} />
        </label>
      </form>
      <br />
      <textarea value={text} onChange={handleTextChange} />
    </div>
  );
}

export default App;
