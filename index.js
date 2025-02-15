const express = require("express");
const { YTDL } = require("ytdl-easy");

const app = express();
const port = 300
app.get("/", ()=>{
    res.send("Welcome to the YouTube Video Downloader API!");
})
// Sample endpoint for the API to download a video
app.get("/download", async (req, res) => {
  // Get the YouTube URL from the query parameters
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

// Start the server
export default app;