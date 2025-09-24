import pandas as pd
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, confusion_matrix
import joblib
import requests
import zipfile
import io
import os

# Download and extract the dataset
def download_and_extract_data():
    try:
        url = 'https://archive.ics.uci.edu/ml/machine-learning-databases/00228/smsspamcollection.zip'
        print('Downloading dataset...')
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        z = zipfile.ZipFile(io.BytesIO(response.content))
        print('Extracting dataset...')
        print(f"Files in zip: {z.namelist()}")
        z.extractall()
        print('Dataset downloaded and extracted.')
        return True
    except requests.exceptions.RequestException as e:
        print(f"Error downloading data: {e}")
        return False
    except zipfile.BadZipFile:
        print("Error: Downloaded file is not a valid zip file.")
        return False
    except Exception as e:
        print(f"An error occurred during download/extraction: {e}")
        return False

# Preprocessing function
def preprocess_text(text):
    ps = PorterStemmer()
    text = re.sub('[^a-zA-Z]', ' ', text).lower()
    words = text.split()
    words = [ps.stem(word) for word in words if not word in set(stopwords.words('english'))]
    return ' '.join(words)

# Train the model
def train_model():
    try:
        print("Starting model training process...")
        # Download NLTK data if not already present
        print("Checking for NLTK stopwords...")
        try:
            stopwords.words('english')
            print("Stopwords found.")
        except LookupError:
            print("Stopwords not found, downloading...")
            nltk.download('stopwords')
            print("Stopwords downloaded.")

        if not download_and_extract_data():
            print("Halting training due to data download failure.")
            return

        dataset_path = 'SMSSpamCollection'
        if not os.path.exists(dataset_path):
            print(f"Error: Dataset file '{dataset_path}' not found after extraction.")
            print(f"Current directory contents: {os.listdir('.')}")
            return

        print("Loading dataset...")
        data = pd.read_csv(dataset_path, sep='\t', names=['label', 'message'])
        print("Dataset loaded successfully.")

        print("Preprocessing data...")
        data['processed_message'] = data['message'].apply(preprocess_text)
        print("Data preprocessing complete.")

        print("Creating feature vectors...")
        vectorizer = TfidfVectorizer(max_features=5000)
        X = vectorizer.fit_transform(data['processed_message']).toarray()
        y = pd.get_dummies(data['label'], drop_first=True).values.ravel()
        print("Feature vectors created.")

        print("Splitting data...")
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=0)
        print("Data split complete.")

        print("Training model...")
        model = MultinomialNB()
        model.fit(X_train, y_train)
        print("Model training complete.")

        print("Evaluating model...")
        y_pred = model.predict(X_test)
        print(f'Accuracy: {accuracy_score(y_test, y_pred)}')
        print(f'Confusion Matrix:\n{confusion_matrix(y_test, y_pred)}')

        print("Saving model and vectorizer...")
        joblib.dump(model, 'spam_model.pkl')
        joblib.dump(vectorizer, 'vectorizer.pkl')
        print('Model and vectorizer saved successfully.')

    except Exception as e:
        print(f"An unexpected error occurred during model training: {e}")

if __name__ == '__main__':
    train_model()
