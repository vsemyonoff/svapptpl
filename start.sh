#!/usr/bin/bash

set -a && source .env && set +a && exec node build/index.js
