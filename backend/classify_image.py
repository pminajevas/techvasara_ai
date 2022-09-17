import tensorflow as tf
from numpy import argmax

def classify_image(image):
    model = tf.keras.models.load_model('models\lenet_classification_model.h5')
    predict_value = model.predict(image)    
    prediction = argmax(predict_value)
    return prediction