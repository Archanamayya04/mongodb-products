FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
COPY index.html /usr/src/app
COPY app.js /usr/src/app
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]

