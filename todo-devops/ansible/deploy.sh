#!/bin/bash

BASTION_IP="132.196.65.65"
APP_VM_IP="10.0.2.4"
APP_USER="erjok2020"

ssh -o ProxyCommand="ssh -W %h:%p -q $APP_USER@$BASTION_IP" $APP_USER@$APP_VM_IP << 'ENDSSH'
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER

# Login to Azure Container Registry using environment variables
# These should be set in the environment before running this script:
#   ACR_LOGIN_SERVER, ACR_USERNAME, ACR_PASSWORD
echo "\$ACR_PASSWORD" | docker login "\$ACR_LOGIN_SERVER" -u "\$ACR_USERNAME" --password-stdin

docker pull "\$ACR_LOGIN_SERVER/todo-app:latest"

# Database connection details should also come from environment variables:
#   DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD
docker run -d --name todo-app -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_HOST="\$DATABASE_HOST" \
  -e DATABASE_NAME="\$DATABASE_NAME" \
  -e DATABASE_USER="\$DATABASE_USER" \
  -e DATABASE_PASSWORD="\$DATABASE_PASSWORD" \
  "\$ACR_LOGIN_SERVER/todo-app:latest"
ENDSSH
