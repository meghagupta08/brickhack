from flask import Flask
from flask_restful import Resource, Api, reqparse
import pandas as pd



app = Flask(__name__)
api = Api(app)



class Recommendations(Resource):
    pass


api.add_resource(Recommendations,'/eventsRecommendations')



if __name__ == '__main__':
    app.run()