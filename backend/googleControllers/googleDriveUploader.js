const { google } = require("googleapis");
const fs = require("fs");
// Load your JSON key file
const keyFile = "googleControllers/summative3-399102-5737109b614d.json";

// Initialize the Google Drive API client
const drive = google.drive({
  version: "v3",
  auth: new google.auth.GoogleAuth({
    keyFile,
    scopes: ["https://www.googleapis.com/auth/drive"],
  }),
});

// Function to upload a file to Google Drive
async function uploadToGoogleDrive(filePath, fileName) {
  console.log(uploadToGoogleDrive);
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: "image/png",
        parents: ["1izU-EE8-0MgX_R8Spg8DhIvzLcV0xwef"],
      },
      media: {
        mimeType: "image/png",
        body: fs.createReadStream(filePath),
      },
    });
    const file = response.data;
    const webViewLink = `https://drive.google.com/uc?id=${file.id}`;
    console.log(`Uploaded ${fileName} to Google Drive: ${webViewLink}2`);
    return webViewLink; // Returns the ID of the uploaded file
  } catch (error) {
    console.error("Error uploading to Google Drive:", error);
    return null;
  }
}

module.exports = {
  uploadToGoogleDrive,
};
