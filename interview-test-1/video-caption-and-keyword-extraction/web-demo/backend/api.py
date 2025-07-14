import io
import base64
from PIL import Image, UnidentifiedImageError
from flask_cors import CORS
from flask import Flask, request, jsonify
from transformers import BlipProcessor, BlipForConditionalGeneration
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)
CORS(app)

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

def generate_caption(image):
    inputs = processor(image, return_tensors="pt")
    output = model.generate(**inputs, max_new_tokens=30)
    caption = processor.decode(output[0], skip_special_tokens=True)

    return caption

@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        image_data = request.json.get('image')
        if not image_data:
            return jsonify({"error": "No image data provided"}), 400

        image_data = image_data.split(",")[1]
        img_data = base64.b64decode(image_data)

        try:
            image = Image.open(io.BytesIO(img_data)).convert("RGB")
        except UnidentifiedImageError:
            return jsonify({"error": "Invalid image data"}), 400

        caption = generate_caption(image)
        return jsonify({"caption": caption}), 200

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    
def extract_keywords_tfidf(captions):
    vectorizer = TfidfVectorizer(stop_words = 'english')
    tfidf_matrix = vectorizer.fit_transform(captions)

    feature_names = vectorizer.get_feature_names_out()
    scores = tfidf_matrix.sum(axis = 0).A1
    
    sorted_indices = scores.argsort()[::-1]
    sorted_keywords = [(feature_names[i], scores[i]) for i in sorted_indices]
    
    keywords = [keyword for keyword, score in sorted_keywords]
    
    return keywords

@app.route('/keywords_extraction', methods=['POST'])
def keywords_extraction():
    captions = request.json.get('captions')
    keywords = extract_keywords_tfidf(captions)

    if captions:
        return jsonify({"status": "success", "keywords": keywords}), 200
    
    return jsonify({"status": "error", "message": "No captions received!"}), 400

if __name__ == '__main__':
    app.run(debug = True)