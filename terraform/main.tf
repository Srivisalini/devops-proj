# 1. Configure the Terraform provider for Azure
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~>3.1"
    }
  }
}

# Configure the Azure Provider
provider "azurerm" {
  features {}
}

# 2. Create a random string to make our ACR name unique
# Azure Container Registry names must be globally unique.
resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
  numeric = true
}

# 3. Create a Resource Group
# This is the container that will hold all our resources.
resource "azurerm_resource_group" "rg" {
  name     = "devops-project-rg"
  location = "East US" # You can change this to a region near you
}

# 4. Create the Azure Container Registry (ACR)
# This is where our Docker image will be stored.
resource "azurerm_container_registry" "acr" {
  # The name must be unique, so we add the random string
  name                = "devopsprojacr${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true # Required for the CI/CD pipeline later

  depends_on = [azurerm_resource_group.rg]
}

# 5. Create the Azure Kubernetes Service (AKS)
# This is the cluster that will run our app.
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "devops-project-aks"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "devopsprojektaks" # Must be globally unique

  default_node_pool {
    name       = "default"
    node_count = 1 # Keep this at 1 to save money
    vm_size    = "Standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }

  depends_on = [azurerm_resource_group.rg]
}

# 6. Output the values we need for our pipeline
# This will print the resource names to the console after they are created.
output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.aks.name
}

