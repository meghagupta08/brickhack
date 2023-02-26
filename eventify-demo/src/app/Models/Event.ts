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
        eventID: number;
        eventName: string;
        eventDesc: string;
        event_type_id: number;
        location_type_id: number;
        startdate: Date;
        enddate: Date;
        eventduration: number;
        eventCapacity: number;
        major_type_id: number;
        event_type:string;
      }