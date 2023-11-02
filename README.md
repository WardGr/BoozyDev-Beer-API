# BoozyDev - A REST API for Managing Pints

## Overview

BoozyDev is a REST API designed to manage two databases of pints. One database is based on user input, while the other contains non-changeable data. Users can add pints to the user-input database by providing their username, the name of the pint, and a brief description. The API allows users to request specific pints by name and retrieve a list of pints, including their name, description, and the user who added them. In addition, server-added pints are included in the non-user database, with details such as name, country, brewery, and type.

## How to Use BoozyDev

To get started with BoozyDev, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using Git.

2. **Update Configuration**: Open the `site/script.js` file and change the base URL to `http://localhost:8080`. This step is necessary to ensure the client-side application communicates with the local server.

3. **Install Dependencies**: Ensure that you have Node.js, Express, and CORS installed on your system. If you don't have these dependencies, install them using npm:

   ```bash
   npm install express cors
   
4. **Run the Server**: Navigate to the root folder of the project in your terminal and run the following command to start the server:
   ```bash
   node index.js

You can now use the BoozyDev REST API to manage and retrieve pints in the user and non-user databases.


## API Endpoints

BoozyDev provides the following API endpoints:

- **Add a Pint: POST /userpints/:id**
  - **Request**: Add a new pint to the user-input database.
  - **Parameters**: 
    - `username`: User's name
    - `name`: Name of the pint
    - `description`: A brief description

- **Get Pint by Name: GET /userpints/:name**
  - **Request**: Retrieve a specific pint by its name.
  - **Parameters**: 
    - `name`: Name of the pint

- **Get All Pints: GET /userpints**
  - **Request**: Retrieve a list of all pints in the user-input database, including their name, description, and the user who added them.

- **Get Server-Added Pints: GET /pints**
  - **Request**: Retrieve server-added pints from the non-user database, including details such as name, country, brewery, and type.

Feel free to explore these endpoints and integrate BoozyDev into your applications.
