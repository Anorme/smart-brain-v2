# Use an official image from node as the parent image
FROM node:22.9.0  

# Set the working directory
WORKDIR /usr/src/smart-brain-api  

# Copy the package.json and package-lock.json files and install dependencies
COPY package*.json ./
RUN npm install  

# Copy the rest of the application
COPY . .

# Expose the internal port
EXPOSE 3000

#Default command
CMD [ "/bin/bash" ]