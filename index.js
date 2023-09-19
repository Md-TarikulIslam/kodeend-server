const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3001; // Use any available port

app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Subscribe route
app.post("/post", async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post(
      "https://6okppdhfvmeviw6y2xonguteo40kdfni.lambda-url.eu-north-1.on.aws",
      {
        text: text,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json({
      response:response.data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
