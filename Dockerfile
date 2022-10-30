FROM node:16-alpine3.15 as build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# copying packages first helps take advantage of docker layers
COPY package*.json ./
# copy prisma directory
COPY prisma ./prisma/

RUN npm install

COPY . .

FROM build as prod

RUN npx prisma generate

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "start" ]