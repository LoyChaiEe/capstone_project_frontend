FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]

# Use the Voicevox Engine base image
FROM voicevox/voicevox_engine

# Copy your React app files into the container
COPY . /app

# Set the working directory to your app directory
WORKDIR /app

# Install any dependencies your app needs
RUN npm install

# Start your React app
CMD npm start
