import os
import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import joblib
from image_processor import process_image_folder

def preprocess_text(text):
    """Clean and preprocess email text"""
    # Convert to lowercase
    text = text.lower()
    # Remove special characters and numbers
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    # Remove extra whitespace
    text = ' '.join(text.split())
    return text

def load_emails_from_folder(folder_path, label):
    """Load all email files from a folder and assign them a label"""
    emails = []
    labels = []
    
    if not os.path.exists(folder_path):
        print(f"Warning: Folder {folder_path} does not exist")
        return emails, labels
    
    for filename in os.listdir(folder_path):
        if filename.endswith('.txt'):
            file_path = os.path.join(folder_path, filename)
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
                    email_content = file.read()
                    emails.append(preprocess_text(email_content))
                    labels.append(label)
            except Exception as e:
                print(f"Error reading file {filename}: {e}")
    
    return emails, labels

def train_spam_model():
    """Train spam detection model using local email samples (text and images)"""
    print("Starting spam detection model training...")
    
    # Load spam emails from text files
    spam_emails, spam_labels = load_emails_from_folder('emails/spam', 'spam')
    print(f"Loaded {len(spam_emails)} spam emails from text files")
    
    # Load spam emails from image files
    spam_images, spam_image_labels = process_image_folder('emails/spam', 'spam')
    print(f"Loaded {len(spam_images)} spam emails from image files")
    
    # Load normal emails from text files
    normal_emails, normal_labels = load_emails_from_folder('emails/normal', 'normal')
    print(f"Loaded {len(normal_emails)} normal emails from text files")
    
    # Load normal emails from image files
    normal_images, normal_image_labels = process_image_folder('emails/normal', 'normal')
    print(f"Loaded {len(normal_images)} normal emails from image files")
    
    # Combine all emails and labels (text + images)
    all_emails = spam_emails + spam_images + normal_emails + normal_images
    all_labels = spam_labels + spam_image_labels + normal_labels + normal_image_labels
    
    if len(all_emails) < 10:
        print("Error: Need at least 10 email samples to train the model")
        print("Please add more .txt files to the emails/spam and emails/normal folders")
        return False
    
    print(f"Total emails for training: {len(all_emails)}")
    
    # Create DataFrame
    df = pd.DataFrame({
        'email': all_emails,
        'label': all_labels
    })
    
    # Convert text to numerical features using TF-IDF
    print("Converting emails to numerical features...")
    vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
    X = vectorizer.fit_transform(df['email'])
    
    # Convert labels to binary (0 for normal, 1 for spam)
    y = df['label'].map({'normal': 0, 'spam': 1})
    
    # Split data into training and testing sets
    if len(all_emails) >= 4:
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
    else:
        # If we have very few samples, use all for training
        X_train, X_test, y_train, y_test = X, X, y, y
    
    # Train the model
    print("Training Naive Bayes model...")
    model = MultinomialNB()
    model.fit(X_train, y_train)
    
    # Make predictions and evaluate
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"\nModel Performance:")
    print(f"Accuracy: {accuracy:.2f}")
    print(f"Classification Report:")
    print(classification_report(y_test, y_pred, target_names=['Normal', 'Spam']))
    
    # Save the model and vectorizer
    print("Saving model and vectorizer...")
    joblib.dump(model, 'spam_model.pkl')
    joblib.dump(vectorizer, 'vectorizer.pkl')
    print("Model saved successfully!")
    
    return True

if __name__ == '__main__':
    success = train_spam_model()
    if success:
        print("\n✅ Training completed successfully!")
        print("You can now run the Flask app with: python app.py")
    else:
        print("\n❌ Training failed. Please check the error messages above.")
