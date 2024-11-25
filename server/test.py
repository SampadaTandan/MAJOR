from pymongo import MongoClient

# MongoDB connection
client = MongoClient('mongodb+srv://msupran17:supran@supran.afauf7y.mongodb.net/?retryWrites=true&w=majority&appName=Supran')

# Databases and collections
db = client['Admin01']
colors_collection = db['colors']  # Collection storing color mappings
materials_collection = db['materials']  # Collection storing material mappings
features_collection = db['features']  # Collection storing feature mappings

# Generic function to fetch the frequency of a given attribute
def get_frequency(collection, attribute_name):
    # Find the attribute document in the specified collection
    doc = collection.find_one({"name": attribute_name})
    if doc:
        return doc["value"]  # Return the frequency value
    else:
        return None  # Return None if the attribute is not found

# Input: Attribute names
input_color = "Gold"
input_material = "Metal"
input_feature = "Eyeglasses"

# Output: Corresponding frequencies
color_frequency = get_frequency(colors_collection, input_color)
material_frequency = get_frequency(materials_collection, input_material)
feature_frequency = get_frequency(features_collection, input_feature)

# Print results
if color_frequency is not None:
    print(f"The frequency for color '{input_color}' is: {color_frequency}")
else:
    print(f"Color '{input_color}' not found in the database.")

if material_frequency is not None:
    print(f"The frequency for material '{input_material}' is: {material_frequency}")
else:
    print(f"Material '{input_material}' not found in the database.")

if feature_frequency is not None:
    print(f"The frequency for feature '{input_feature}' is: {feature_frequency}")
else:
    print(f"Feature '{input_feature}' not found in the database.")

# Close the MongoDB connection
client.close()
