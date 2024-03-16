from flask import Flask, render_template, request, jsonify
import torch
from model import SimpleCNN
from torchvision import transforms
from PIL import Image
import io

app = Flask(__name__)

# Load the trained model
model = SimpleCNN()
model.load_state_dict(torch.load('./mnist_cnn.pth', map_location=torch.device('cpu')))
model.eval()

def transform_image(image_bytes):
    my_transforms = transforms.Compose([
        transforms.Grayscale(num_output_channels=1),
        transforms.Resize((28, 28)),
        transforms.ToTensor(),
        transforms.Normalize((0.5,), (0.5,))  # Match this with your training
    ])
    image = Image.open(io.BytesIO(image_bytes))
    return my_transforms(image).unsqueeze(0)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Ensure you're extracting the image correctly
        file = request.files.get('image')  # Use .get to avoid KeyError
        if not file:
            return jsonify({'error': 'No file provided'}), 400

        img_bytes = file.read()
        tensor = transform_image(img_bytes)
        outputs = model(tensor)
        _, predicted = torch.max(outputs.data, 1)
        prediction = predicted.item()
        return jsonify({'digit': prediction})

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Consider specifying a port if 5000 is often in use
