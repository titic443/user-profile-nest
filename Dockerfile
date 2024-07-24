FROM node:18-alpine
RUN mkdir /code
WORKDIR /code
COPY src /code/src
COPY *.json /code/
RUN npm install
RUN npm run build
WORKDIR /code/dist
EXPOSE 3000/tcp

 

CMD ["node", "main"]