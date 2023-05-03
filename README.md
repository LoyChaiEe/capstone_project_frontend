# Learning Japanese With Waifu
### A similar app to Duolingo but adding more features like Waifu voice and also adding a writing component for users to practice writing simple anime characters

This app allows users to:
1. Authenticate themselves to gain access to the system with approved credentials. 
2. Learn the basics of Japanese (Hiragana & Katakana) and words.
3. Choose different Waifu voices as they go through the lessons.
4. Update their profile details, such as name and username and profile pictures with image upload to Firebase Storage.

## Preview 
#### Home Page
<img width="1728" alt="Screenshot-2023-04-28-at-4 21 00-PM" src="https://user-images.githubusercontent.com/108665943/235261208-416a9141-9c38-44d8-9430-94bae525c115.jpg">

#### Login Page 
<img width="1728" alt="Screenshot-2023-04-28-at-4 21 13-PM" src="https://user-images.githubusercontent.com/108665943/235261229-f50aaf28-752a-40e9-8ed1-8e670848073f.jpg">

#### Main Dashboard - Lessons
<img width="1728" alt="Screenshot-2023-04-29-at-6 03 05-AM" src="https://user-images.githubusercontent.com/108665943/235262360-1235a5d8-9636-4b36-955f-2ac3127a7c2d.jpg">

#### Profile Page 
<img width="1728" alt="Screenshot-2023-04-28-at-4 21 45-PM" src="https://user-images.githubusercontent.com/108665943/235261567-ef26466b-71ce-4ff6-a14f-e440c25fc464.jpg">


#### Profile Page - Edit Profile
<img width="1728" alt="Screenshot-2023-04-28-at-4 21 50-PM" src="https://user-images.githubusercontent.com/108665943/235261579-39e6b6e3-3229-40bb-bcde-8391199614c9.jpg">

#### Characters Page - Hiragana & Katakana
<img width="1728" alt="Screenshot-2023-04-28-at-4 21 27-PM" src="https://user-images.githubusercontent.com/108665943/235261595-f4ad0d1f-8a28-474d-b0aa-ef7b933cf454.jpg">

#### Voices Page - Different Waifu and their Voices
<img width="1728" alt="Screenshot-2023-04-28-at-4 21 56-PM" src="https://user-images.githubusercontent.com/108665943/235261617-03ce39ed-a43f-4d49-bc82-e9c76b23a0cb.jpg">

#### Meaning Questions
<img width="1728" alt="Screenshot-2023-04-29-at-5 51 39-AM" src="https://user-images.githubusercontent.com/108665943/235261758-bf253427-60b8-4cd5-8192-fd54727c2d48.jpg">

#### Matching Questions
<img width="1728" alt="Screenshot-2023-04-29-at-5 40 07-AM" src="https://user-images.githubusercontent.com/108665943/235261774-3ad262ce-1e0f-453d-ac77-d750e7684cc0.jpg">

#### Recognition Questions
<img width="1728" alt="Screenshot-2023-04-29-at-5 39 25-AM" src="https://user-images.githubusercontent.com/108665943/235261832-30e57b09-9c06-402b-9c43-329563a6f8a8.jpg">

#### Translation Questions
<img width="1728" alt="Screenshot-2023-04-29-at-6 08 03-AM" src="https://user-images.githubusercontent.com/108665943/235262336-120e01f9-3cfb-4c90-b826-57bb327fe403.jpg">

#### Writing Questions
<img width="1728" alt="Screenshot-2023-04-29-at-5 38 33-AM" src="https://user-images.githubusercontent.com/108665943/235261941-58d39e39-62f8-423c-b0bd-3cbe713b364e.jpg">


## Built with 
- ReactJS
- Auth0
- Firebase Storage 
- Express.js 
- Sequelize
- PostgreSQL
- Docker
- Voicevox (credit to Hiroshiba and the contributors, <a href="https://github.com/VOICEVOX/voicevox">github link</a>) <a href="https://github.com/VOICEVOX/voicevox_engine">VoiceVox Engine</a>(used in this project)
- Flask
- Python
- Tensorflow and other ML/AI 

## Things to Install
1. Docker
2. Python (details in Flask Repo)

## Installation of Docker and VoiceVox (Windows)

1. Follow the guide in the <a>Official Docker Desktop Website</a> to install Docker Desktop
2. Run this command in Windows Command prompt to pull Vocievox Engine. This will pull the voicevox engine for Docker
```
docker pull voicevox/voicevox_engine
```
3. To run Voicevox engine, run the following command:
```
docker run -d -p 50021:50021 voicevox/voicevox_engine
```
This will run Voicevox engine on localhost:50021


## API required
1. Auth0
2. Firebase

Please refer to the .env.sample file as an example of the keys required for this app

## Repository Links
1. <a href="https://github.com/LoyChaiEe/capstone_project_frontend">Frontend</a>
2. <a href="https://github.com/LoyChaiEe/capstone_project_backend">Backend</a>
3. <a href="https://github.com/LoyChaiEe/capstone_flask">Flask</a>

