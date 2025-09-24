# Spam Detection Service with Image Support

This Python service uses machine learning to detect spam emails using local email samples. It supports both text files and email screenshots/images.

## Setup Instructions

1. **Install Python packages:**
   ```
   pip install -r requirements.txt
   ```

2. **Install Tesseract OCR (for image processing):**
   - Download from: https://github.com/tesseract-ocr/tesseract
   - Add to system PATH

3. **Add your email samples:**
   - Put spam email samples in: `emails/spam/`
     - Text files: `.txt` format
     - Images: `.jpg`, `.png`, `.gif`, `.bmp`, `.tiff` formats
   - Put normal email samples in: `emails/normal/`
     - Text files: `.txt` format  
     - Images: `.jpg`, `.png`, `.gif`, `.bmp`, `.tiff` formats

4. **Train the model:**
   ```
   python train_local_model.py
   ```

5. **Start the Flask server:**
   ```
   python app.py
   ```

## API Usage

### Text Analysis
**Endpoint:** `POST /predict`

**Request:**
```json
{
  "text": "Your email content here"
}
```

### Image Analysis
**Endpoint:** `POST /predict-image`

**Request:** Form data with image file
- Key: `image`
- Value: Image file (jpg, png, gif, bmp, tiff)

**Response (both endpoints):**
```json
{
  "prediction": "spam" or "normal",
  "confidence": "85.2%",
  "is_spam": true or false,
  "extracted_text": "text from image (image endpoint only)"
}
```

## Adding More Training Data

To improve accuracy:
1. Add more files to `emails/spam/` and `emails/normal/` folders
   - Text files (.txt) with email content
   - Image files (.jpg, .png, etc.) with email screenshots
2. Run `python train_local_model.py` again to retrain the model
3. Restart the Flask app

## Files Structure

- `train_local_model.py` - Trains the model using local email samples (text + images)
- `app.py` - Flask web server for predictions
- `image_processor.py` - OCR text extraction from images
- `emails/spam/` - Folder for spam email samples (text and images)
- `emails/normal/` - Folder for normal email samples (text and images)
- `spam_model.pkl` - Trained model (generated after training)
- `vectorizer.pkl` - Text vectorizer (generated after training)
