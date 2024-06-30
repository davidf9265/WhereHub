# Use the official Next.js image as a base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Next.js will run on
EXPOSE ${PORT}

# Build the Next.js application
RUN npx nx run TestFront:build

# Start the Next.js application
CMD ["sh", "-c", "npx nx run TestFront:serve:production --port=${PORT}"]