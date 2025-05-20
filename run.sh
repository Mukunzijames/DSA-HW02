#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Run the application
node code/src/index.js

# Exit with the same status code as the Node.js process
exit $? 