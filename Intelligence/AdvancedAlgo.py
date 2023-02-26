import tensorflow as tf
from transformers import BertTokenizer, TFBertModel
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity


# Load event data
events = pd.read_csv("event_data.csv")

# Split the data into training and testing sets
train, test = train_test_split(events, test_size=0.2, random_state=42)

# Load the BERT tokenizer and model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
bert_model = TFBertModel.from_pretrained('bert-base-uncased')

# Define a function to preprocess text with BERT
def preprocess(text):
    # Tokenize the text
    tokens = tokenizer.encode_plus(text, add_special_tokens=True, max_length=128, truncation=True, padding='max_length', return_attention_mask=True, return_token_type_ids=False, return_tensors='tf')
    
    # Pass the tokens through BERT to get the embeddings
    embeddings = bert_model(tokens)['pooler_output']
    
    return embeddings.numpy()

# Preprocess the event descriptions for training and testing
train_embeddings = np.array([preprocess(text) for text in train['eventDesc']])
test_embeddings = np.array([preprocess(text) for text in test['eventDesc']])

# Define a function to recommend events
def recommend_events(category, description):
    # Filter the training set to only include events with the given category
    category_train = train[train["category"] == category]
    
    # Preprocess the input description
    description_embedding = preprocess(description)
    
    # Calculate cosine similarity between the input description and the training set
    similarities = cosine_similarity(description_embedding, train_embeddings[category_train.index]).squeeze()
    
    # Find the indices of the 5 most similar events
    indices = np.argsort(similarities)[-5:]
    
    # Return the titles of the recommended events
    return category_train.iloc[indices]["title"]

# Example usage

if __name__== "__main__":

    category = "Music"
    description = "Come listen to the sounds of our jazz quartet!"
    recommended_events = recommend_events(category, description)
    print(recommended_events)