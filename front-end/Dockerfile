# Use an official image from node as the parent image
FROM node:22.9.0

# Set the working directory
WORKDIR /usr/src/front-end

# Copy  the package.jsonand package-lock.json files and install dependencies
COPY package*.json ./
RUN npm install 

# Copy the rest of the files
COPY  . . 

# Expose the internal port
EXPOSE 3001

# Default command
CMD ["npm", "start"]