FROM node:18-slim AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# second stage
FROM node:18-slim
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["yarn", "start"]
