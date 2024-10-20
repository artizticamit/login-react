FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

ADD package.json /home/package.json
ADD package-lock.json /home/package-lock.json
ADD index.js /home/index.js
ADD models /home/models
ADD routes /home/routes
ADD middleware /home/middleware
ENV MONGO_URL=mongodb+srv://amitky65391:8328100029@cluster1socialmedia.r2b8r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
ENV SECRET=1234

WORKDIR /home/
RUN npm install

ENTRYPOINT [ "node", "index.js" ]