Project Introduction

Welcome to this project! This work served as an initial exercise to get started with Flask, Docker, and MongoDB. 
While it is primarily intended as a learning exercise, I hope others might find it useful or interesting.

Overview

This Flask application allows you to search for common monsters in DnD 5e.

Setup

Follow these steps to set up and run the project:

1. Install Docker:
   Make sure you have Docker installed. 
   (If needed, you can find instructions here: https://docs.docker.com/engine/install/)

2. Clone the Repository.

3. Start the Application:
   Navigate to the repository directory in your terminal and run the following command to start the application:
       docker-compose up -d
   You should now be able to access the search at: http://localhost:5000

4. Stop the Application:
   To stop the application, navigate to the repository directory in your terminal and run:
       docker-compose down

API Usage

This project uses a free API to retrieve data for DnD 5e monsters.

API: D&D 5e API (https://www.dnd5eapi.co/)
API Documentation: https://5e-bits.github.io/docs/

Attribution

This project uses content from the Dungeons & Dragons 5th Edition System Reference Document (SRD) 5.1, which is available under the Open Game License (OGL). 
Dungeons & Dragons and its associated trademarks are property of Wizards of the Coast.

Open Game License: https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf

Creative Commons Attribution 4.0 International (CC BY 4.0): https://creativecommons.org/licenses/by/4.0/

License

This project is licensed under the MIT License. See the LICENSE file for more details.