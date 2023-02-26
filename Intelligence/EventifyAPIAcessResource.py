import requests
import json

class APIController:

    def getAllEventList():
        response = requests.get('http://127.0.0.1:5000//getAllEvents').json #Replace the url with evenify urls
        return response


    if __name__ == '__main__':
        getAllEventList()