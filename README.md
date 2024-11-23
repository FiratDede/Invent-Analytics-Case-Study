# Invent Analytics Case Study Solution
This repo is created for Invent Analytics case study solution. We have an Express.js server, which runs on 3000 port.
## Used Technologies
Nodejs, Express.js, Typescript, Sequalize, Postgresql
## How To Run
* My project uses **Postgresql** as db. Firstly you have to create a db, you can give any name to this db.
* Secondly, in order for the Express server to connect to the database, you need to specify some settings related to your database in the **.env** file. To do this you can run **createEnvFileForDB.py** python script by running the command below in root directory of this repo:

  `py createEnvFileForDB.py`

    This scripts asks you some questions then this will create **.env** file in the format below.

    ```
    DB_NAME=your_db_name 
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_HOST=your_db_host
    DB_PORT=your_db_port
    ```
    Or you can write your **.env** file manually.

* Now you can run express.js server by running the command below in root directory.
  
  `npm run build` 

## Author
FIRAT DEDE