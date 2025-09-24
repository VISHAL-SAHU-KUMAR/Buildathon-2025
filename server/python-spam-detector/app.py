from flask import Flask, request, jsonify
import joblib
import re
import os
from werkzeug.utils import secure_filename
from image_processor import extract_text_from_image
import tempfile

# Initialize Flask app
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Allowed image extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Load the pre-trained model and vectorizer
try:
    model = joblib.load('spam_model.pkl')
    vectorizer = joblib.load('vectorizer.pkl')
    print("Model and vectorizer loaded successfully!")
except FileNotFoundError:
    model = None
    vectorizer = None
    print("Model not found. Please train the model first using: python train_local_model.py")

# Preprocessing function (same as used in training)
def preprocess_text(text):
    """Clean and preprocess email text - same as training"""
    # Convert to lowercase
    text = text.lower()
    # Remove special characters and numbers
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    # Remove extra whitespace
    text = ' '.join(text.split())
    return text

@app.route('/predict', methods=['POST'])
def predict():
    if not model or not vectorizer:
        return jsonify({'error': 'Model not trained yet. Please train the model first using: python train_local_model.py'}), 500

    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'Invalid input. Please provide text.'}), 400

    email_text = data['text']
    preprocessed_text = preprocess_text(email_text)
    vectorized_text = vectorizer.transform([preprocessed_text])
    prediction = model.predict(vectorized_text)
    probability = model.predict_proba(vectorized_text)[0]

    result = 'spam' if prediction[0] == 1 else 'normal'
    confidence = max(probability) * 100

    return jsonify({
        'prediction': result,
        'confidence': f'{confidence:.1f}%',
        'is_spam': bool(prediction[0])
    })

@app.route('/predict-image', methods=['POST'])
def predict_image():
    if not model or not vectorizer:
        return jsonify({'error': 'Model not trained yet. Please train the model first using: python train_local_model.py'}), 500

    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        try:
            # Save uploaded file temporarily
            with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_file:
                file.save(temp_file.name)
                
                # Extract text from image
                extracted_text = extract_text_from_image(temp_file.name)
                
                # Clean up temp file
                os.unlink(temp_file.name)
                
                if not extracted_text or len(extracted_text.strip()) < 10:
                    return jsonify({'error': 'Could not extract meaningful text from image'}), 400
                
                # Process extracted text
                preprocessed_text = preprocess_text(extracted_text)
                vectorized_text = vectorizer.transform([preprocessed_text])
                prediction = model.predict(vectorized_text)
                probability = model.predict_proba(vectorized_text)[0]

                result = 'spam' if prediction[0] == 1 else 'normal'
                confidence = max(probability) * 100

                return jsonify({
                    'prediction': result,
                    'confidence': f'{confidence:.1f}%',
                    'is_spam': bool(prediction[0]),
                    'extracted_text': extracted_text[:500] + '...' if len(extracted_text) > 500 else extracted_text
                })
                
        except Exception as e:
            return jsonify({'error': f'Error processing image: {str(e)}'}), 500
    else:
        return jsonify({'error': 'Invalid file type. Please upload an image file.'}), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'running',
        'model_loaded': model is not None,
        'vectorizer_loaded': vectorizer is not None
    })

if __name__ == '__main__':
    app.run(port=5001, debug=True)
