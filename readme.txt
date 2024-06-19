Flask-App to search most existing Monsters of DnD 5e.

Work in Progress

Setup:
1- Install local MongoDB:  https://www.mongodb.com/docs/manual/tutorial

2- Have Docker installed: https://docs.docker.com/engine/install/

3- Clone Repo

4- in RepoDir, create Dockerimage:
    docker build -t dndsearch . 

5- start Container:
    docker run -d --name dndsearch --network=host dndsearch

You should now be able to access search via your browser at localhost:5000

5- to stop the container:
    docker stop dndsearch