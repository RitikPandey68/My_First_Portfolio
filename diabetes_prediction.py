import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# Load dataset
diabetes_dataset = pd.read_csv('diabetes.csv')

# Separate features and target
X = diabetes_dataset.drop(columns='Outcome', axis=1)
Y = diabetes_dataset['Outcome']

# Standardize features
scaler = StandardScaler()
scaler.fit(X)
standardized_data = scaler.transform(X)
X = standardized_data

# Split data
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=2)

# Train SVM model
classifier = SVC(kernel='linear')
classifier.fit(X_train, Y_train)

# Evaluate model
train_pred = classifier.predict(X_train)
train_accuracy = accuracy_score(train_pred, Y_train)
test_pred = classifier.predict(X_test)
test_accuracy = accuracy_score(test_pred, Y_test)

print(f'Training Accuracy: {train_accuracy:.2f}')
print(f'Testing Accuracy: {test_accuracy:.2f}')

# Prediction function
def predict_diabetes(input_data):
    # Convert to numpy array and reshape
    input_array = np.asarray(input_data).reshape(1, -1)
    
    # Standardize input
    std_data = scaler.transform(input_array)
    
    # Make prediction
    prediction = classifier.predict(std_data)
    
    if prediction[0] == 0:
        return 'The person is not diabetic'
    else:
        return 'The person is diabetic'

# Example usage
if __name__ == '__main__':
    # Example input data (replace with actual values)
    example_input = [6, 148, 72, 35, 0, 33.6, 0.627, 50]
    print(predict_diabetes(example_input))
