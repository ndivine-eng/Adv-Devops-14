# Required GitHub Secrets

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

## Azure Authentication

- `AZURE_CREDENTIALS`: Azure service principal credentials (JSON format)
- `AZURE_SUBSCRIPTION_ID`: Your Azure subscription ID

## Application Secrets

- `ADMIN_PASSWORD`: Password for VM admin user
- `DB_PASSWORD`: Password for MySQL database

## How to get AZURE_CREDENTIALS

1. Create service principal: `az ad sp create-for-rbac --name "github-actions" --role contributor --scopes /subscriptions/YOUR_SUBSCRIPTION_ID --sdk-auth`
2. Copy the JSON output to AZURE_CREDENTIALS secret

## Example AZURE_CREDENTIALS format
```json
{
  "clientId": "xxx",
  "clientSecret": "xxx", 
  "subscriptionId": "xxx",
  "tenantId": "xxx"
}