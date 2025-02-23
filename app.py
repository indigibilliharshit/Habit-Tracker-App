import os
import cv2
import numpy as np
import torch
from flask import Flask, request, render_template, jsonify, send_from_directory, send_file
from ultralytics import YOLO
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input

app = Flask(__name__)

# Load CNN Models
densenet_model = load_model("best_densenet.keras")
efficientnet_model = load_model("best_efficientnet.keras")  # Fixed naming issue

# Load YOLO Model
device = "cuda" if torch.cuda.is_available() else "cpu"
yolo_model = YOLO("yolov5xu.pt").to(device)

# Define Upload Folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "mp4", "avi"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def predict_cnn(img_path, model):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)  # Preprocess input
    prediction = model.predict(img_array)[0][0]
    status = "Alive" if prediction < 0.5 else "Dead"
    return status, float(prediction)

def process_video(input_video):
    cap = cv2.VideoCapture(input_video)
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    output_video = os.path.join(app.config["UPLOAD_FOLDER"], "processed_video.mp4")
    fourcc = cv2.VideoWriter_fourcc(*"avc1")  # Use H.264 codec for better compatibility
    out = cv2.VideoWriter(output_video, fourcc, fps, (frame_width, frame_height))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        results = yolo_model(frame)
        for result in results:
            boxes = result.boxes.xyxy.cpu().numpy()
            for box in boxes:
                x_min, y_min, x_max, y_max = map(int, box)
                cv2.rectangle(frame, (x_min, y_min), (x_max, y_max), (0, 0, 255), 2)

                center_x = (x_min + x_max) / 2
                if frame_width * 0.3 < center_x < frame_width * 0.7:
                    cv2.putText(frame, "HIGH-RISK ANIMAL!", (x_min, y_min - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

        out.write(frame)

    cap.release()
    out.release()
    return output_video

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict_image", methods=["POST"])
def predict_image():
    if "file" not in request.files:
        return jsonify({"error": "No file part"})
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"})
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        densenet_result, densenet_conf = predict_cnn(filepath, densenet_model)
        efficientnet_result, efficientnet_conf = predict_cnn(filepath, efficientnet_model)

        return jsonify({
            "filename": filename,
            "densenet_result": densenet_result,
            "densenet_confidence": densenet_conf,
            "efficientnet_result": efficientnet_result,
            "efficientnet_confidence": efficientnet_conf
        })
    return jsonify({"error": "Invalid file type"})

@app.route("/predict_video", methods=["POST"])
def predict_video():
    if "file" not in request.files:
        return jsonify({"error": "No file part"})
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"})
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        try:
            processed_video = process_video(filepath)
            video_url = f"/uploads/processed_video.mp4"
            return jsonify({"video": video_url})
        except Exception as e:
            app.logger.error(f"Error processing video: {str(e)}")
            return jsonify({"error": "Error processing video"}), 500
    
    return jsonify({"error": "Invalid file type"})

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_file(os.path.join(app.config["UPLOAD_FOLDER"], filename), mimetype="video/mp4")

if __name__ == "__main__":
    app.run(debug=True)

