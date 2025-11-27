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

output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}
