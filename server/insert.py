from pymongo import MongoClient

client =MongoClient('mongodb+srv://msupran17:supran@supran.afauf7y.mongodb.net/?retryWrites=true&w=majority&appName=Supran')

db=client['Admin01']
collection=db['cards']

document={"Name":"White glasses", "Market_Price":1000, "Stock":3, "No_of_Reviewers":10, "Pieces_sold":90, "Gender":1, "Feature_Frequency":607, "Material_Frequency": 2138, "Color_Frequency":1336}

inserted_document=collection.insert_one(document)

print(f"Inserted Doucment Id:{inserted_document.inserted_id}")

client.close()