import cv2
import pytesseract
from PIL import Image
import numpy as np
import os

def extract_text_from_image(image_path):
    """Extract text from email screenshot using OCR"""
    try:
        # Read image using OpenCV
        img = cv2.imread(image_path)
        
        if img is None:
            return None
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Apply noise reduction and enhance text
        denoised = cv2.medianBlur(gray, 3)
        
        # Apply threshold to get better text recognition
        _, thresh = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        # Use pytesseract to extract text
        text = pytesseract.image_to_string(thresh, config='--psm 6')
        
        return text.strip()
        
    except Exception as e:
        print(f"Error processing image {image_path}: {e}")
        return None

def process_image_folder(folder_path, label):
    """Process all images in a folder and extract text"""
    emails = []
    labels = []
    
    if not os.path.exists(folder_path):
        print(f"Warning: Folder {folder_path} does not exist")
        return emails, labels
    
    # Supported image formats
    image_extensions = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.gif']
    
    for filename in os.listdir(folder_path):
        file_ext = os.path.splitext(filename)[1].lower()
        
        if file_ext in image_extensions:
            file_path = os.path.join(folder_path, filename)
            print(f"Processing image: {filename}")
            
            extracted_text = extract_text_from_image(file_path)
            
            if extracted_text and len(extracted_text.strip()) > 10:  # Only use if we got meaningful text
                emails.append(extracted_text)
                labels.append(label)
                print(f"Extracted text from {filename}: {extracted_text[:100]}...")
            else:
                print(f"Could not extract meaningful text from {filename}")
    
    return emails, labels

def save_extracted_text(image_path, output_folder):
    """Extract text from image and save as .txt file"""
    try:
        text = extract_text_from_image(image_path)
        if text and len(text.strip()) > 10:
            # Create output filename
            base_name = os.path.splitext(os.path.basename(image_path))[0]
            output_file = os.path.join(output_folder, f"{base_name}_extracted.txt")
            
            # Save extracted text
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(text)
            
            print(f"Saved extracted text to: {output_file}")
            return output_file
        else:
            print("No meaningful text extracted from image")
            return None
    except Exception as e:
        print(f"Error saving extracted text: {e}")
        return None
