#!/bin/bash

# Install the required packages
npm ci

# Run databases
docker compose up -d

# push db schema
( cd ./src/db && npx prisma db push)
