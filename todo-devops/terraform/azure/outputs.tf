output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}

output "bastion_public_ip" {
  description = "Public IP address of the bastion host"
  value       = azurerm_public_ip.bastion.ip_address
}

output "app_public_ip" {
  description = "Public IP address of the application VM"
  value       = azurerm_public_ip.app.ip_address
}

output "app_private_ip" {
  description = "Private IP address of the application VM"
  value       = azurerm_network_interface.app.private_ip_address
}

output "acr_name" {
  description = "Azure Container Registry name"
  value       = azurerm_container_registry.acr.name
}

output "acr_login_server" {
  description = "ACR login server URL"
  value       = azurerm_container_registry.acr.login_server
}

output "acr_admin_username" {
  description = "ACR admin username"
  value       = azurerm_container_registry.acr.admin_username
  sensitive   = true
}

output "acr_admin_password" {
  description = "ACR admin password"
  value       = azurerm_container_registry.acr.admin_password
  sensitive   = true
}

output "database_host" {
  description = "PostgreSQL server hostname"
  value       = azurerm_postgresql_flexible_server.main.fqdn
}

output "database_name" {
  description = "Database name"
  value       = azurerm_postgresql_flexible_server_database.main.name
}

output "database_admin" {
  description = "Database admin username"
  value       = azurerm_postgresql_flexible_server.main.administrator_login
}

output "database_password" {
  description = "Database admin password"
  value       = azurerm_postgresql_flexible_server.main.administrator_password
  sensitive   = true
}