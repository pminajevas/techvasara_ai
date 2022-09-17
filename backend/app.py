import os

from flask import Flask, request, Response
from classify_image import classify_image
from process_image import process_image

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def post():
    image_data_uri = request.json['image']
    prediction = classify_image(process_image(image_data_uri))
    return Response(str(prediction).encode(), status = 200)

if __name__ == 'main':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)