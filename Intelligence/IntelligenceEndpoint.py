from flask import Flask, request, jsonify
import json
from EventifyAPIAcessResource import APIController as apicont
from flask_cors import CORS
import pandas as pd
import difflib


app = Flask(__name__)
CORS(app)
#api = Api(app)


# fetch this list using getAPI from the JAVA module

# fetch this list using getAPI from the JAVA module

# events=apicont.getAllEventList()

events = [
    {
        "eventID": 1,
        "eventName": "Hackathon",
        "eventDesc": "Improve your skills and advance your career",
        "event_type_id": 3,
        "location_type_id": 1,
        "startdate": "2023-03-13 13:04:27",
        "enddate": "2023-03-13 22:04:27",
        "eventduration": 9,
        "eventCapacity": 28,
        "major_type_id": 1,
        "event_type": "Games"
    },
    {
        "eventID": 2,
        "eventName": "Networking Event",
        "eventDesc": "Discover new ideas and strategies for success",
        "event_type_id": 4,
        "location_type_id": 3,
        "startdate": "2023-03-03 13:04:27",
        "enddate": "2023-03-03 16:04:27",
        "eventduration": 3,
        "eventCapacity": 52,
        "major_type_id": 2,
        "event_type": "Meetup"
    },
    {
        "eventID": 3,
        "eventName": "Networking Event",
        "eventDesc": "Discover new ideas and strategies for success",
        "event_type_id": 2,
        "location_type_id": 2,
        "startdate": "2023-03-02 13:04:27",
        "enddate": "2023-03-02 19:04:27",
        "eventduration": 6,
        "eventCapacity": 14,
        "major_type_id": 4,
        "event_type": "Party"
    },
    {
        "eventID": 4,
        "eventName": "Seminar",
        "eventDesc": "Get inspired and motivated to achieve your goals",
        "event_type_id": 3,
        "location_type_id": 2,
        "startdate": "2023-02-27 13:04:27",
        "enddate": "2023-02-27 17:04:27",
        "eventduration": 4,
        "eventCapacity": 87,
        "major_type_id": 2,
        "event_type": "Games"
    },
    {
        "eventID": 5,
        "eventName": "Hackathon",
        "eventDesc": "Meet and network with like-minded professionals",
        "event_type_id": 3,
        "location_type_id": 3,
        "startdate": "2023-03-20 13:04:27",
        "enddate": "2023-03-20 16:04:27",
        "eventduration": 3,
        "eventCapacity": 91,
        "major_type_id": 3,
        "event_type": "Games"
    },
    {
        "eventID": 6,
        "eventName": "Hackathon",
        "eventDesc": "Discover new ideas and strategies for success",
        "event_type_id": 3,
        "location_type_id": 2,
        "startdate": "2023-02-27 13:04:27",
        "enddate": "2023-02-27 17:04:27",
        "eventduration": 4,
        "eventCapacity": 96,
        "major_type_id": 5,
        "event_type": "Games"
    },
    {
        "eventID": 7,
        "eventName": "Coderhack",
        "eventDesc": "Discover new ideas and strategies for success",
        "event_type_id": 3,
        "location_type_id": 2,
        "startdate": "2023-02-27 13:04:27",
        "enddate": "2023-02-27 17:04:27",
        "eventduration": 4,
        "eventCapacity": 96,
        "major_type_id": 3,
        "event_type": "Games"
    }
]


# class Recommendations(Resource):
#  pass
# All the logic for the recommended events goes here

# Define a route for the API to recommend events based on user activity
@app.route("/getRecommendedEventsForUser", methods=["GET"])
def get_recommended_events_for_user():

    #input_event = request.json
    input_event = request.args["event"]
    input_event = json.loads(input_event)

    # Find events with the same event type as the input event
    events_by_type = [
        event for event in events if event["event_type"] == input_event["event_type"]]

    # If no events with the same event type, return None
    if not events_by_type:
        return None

    # Find the event with the closest description to the input event's description

    input_desc = input_event["eventDesc"]
    event_descs = [event["eventDesc"] for event in events_by_type]
    closest_desc = difflib.get_close_matches(
        input_desc, event_descs, n=1, cutoff=0.8)

    # If no events with a similar description, return None
    if len(closest_desc) > 0:
        closest_event = [
            event for event in events_by_type if event["eventDesc"] == closest_desc[0]]
    else:
        closest_event = events_by_type

    # # If multiple events match the closest description, choose the one with the largest capacity
    # if len(closest_event) > 1:
    #     closest_event = sorted(closest_event, key=lambda x: x["eventCapacity"], reverse=True)

    if len(closest_event) == 0:
        error_message = {"error": "No events found"}
        return jsonify(error_message), 404

    return jsonify(closest_event), 200


# api.add_resource(Recommendations,'/eventsRecommendations')


if __name__ == '__main__':
    app.run(debug=True)
