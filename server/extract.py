import pandas as pd
import joblib
from pymongo import MongoClient
import schedule
import time

# Load the trained model
model_filename = 'xgb_model_market_price.pkl'
model = joblib.load(model_filename)

# Connect to the MongoDB cluster
client = MongoClient('mongodb+srv://msupran17:supran@supran.afauf7y.mongodb.net/?retryWrites=true&w=majority&appName=Supran')

# Specify the database and collections
db = client['Admin01']
cards_collection = db['cards']
colors_collection = db['colors']
materials_collection = db['materials']
features_collection = db['features']

# Function to fetch frequency from the corresponding collection
def get_frequency(collection, attribute_name):
    doc = collection.find_one({"name": attribute_name})
    if doc:
        return doc.get("value", 0)  # Default to 0 if 'value' is missing
    return 0

# Main task function to process documents
def process_documents():
    print("Running scheduled task...")

    # Retrieve all documents in the cards collection
    documents = cards_collection.find()

    # Iterate through each document
    for document in documents:
        print("\nProcessing document:")
        for key, value in document.items():
            print(f"{key}: {value}")

        # Ensure all required fields are present in the document
        try:
            # Fetch frequencies dynamically
            color_frequency = get_frequency(colors_collection, document.get('Color', 'Unknown'))
            material_frequency = get_frequency(materials_collection, document.get('Material', 'Unknown'))
            feature_frequency = get_frequency(features_collection, document.get('Feature', 'Unknown'))

            # Prepare the input data for prediction
            input_data = {
                'Base Price': float(document.get('Base_Price', 0)),  # Default to 0 if missing
                'Stock': int(document.get('Stock', 0)),
                'No_of_Reviewers': int(document.get('No_of_Reviewers', 0)),
                'Pieces sold': int(document.get('Pieces_sold', 0)),
                'Feature_Frequency': feature_frequency,
                'Material_Frequency': material_frequency,
                'Color_Frequency': color_frequency,
                'Gender': int(document.get('Gender', 0))
            }

            # Convert input data to a DataFrame
            input_df = pd.DataFrame([input_data])

            # Predict the Market Price using the trained model
            predicted_market_price = model.predict(input_df)
            predicted_market_price_int = int(round(predicted_market_price[0]))  # Convert to integer
            print("Predicted Market Price (as integer):", predicted_market_price_int)

            # Update the document in the database with the predicted price as Market Price
            update_data = {
                'Market_Price': predicted_market_price_int
            }
            cards_collection.update_one({'_id': document['_id']}, {"$set": update_data})
            print("Database updated with new Market Price for document.")

        except TypeError as e:
            print(f"Error converting document fields to correct types: {e}")

# Scheduler setup
schedule.every(20).seconds.do(process_documents)  # Runs the task every 20 seconds

# Keep the scheduler running
print("Scheduler is running...")
while True:
    schedule.run_pending()
    time.sleep(1)
