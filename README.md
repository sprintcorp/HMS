# Getting started

## Brief description

The application is an API designed to let admin create questions to get feedback from users for doctors and staff within the system.

## Features
- Create questions
- Create staff(Admin and Doctor)
- Patient registration
- Feedback system
- Reminder system

## Tools
- NodeJs
- NestJs Framework
- Typescript
- ExpressJs
- MongoDb
- Mongoose

## Login details

Application is authenticated using JWT and has an admin account that can be used to autheticate user to perform various action. 
- Email: sprintcorp7@gmail.com
- password: password 

## Project setup


Clone the repository

    git clone https://github.com/sprintcorp/HMS.git

Switch to project directory

    cd HMS/
 


Upon successful run access project frontend via link

    http://localhost:3000

Or run setup individually outside docker

(backend)

    cd HMS/backend

Install all the client side dependencies using node package manager

    npm install

Start the backend application

    npm run start:dev



### Api routes and responses

- Staff sign in `http://127.0.0.1:3000/api/v1/staff-signin` method `POST`
#### Request

    {
        "email":"sprintcorp7@gmail.com",
        "password":"password"
    }


#### Response with 200 status code

    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNwcmludGNvcnA3QGdtYWlsLmNvbSIsImlhdCI6MTY4NTM0NDEzNiwiZXhwIjoxNjg1NDMwNTM2fQ.Gb3mH1Q2RhY9wtaKXXHH_dm2PYL8z8I01d58EVa0a4Q",
      "data": {
          "id": "6471d654e013908e9ec4ef34",
          "firstname": "Frederick",
          "lastname": "Adebayo",
          "role": "admin",
          "email": "sprintcorp7@gmail.com"
      }
    }

- Create staff `http://127.0.0.1:3000/api/v1/admin/staff` method `POST` 

#### Request

    {
      "firstname":"Frederick",
      "lastname":"Adebayo",
      "email":"sprintcorp7+07@gmail.com",
      "password":"password",
      "role":"doctor"
    }
    
#### Response with 201 status code

    {
      "data": {
          "id": "647453442c3d7b98e0bb9810",
          "firstname": "Frederick",
          "lastname": "Adebayo",
          "role": "doctor",
          "email": "sprintcorp7+07@gmail.com"
      }
    }


- Update staff `http://127.0.0.1:3000/api/v1/admin/staff/:id` method `PUT` 

#### Request

    {
      "firstname":"Fred",
      "lastname":"Adebayo",
      "email":"sprintcorp7+07@gmail.com",
      "password":"password",
      "role":"doctor"
    }
    
#### Response with 200 status code

    {
      "data": {
          "id": "647453442c3d7b98e0bb9810",
          "firstname": "Frederick",
          "lastname": "Adebayo",
          "role": "doctor",
          "email": "sprintcorp7+07@gmail.com"
      }
    }

- Get all staffs `http://127.0.0.1:3000/api/v1/admin/staffs?page=2&limit=2` method `GET`
#### Response with status code 200

    {
      "data": [
          {
              "id": "6471d654e013908e9ec4ef34",
              "firstname": "Frederick",
              "lastname": "Adebayo",
              "role": "admin",
              "email": "sprintcorp7@gmail.com"
          },
          {
              "id": "6471d716d109453c00369ccc",
              "firstname": "Frederick",
              "lastname": "Adebayo",
              "role": "doctor",
              "email": "sprintcorp7+02@gmail.com"
          }
      ],
      "totalPages": 2,
      "currentPage": 1,
      "totalStaffs": 4
    }

- Get staff `http://127.0.0.1:3000/api/v1/admin/staff/:id` method `GET`

where :id is a valid staff id


#### Response with status code 200

    {
      "data": {
          "id": "6471d654e013908e9ec4ef34",
          "firstname": "Frederick",
          "lastname": "Adebayo",
          "role": "admin",
          "email": "sprintcorp7@gmail.com"
      }
    }


- Delete staff `http://127.0.0.1:3000/api/v1/admin/staff/:id` method `DELETE`

#### Response with status code 200

    {
        "data": "Staff deleted successfully"
    }

- Create question `http://127.0.0.1:3000/api/v1/admin/question` method `POST`.

#### Request

    {
      "question":"What's your intrest",
      "type":"single_choice",
      "answer":["space","sport"]
    }
    
#### Response with status code 201

    {
      "data": {
          "question": "What's your intrest",
          "type": "single_choice",
          "createdDate": "2023-05-29T07:43:25.682Z",
          "_id": "647457b8750147b1c576ab96",
          "__v": 0,
          "id": "647457b8750147b1c576ab96"
      }
    }


- Update question `http://127.0.0.1:3000/api/v1/admin/question/:id` method `PUT`.

  Where :id is a question id

#### Request

    {
        "question":"Where can nebula be found?",
        "type":"single_choice",
        "answer":["space","ocean","mountain"]
    }
    
#### Response with status code 200
    {
        "data": {
            "_id": "647457b8750147b1c576ab96",
            "question": "Where can nebula be found?",
            "type": "single_choice",
            "createdDate": "2023-05-29T07:43:25.682Z",
            "__v": 0,
            "id": "647457b8750147b1c576ab96"
        }
    }


- Get question `http://127.0.0.1:3000/api/v1/admin/questions` method `GET`.

#### Response with status code 200
    [
        {
            "_id": "64726215fad26412844bec7b",
            "question": "What is your favourite football team?",
            "type": "multiple_choice",
            "createdDate": "2023-05-27T20:03:26.179Z",
            "__v": 0,
            "answer": [
                {
                    "_id": "64726215fad26412844bec7d",
                    "answer": [
                        "aresenal",
                        "madrid",
                        "lfc"
                    ],
                    "question": "64726215fad26412844bec7b",
                    "createdDate": "2023-05-27T20:03:26.183Z",
                    "__v": 0
                }
            ],
            "id": "64726215fad26412844bec7b"
        },
        {
            "_id": "647263a5dfcc4155985942b2",
            "question": "Upload your picture",
            "type": "file",
            "createdDate": "2023-05-27T20:09:42.179Z",
            "__v": 0,
            "answer": [],
            "id": "647263a5dfcc4155985942b2"
        },
        {
            "_id": "6473716e8f009e71b9e264c8",
            "question": "What's your intrest",
            "type": "single_choice",
            "createdDate": "2023-05-28T15:20:14.452Z",
            "__v": 0,
            "answer": [
                {
                    "_id": "6473716e8f009e71b9e264ca",
                    "answer": [
                        "space",
                        "sport"
                    ],
                    "question": "6473716e8f009e71b9e264c8",
                    "createdDate": "2023-05-28T15:20:14.455Z",
                    "__v": 0
                }
            ],
            "id": "6473716e8f009e71b9e264c8"
        },
        {
            "_id": "64737f72422898744819400c",
            "question": "upload an image file",
            "type": "file",
            "createdDate": "2023-05-28T16:20:32.883Z",
            "__v": 0,
            "answer": [],
            "id": "64737f72422898744819400c"
        },
        {
            "_id": "647457b8750147b1c576ab96",
            "question": "Where can nebula be found?",
            "type": "single_choice",
            "createdDate": "2023-05-29T07:43:25.682Z",
            "__v": 0,
            "answer": [
                {
                    "_id": "647457b9750147b1c576ab98",
                    "answer": [
                        "space",
                        "ocean",
                        "mountain"
                    ],
                    "question": "647457b8750147b1c576ab96",
                    "createdDate": "2023-05-29T07:43:25.686Z",
                    "__v": 0
                }
            ],
            "id": "647457b8750147b1c576ab96"
        }
    ]



- Publish question `http://127.0.0.1:3000/api/v1/admin/publish-question` method `POST`.

  This endpoints notifies users about question creation

    
#### Response with status code 200
    {
        "data": "Question published successfully"
    }


- Patients who answered question `http://127.0.0.1:3000/api/v1/admin/patient-with-feedback` method `GET`.

  This endpoints get patients who attempted the question

    
#### Response with status code 200
    {
      "data": [
          {
              "_id": "647271d7bda8576771cac0cb",
              "firstname": "Billy",
              "lastname": "Jean",
              "email": "sprintcorp7@gmail.com"
          }
      ]
    }


- Patients who did not attemt question `http://127.0.0.1:3000/api/v1/admin/patient-without-feedback` method `GET`.

  This endpoints get users who is yet attempted the question

    
#### Response with status code 200
    {
      "data": [
          {
              "_id": "647271d7bda8576771cac0cb",
              "firstname": "Billy",
              "lastname": "Jean",
              "email": "sprintcorp7@gmail.com"
          }
      ]
    }


- Patient Feedback `http://127.0.0.1:3000/api/v1/admin/patient-feedback?patient=sprintcorp7@gmail.com` method `GET`.

  This endpoints gets feedback or answers provided to question by user

    
#### Response with status code 200
    {
      "data": [
          {
              "_id": "647392ce3c17f05366875f07",
              "answer": "aresenal, madrid",
              "type": "multiple_choice",
              "patient": "sprintcorp7@gmail.com",
              "createdDate": "2023-05-28T17:43:34.470Z",
              "__v": 0,
              "question": [
                  {
                      "_id": "64726215fad26412844bec7b",
                      "question": "What is your favourite football team?",
                      "type": "multiple_choice",
                      "createdDate": "2023-05-27T20:03:26.179Z",
                      "__v": 0
                  }
              ]
          },
          {
              "_id": "647392ce3c17f05366875f09",
              "answer": "space",
              "type": "single_choice",
              "patient": "sprintcorp7@gmail.com",
              "createdDate": "2023-05-28T17:43:34.470Z",
              "__v": 0,
              "question": [
                  {
                      "_id": "6473716e8f009e71b9e264c8",
                      "question": "What's your intrest",
                      "type": "single_choice",
                      "createdDate": "2023-05-28T15:20:14.452Z",
                      "__v": 0
                  }
              ]
          },
          {
              "_id": "647392ce3c17f05366875f08",
              "answer": "https://res.cloudinary.com/sprintcorp/image/upload/v1685295819/hms_user_response/szuhxjhy0fqjsjkjpgzt.jpg",
              "type": "file",
              "patient": "sprintcorp7@gmail.com",
              "createdDate": "2023-05-28T17:43:34.470Z",
              "__v": 0,
              "question": [
                  {
                      "_id": "647263a5dfcc4155985942b2",
                      "question": "Upload your picture",
                      "type": "file",
                      "createdDate": "2023-05-27T20:09:42.179Z",
                      "__v": 0
                  }
              ]
          },
          {
              "_id": "647392ce3c17f05366875f0a",
              "answer": "https://res.cloudinary.com/sprintcorp/image/upload/v1685295820/hms_user_response/hmhm8xpm4vk4hzzn63v8.jpg",
              "type": "file",
              "patient": "sprintcorp7@gmail.com",
              "createdDate": "2023-05-28T17:43:34.470Z",
              "__v": 0,
              "question": [
                  {
                      "_id": "64737f72422898744819400c",
                      "question": "upload an image file",
                      "type": "file",
                      "createdDate": "2023-05-28T16:20:32.883Z",
                      "__v": 0
                  }
              ]
          }
      ]
    }


- Set notification interval `http://127.0.0.1:3000/api/v1/admin/update-notification-interval` method `POST`.

#### Request

    {
      "notificationInterval":1
    }

n:b notification interval for our test and development purpose is in hours
    
#### Response with status code 201

    {
      "data": "Configuration saved"
    }



- Create patient `http://127.0.0.1:3000/api/v1/patient/register` method `POST`.

This route is public thereby allowing patient to register and have access to receive question notification when question is published

#### Request

    {
      "firstname":"Fred",
      "lastname":"Ade",
      "email":"adetimifred+02@gmail.com"
    }

    
#### Response with status code 201

    {
        "data": {
            "firstname": "Fred",
            "lastname": "Ade",
            "email": "adetimifred+03@gmail.com",
            "createdDate": "2023-05-29T08:11:41.407Z",
            "_id": "64745e4edaecb22a497004fe",
            "__v": 0
        }
    }


- Get Question `http://127.0.0.1:3000/api/v1/patient/questions` method `GET`.


#### Response with status code 200

    {
      "data": [
          {
              "_id": "64726215fad26412844bec7b",
              "question": "What is your favourite football team?",
              "type": "multiple_choice",
              "createdDate": "2023-05-27T20:03:26.179Z",
              "__v": 0,
              "answer": [
                  {
                      "_id": "64726215fad26412844bec7d",
                      "answer": [
                          "aresenal",
                          "madrid",
                          "lfc"
                      ],
                      "question": "64726215fad26412844bec7b",
                      "createdDate": "2023-05-27T20:03:26.183Z",
                      "__v": 0
                  }
              ],
              "id": "64726215fad26412844bec7b"
          },
          {
              "_id": "647263a5dfcc4155985942b2",
              "question": "Upload your picture",
              "type": "file",
              "createdDate": "2023-05-27T20:09:42.179Z",
              "__v": 0,
              "answer": [],
              "id": "647263a5dfcc4155985942b2"
          },
          {
              "_id": "6473716e8f009e71b9e264c8",
              "question": "What's your intrest",
              "type": "single_choice",
              "createdDate": "2023-05-28T15:20:14.452Z",
              "__v": 0,
              "answer": [
                  {
                      "_id": "6473716e8f009e71b9e264ca",
                      "answer": [
                          "space",
                          "sport"
                      ],
                      "question": "6473716e8f009e71b9e264c8",
                      "createdDate": "2023-05-28T15:20:14.455Z",
                      "__v": 0
                  }
              ],
              "id": "6473716e8f009e71b9e264c8"
          },
          {
              "_id": "64737f72422898744819400c",
              "question": "upload an image file",
              "type": "file",
              "createdDate": "2023-05-28T16:20:32.883Z",
              "__v": 0,
              "answer": [],
              "id": "64737f72422898744819400c"
          }
      ]
    }


- Attempt question `http://127.0.0.1:3000/api/v1/patient/questions` method `POST`.

This route is public thereby allowing patient to answer question. Formdata is used because some question might need user uploading files and screenshot of input is in the snapshot below.

#### Snapshots

    ![image](https://github.com/sprintcorp/HMS/assets/37757522/a0d2b746-4801-4615-86d8-541975096e09)
    ![image](https://github.com/sprintcorp/HMS/assets/37757522/67793031-2e3a-4785-9151-ba9899dd30f6)



    
#### Response with status code 201

    {
      "data": "Feedback saved successfully"
    }



    
### Snapshots   


   
  








