#!/bin/bash

BASTION_IP="132.196.65.65"
APP_VM_IP="10.0.2.4"
APP_USER="erjok2020"

ssh -o ProxyCommand="ssh -W %h:%p -q $APP_USER@$BASTION_IP" $APP_USER@$APP_VM_IP << 'ENDSSH'
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER

echo "REDACTED_ACR_PASSWORD" | docker login todoacrud9eii5z.azurecr.io -u todoacrud9eii5z --password-stdin
docker pull todoacrud9eii5z.azurecr.io/todo-app:latest
docker run -d --name todo-app -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_HOST=todo-devops-db-tiadp0.postgres.database.azure.com \
  -e DATABASE_NAME=tododb \
  -e DATABASE_USER=dbadmin \
  -e DATABASE_PASSWORD=REDACTED_DB_PASSWORD \
  todoacrud9eii5z.azurecr.io/todo-app:latest
ENDSSH
