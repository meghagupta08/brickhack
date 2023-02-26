import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import NearestNeighbors

# Load event data
events = pd.read_csv("DataSet/event_test.csv")

# Create TF-IDF vectorizer
vectorizer = TfidfVectorizer()

# Fit the vectorizer on the event descriptions
descriptions = events["eventDesc"]
vectorizer.fit(descriptions)

# Transform the event descriptions into TF-IDF vectors
description_vectors = vectorizer.transform(descriptions)

# Create a NearestNeighbors model
knn_model = NearestNeighbors(n_neighbors=5, algorithm="brute", metric="cosine")

# Fit the model on the description vectors
knn_model.fit(description_vectors)

# Define a function to recommend events
def recommend_events(category, description):
    # Find the index of the event with the given category
    category_index = events[events["category"] == category].index[0]
    
    # Convert the description into a TF-IDF vector
    description_vector = vectorizer.transform([description])
    
    # Find the indices of the 5 most similar events
    _, indices = knn_model.kneighbors(description_vector)
    print("indices",indices)
    print(type(indices))
    
    # Filter out the index of the event with the given category
    # indices = [i for i in indices[0] if i != category_index]
    
    # Return the titles of the recommended events
    print("events",events.shape)
    print("Event Type",type(events))
    return events.iloc[indices[0]]

# Example usage

if __name__== "__main__":
    category = "Education"
    description = "Playing Guitar!"
    recommended_events = recommend_events(category, description)
    print(recommended_events)
    recommended_events['category'] = pd.Categorical(recommended_events['category'], ["Education"])
    sorted_events =  recommended_events.sort_values("category")
    print(sorted_events)
    recommended_events_list = sorted_events.values.tolist()
    print(recommended_events_list)
