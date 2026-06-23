#!/usr/bin/bash

# Server
export HOST="localhost"
#export HOST="0.0.0.0"
export PORT="8088"

# Drizzle
#export DB_HOST="localhost"
#export DB_PORT="5432"
export DB_USER="vladt480"
export DB_PASS="280f74ff-6c7b-463f-90c7-e19f2f01ca3b"
export DB_NAME="vladt480"

# Better Auth
# `openssl rand -base64 32`
export AUTH_TOKEN="bXh44sHg/NsTsHiM8KT+1+Z2NKWPd7t4TQQdZhVRfkE="
export AUTH_URL="http://localhost:8088"

exec node build/index.js
