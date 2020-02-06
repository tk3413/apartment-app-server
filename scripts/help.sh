# !/bin/bash
echo "Welcome to the Apartment App Server";
echo "'make run'         : start dev server";
echo "'make dev'         : start dev server, auto restarts on save"  
echo "'make atests'      : run acceptance tests, auto start/stop server" 
echo "'make db'          : script to prompt for db credentials" 
echo "'make environment' : script to prompt for prereq install" 
echo "'make docker-image': just build and tag code as image" 
echo "'make docker-run'  : make image and run server via local image" 
echo "'make docker-stop' : stops any running images" 
echo "'make docker-push' : deploy image to cluster" 
echo "'make docker-clean': clean up image artifacts";