# Azure PostgreSQL Flexible Server
resource "azurerm_postgresql_flexible_server" "main" {
  name                   = "todo-devops-db-${random_string.unique.result}"
  resource_group_name    = azurerm_resource_group.main.name
  location               = azurerm_resource_group.main.location
  version                = "13"
  administrator_login    = "dbadmin"
  administrator_password = "REDACTED_DB_PASSWORD"
  zone                   = "1"

  storage_mb = 32768
  sku_name   = "B_Standard_B1ms"

  backup_retention_days        = 7
  geo_redundant_backup_enabled = false

  tags = {
    Environment = "production"
    Project     = "todo-devops"
  }
}

# Database
resource "azurerm_postgresql_flexible_server_database" "main" {
  name      = "tododb"
  server_id = azurerm_postgresql_flexible_server.main.id
  collation = "en_US.utf8"
  charset   = "utf8"
}

# Firewall rule to allow access from App VM
resource "azurerm_postgresql_flexible_server_firewall_rule" "app_vm" {
  name             = "allow-app-vm"
  server_id        = azurerm_postgresql_flexible_server.main.id
  start_ip_address = azurerm_network_interface.app.private_ip_address
  end_ip_address   = azurerm_network_interface.app.private_ip_address
}

# Firewall rule to allow Azure services
resource "azurerm_postgresql_flexible_server_firewall_rule" "azure_services" {
  name             = "allow-azure-services"
  server_id        = azurerm_postgresql_flexible_server.main.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}
