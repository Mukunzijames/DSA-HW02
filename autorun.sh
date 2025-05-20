#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Run the automated test script
node code/src/autorun.js

# Exit with the same status code as the Node.js process
exit $? 