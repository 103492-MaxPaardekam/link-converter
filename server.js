const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5500;

const ALLOWED_HOSTS = ["acbuy.com", "cnfans.com"];

function isAllowedTarget(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return false;
    }

    const host = parsed.hostname.toLowerCase();
    return ALLOWED_HOSTS.some(
      (allowed) => host === allowed || host.endsWith(`.${allowed}`),
    );
  } catch (_error) {
    return false;
  }
}

app.use(cors());
app.use(express.static(path.join(__dirname)));

app.get("/api/fetch", async (req, res) => {
  const { url } = req.query;

  if (typeof url !== "string" || !url.trim()) {
    res.status(400).json({ error: "Missing url query parameter." });
    return;
  }

  if (!isAllowedTarget(url)) {
    res.status(400).json({
      error: "Only acbuy.com and cnfans.com URLs are allowed.",
    });
    return;
  }

  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9",
      },
    });

    const body = await response.text();

    if (!response.ok) {
      res.status(response.status).send(body);
      return;
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(body);
  } catch (error) {
    res.status(502).json({
      error: "Failed to fetch target URL.",
      details: String(error),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Local QC proxy running at http://localhost:${PORT}`);
});
