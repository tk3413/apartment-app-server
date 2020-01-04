APPNAME=apartment-app-server
TAG=latest

dev:
	npm run dev

run:
	node index.js

atests:
	npm run test

db:
	./scripts/db-setup.sh

environment:
	npm install

docker-image:
	docker build --rm -t ${APPNAME}:${TAG} .

docker-run: docker-image
	docker run -p 3000:3000 --name ${APPNAME} ${APPNAME}:${TAG}

docker-stop:
	docker stop ${APPNAME}
	docker rm ${APPNAME}
	
docker-clean:
	echo "y" | docker system prune