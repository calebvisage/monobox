<h1 align="center">
  <img src="https://github.com/ozzs/musicPlayer/blob/main/assets/MusicPlayerLogo.png" alt="MusicPlayerLogo" width="200">
  <br /> <br />
  MusicPlayer App
  <br /><br />
</h1>

<h4 align="center"> A lightweight, self-hosted, ad-free player to play music from your local library on your mobile device, in a friendly and simple UI. </h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#how-to-use">How To Use</a> •
</p>

## Key Features
* Simple & Easy to use music player
* Listen from your local library
* Create and customize your own playlists
* Open Source Code:
  - Frontend: React-Native with TypeScript and Node.js
  - Backend: Python with SQLModel and FastAPI
* Dark / Light themes
* No ads

## Installation
First and foremost, make sure your mobile device and PC are using the same wireless network, 
otherwise the application will not be able to communicate with the server running on the computer.
<br /> <br />
Then, in the root of the project, create 2 folders: 
* ``Songs`` contains all the songs in the app library
* ``Covers`` contains all the artworks of the songs in the ``Songs`` folder

### Backend Setup
From the root, navigate to the backend folder. from your command line:
```
cd backend
```
<br />
The `requirements.txt` file lists all the Python libraries that the music player depends on, and they can be installed from your terminal using:
```
pip install -r requirements.txt
```
<br />
Then, in the ``main.py`` file, you have this block of code, where you need to insert your PC's IP address (notice the comments):

```python
host_ip = "0.0.0.0" # Change to your device's IP
host_port = 5000
music_folder_url = "..\Songs"
cover_folder_url = "..\Covers"
```

### Frontend Setup
```
npm install
```

## How To Use

### Project resources
* <a href="https://github.com/ozzs/musicPlayer">Source Code</a>

### Create a bug report

### Submit a feature request
