const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { google } = require('googleapis');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

app.post('/create-sheet', async (req, res) => {
  try {
    const { templateFileId, folderId, newFileName } = req.body;

    const copyResponse = await drive.files.copy({
      fileId: templateFileId,
      requestBody: {
        name: newFileName,
        parents: [folderId],
      },
    });

    const newFileId = copyResponse.data.id;
    const fileLink = `https://docs.google.com/spreadsheets/d/${newFileId}/edit`;

    res.json({ success: true, fileLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
