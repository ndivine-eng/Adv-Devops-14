# Create Resource Group
resource "azurerm_resource_group" "main" {
  name     = "rg-todo-devops"
  location = "centralus"
  
  tags = {
    Environment = "production"
    Project     = "todo-devops"
  }
}

# Random string for unique naming
resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

# Virtual Network
resource "azurerm_virtual_network" "main" {
  name                = "todo-devops-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  tags = {
    Environment = "production"
    Project     = "todo-devops"
  }

  lifecycle {
    create_before_destroy = false
  }
}

# Public Subnet for Bastion
resource "azurerm_subnet" "public" {
  name                 = "public-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.1.0/24"]

  depends_on = [azurerm_virtual_network.main]
}

# Private Subnet for Application VM
resource "azurerm_subnet" "private" {
  name                 = "private-subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.2.0/24"]

  depends_on = [azurerm_subnet.public]
}

# Network Security Group for Bastion
resource "azurerm_network_security_group" "bastion" {
  name                = "todo-devops-bastion-nsg"
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
    Environment = "production"
    Project     = "todo-devops"
  }
}

# Network Security Group for Application VM
resource "azurerm_network_security_group" "app" {
  name                = "todo-devops-app-nsg"
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
    Environment = "production"
    Project     = "todo-devops"
  }
}

# Public IP for Bastion
resource "azurerm_public_ip" "bastion" {
  name                = "todo-devops-bastion-pip"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  allocation_method   = "Static"
  sku                 = "Standard"

  tags = {
    Environment = "production"
    Project     = "todo-devops"
  }
}

# Public IP for Application VM
resource "azurerm_public_ip" "app" {
  name                = "todo-devops-app-pip"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  allocation_method   = "Static"
  sku                 = "Standard"

  tags = {
    Environment = "production"
    Project     = "todo-devops"
  }
}

# Network Interface for Bastion
resource "azurerm_network_interface" "bastion" {
  name                = "todo-devops-bastion-nic"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.public.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.bastion.id
  }

  tags = {
    Environment = "production"
    Project     = "todo-devops"
  }

  depends_on = [azurerm_subnet.public]
}

# Network Interface for Application VM
resource "azurerm_network_interface" "app" {
  name                = "todo-devops-app-nic"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.private.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.app.id
  }

  tags = {
    Environment = "production"
    Project     = "todo-devops"
  }

  depends_on = [azurerm_subnet.private]
}

# Associate NSG to Bastion NIC
resource "azurerm_network_interface_security_group_association" "bastion" {
  network_interface_id      = azurerm_network_interface.bastion.id
  network_security_group_id = azurerm_network_security_group.bastion.id

  depends_on = [
    azurerm_network_interface.bastion,
    azurerm_network_security_group.bastion
  ]
}

# Associate NSG to App NIC
resource "azurerm_network_interface_security_group_association" "app" {
  network_interface_id      = azurerm_network_interface.app.id
  network_security_group_id = azurerm_network_security_group.app.id

  depends_on = [
    azurerm_network_interface.app,
    azurerm_network_security_group.app
  ]
}

# Bastion Host VM
resource "azurerm_linux_virtual_machine" "bastion" {
  name                = "todo-devops-bastion"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = "Standard_D2s_v3"
  admin_username      = "erjok2020"

  disable_password_authentication = false
  admin_password                  = "Erjok2020!"

  network_interface_ids = [
    azurerm_network_interface.bastion.id,
  ]

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
    Environment = "production"
    Project     = "todo-devops"
  }

  depends_on = [azurerm_network_interface.bastion]
}

# Application VM
resource "azurerm_linux_virtual_machine" "app" {
  name                = "todo-devops-app"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = "Standard_D2s_v3"
  admin_username      = "erjok2020"

  disable_password_authentication = false
  admin_password                  = "Erjok2020!"

  network_interface_ids = [
    azurerm_network_interface.app.id,
  ]

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
    Environment = "production"
    Project     = "todo-devops"
  }

  depends_on = [azurerm_network_interface.app]
}

# Azure Container Registry
resource "azurerm_container_registry" "acr" {
  name                = "todoacr${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true

  tags = {
    Environment = "production"
    Project     = "todo-devops"
  }
}
