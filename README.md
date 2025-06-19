# Project RHPA - Animal Safety AI

## 🚀 Overview
Project RHPA (Road Hazard Prevention for Animals) is an AI-powered system designed to detect animals in high-risk zones using deep learning models. This project compares **DenseNet121* * and **EfficientNetB3** models for animal safety predictions.

## ✨ Features
- **Deep Learning Analysis:** Uses **DenseNet121** and **EfficientNetB3** for animal detection.
- **Image Prediction:** Upload an image to classify and predict high-risk animal presence.
- **Video Analysis:** Upload a video for processing and detection of animals in road hazard zones.
- **Flask Web Interface:** A simple web-based UI built with Flask and HTML for user interaction.

## 📁 Repository Structure
```
📂 Project-RHPA
│── app.py               # Flask backend for handling predictions
│── index.html           # Frontend interface for file upload & analysis
│── models/
│   ├── densenet121_model.pth   # Trained DenseNet121 model
│   ├── efficientnetb3_model.pth  # Trained EfficientNetB3 model
│── uploads/             # Folder to store uploaded & processed files
│── static/              # CSS & JS files (if applicable)
│── templates/           # HTML files (if using Flask's template rendering)
└── README.md            # Project Documentation
```

## 🛠️ Setup Instructions
### 1️⃣ Install Dependencies
Ensure you have Python 3.8+ installed. Then, install the required packages:
```sh
pip install flask torch torchvision numpy pandas
```

### 2️⃣ Run the Flask App
```sh
python app.py
```
The server will start, and you can access the web app at:
```
http://127.0.0.1:5000/
```

## 🎯 How It Works
1. **Upload an Image:** The system processes the image using **DenseNet121** and **EfficientNetB3** and returns predictions.
2. **Upload a Video:** The AI analyzes the video and highlights potential high-risk animals detected in road hazard areas.
3. **View Results:** The processed image/video is displayed with prediction details.

## 🏆 Model Comparisons
| Model            | Accuracy | Processing Speed |
|----------------|----------|----------------|
| DenseNet121     | High     | Moderate      |
| EfficientNetB3  | Very High | Fast         |

## 💡 Future Enhancements
- Improve detection accuracy with **YOLOv5**.
- Implement real-time streaming support.
- Deploy as a cloud-based API service.

## 🔗 Contributing
Want to contribute? Feel free to fork the repository, create a new branch, and submit a pull request!

## 📜 License
This project is licensed under the **MIT License**.

---
🚀 **Project RHPA** - Saving Animals, One Prediction at a Time!

