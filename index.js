const express = require("express");
const { YTDL } = require("ytdl-easy");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the YouTube Video Downloader API!");
});

app.get("/download", async (req, res) => {
  const yturl = req.query.url;

  if (!yturl) {
    return res.status(400).json({
      message: "Error: YouTube URL is required.",
    });
  }

  try {
    const videoInfo = await YTDL(yturl);
    res.status(200).json({
      message: "Download successful",
      data: videoInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
