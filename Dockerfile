# Setting the base image
FROM node:18


WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy everything from the local files to the container
COPY . .

RUN npm run build

EXPOSE 5173

# Run with external access
CMD [ "npm", "run", "dev", "--", "--host" ]