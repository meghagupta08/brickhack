// "eventID": 6,
// "eventName": "Hackathon",
// "eventDesc": "Discover new ideas and strategies for success",
// "event_type_id": 3,
// "location_type_id": 2,
// "startdate": "2023-02-27 13:04:27",
// "enddate": "2023-02-27 17:04:27",
// "eventduration": 4,
// "eventCapacity": 96,
// "major_type_id": 5,
//     "event_type": "Games"

    export interface Event {
        id: number;
        eventName: string;
        eventDesc: string;
        eventType: string;
        locationType: string;
        startDate: Date;
        endDate: Date;
        eventDuration: number;
        eventCapacity: number;
        major: string;
      }
