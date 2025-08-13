import numpy as np

def detect_anomalies(data):
    mean = np.mean(data)
    std = np.std(data)
    threshold = 2
    anomalies = [x for x in data if abs(x - mean) > threshold*std]
    return anomalies
