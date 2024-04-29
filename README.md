# Digitizer

A Digit Recognition Flask-based Web Application that utilizes a Convolutional Neural Network (CNN) model, trained on the MNIST dataset, to recognize handwritten digits drawn by the user. It showcases the integration of a PyTorch machine learning model with a web frontend, allowing for real-time digit recognition.

## Features

- **Real-time Digit Recognition**: Users can draw a digit on the canvas, and the application predicts which digit it is.
- **PyTorch Integration**: Utilizes a CNN model built and trained using PyTorch, demonstrating how machine learning models can be integrated into web applications.
- **Flask Backend**: A lightweight Flask application serves as the backend, handling image processing and model inference.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.6 or higher
- pip and venv

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/txhno/digit-recognition-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd digit-recognition-app
   ```

3. Create a virtual environment and activate it:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

4. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

### Training the Model

Before running the Flask application, you need to train the CNN model using the MNIST dataset. This step creates the `mnist_cnn.pth` file, which the Flask app uses to predict digits.

1. Ensure you are still in the project's root directory.
2. Run the training script:
   ```bash
   python train.py
   ```
   This script will train the model and save it to the file `mnist_cnn.pth` in the project directory.

### Usage

1. Run the Flask application:
   ```bash
   python app.py
   ```

2. Open a web browser and navigate to `http://localhost:5000` to access the application.

3. Use the canvas to draw a digit (0-9) and click "Submit" to see the model's prediction.

## Built With

- [PyTorch](https://pytorch.org/) - The machine learning framework used for building the CNN model.
- [Flask](https://flask.palletsprojects.com/) - The web framework used for the application backend.
- [HTML/CSS/JavaScript](#) - Used for the frontend interface.

## Authors

- **Roshan Warrier** - *Initial work* - [txhno](https://github.com/txhno)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
