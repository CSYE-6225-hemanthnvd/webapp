// plugins.pkr.hcl
packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1.0.0, < 2.0.0"
    }
  }
}

// variables.pkr.hcl
variable project_id {
  type    = string
  default = "#{projectid}#"
}
variable source_image {
  type    = string
  default = "#{sourceimage}#"
}
variable source_image_family {
  type    = string
  default = "#{sourceimagefamily}#"
}
variable machine_type {
  type    = string
  default = "#{machinetype}#"
}
variable image_name {
  type    = string
  default = ""
}
variable ssh_username {
  type    = string
  default = "#{sshusername}#"
}
variable zone {
  type    = string
  default = "#{zone}#"
}
variable credentials_file {
  type    = string
  default = ""
}

// values.pkrvars.hcl

// gcp.pkr.hcl
source "googlecompute" "centos" {
  project_id          = var.project_id
  source_image        = var.source_image
  source_image_family = var.source_image_family
  machine_type        = var.machine_type
  image_name          = var.image_name
  ssh_username        = var.ssh_username
  zone                = var.zone
}

build {
  name = "centos-stream-8-packer-build"
  source "source.googlecompute.centos" {
    name = "central-build"
  }
  provisioner "file" {
    source      = "../../webapp"
    destination = "/tmp/"
  }
  provisioner "shell" {
    script = "setup.sh"
  }
}