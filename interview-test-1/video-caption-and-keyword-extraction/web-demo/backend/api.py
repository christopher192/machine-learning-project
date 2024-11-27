import io
import base64
from PIL import Image
from flask_cors import CORS
from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_image():
    image_data = request.json.get('image')
    return jsonify({"message": image_data}), 200

if __name__ == '__main__':
    app.run(debug = True)