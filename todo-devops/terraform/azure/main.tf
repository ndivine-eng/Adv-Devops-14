# main.tf

# This resource creates a resource group to hold all the other resources.

# We use a data source to reference the existing Container App Environment
# to avoid the regional quota error from the previous attempt.

# This resource defines the front-end container app.
# Resource Group
resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Random string for ACR name uniqueness
resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

# Virtual Network
resource "azurerm_virtual_network" "main" {
  name                = "${var.project_name}-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Public Subnet for Bastion
resource "azurerm_subnet" "public" {
  name                 = "public-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Private Subnet for Application VM
resource "azurerm_subnet" "private" {
  name                 = "private-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.2.0/24"]
}

# Network Security Group for Bastion
resource "azurerm_network_security_group" "bastion" {
  name                = "${var.project_name}-bastion-nsg"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  security_rule {
    name                       = "SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Network Security Group for Application VM
resource "azurerm_network_security_group" "app" {
  name                = "${var.project_name}-app-nsg"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  security_rule {
    name                       = "SSH_from_Bastion"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "10.0.1.0/24"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "HTTP"
    priority                   = 1002
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "App_Port"
    priority                   = 1003
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "3000"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Public IP for Bastion
resource "azurerm_public_ip" "bastion" {
  name                = "${var.project_name}-bastion-pip"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  allocation_method   = "Static"
  sku                 = "Standard"

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Public IP for Application VM
resource "azurerm_public_ip" "app" {
  name                = "${var.project_name}-app-pip"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  allocation_method   = "Static"
  sku                 = "Standard"

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Network Interface for Bastion
resource "azurerm_network_interface" "bastion" {
  name                = "${var.project_name}-bastion-nic"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.public.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.bastion.id
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Network Interface for Application VM
resource "azurerm_network_interface" "app" {
  name                = "${var.project_name}-app-nic"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.private.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.app.id
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Associate NSG to Bastion NIC
resource "azurerm_network_interface_security_group_association" "bastion" {
  network_interface_id      = azurerm_network_interface.bastion.id
  network_security_group_id = azurerm_network_security_group.bastion.id
}

# Associate NSG to App NIC
resource "azurerm_network_interface_security_group_association" "app" {
  network_interface_id      = azurerm_network_interface.app.id
  network_security_group_id = azurerm_network_security_group.app.id
}

# Bastion Host VM
resource "azurerm_linux_virtual_machine" "bastion" {
  name                = "${var.project_name}-bastion"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = "Standard_D2s_v3"
  admin_username      = var.admin_username

  disable_password_authentication = false

  network_interface_ids = [
    azurerm_network_interface.bastion.id,
  ]

  admin_password = var.admin_password

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-focal"
    sku       = "20_04-lts-gen2"
    version   = "latest"
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Application VM
resource "azurerm_linux_virtual_machine" "app" {
  name                = "${var.project_name}-app"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = "Standard_D2s_v3"
  admin_username      = var.admin_username

  disable_password_authentication = false

  network_interface_ids = [
    azurerm_network_interface.app.id,
  ]

  admin_password = var.admin_password

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-focal"
    sku       = "20_04-lts-gen2"
    version   = "latest"
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# Container Registry
# resource "azurerm_container_registry" "main" {
#   name                = "${replace(var.project_name, "-", "")}acr${random_string.suffix.result}"
#   resource_group_name = azurerm_resource_group.main.name
#   location            = azurerm_resource_group.main.location
#   sku                 = "Basic"
#   admin_enabled       = true
#
#   tags = {
#     Environment = var.environment
#     Project     = var.project_name
#   }
# }
# MySQL Database
# resource "azurerm_mysql_flexible_server" "main" {
#   name                   = "${var.project_name}-mysql-${random_string.suffix.result}"
#   resource_group_name    = azurerm_resource_group.main.name
#   location              = azurerm_resource_group.main.location
#   administrator_login    = "mysqladmin"
#   administrator_password = var.db_password
#   backup_retention_days  = 7
#   sku_name              = "B_Standard_B1ms"
#   version               = "8.0.21"
#   
#   storage {
#     size_gb = 20
#   }
#
#   tags = {
#     Project     = var.project_name
#     Environment = var.environment
#   }
# }
#
# # Database for the application
# resource "azurerm_mysql_flexible_database" "app_db" {
#   name                = "${var.project_name}_db"
#   resource_group_name = azurerm_resource_group.main.name
#   server_name         = azurerm_mysql_flexible_server.main.name
#   charset             = "utf8mb4"
#   collation          = "utf8mb4_unicode_ci"
# }
#
# # Firewall rule to allow access from app subnet
# resource "azurerm_mysql_flexible_server_firewall_rule" "app_access" {
#   name                = "AllowAppSubnet"
#   resource_group_name = azurerm_resource_group.main.name
#   server_name         = azurerm_mysql_flexible_server.main.name
#   start_ip_address    = "10.0.2.0"
#   end_ip_address      = "10.0.2.255"
# }
