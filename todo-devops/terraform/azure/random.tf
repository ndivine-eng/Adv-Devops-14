# Random string for unique resource naming
resource "random_string" "unique" {
  length  = 6
  special = false
  upper   = false
  numeric = true
}
