#!/bin/bash
if ! test -f /var/www/webapp/.env; then
  DATABASE=$(curl "http://metadata.google.internal/computeMetadata/v1/instance/attributes/db_name" -H "Metadata-Flavor: Google")
  USER=$(curl "http://metadata.google.internal/computeMetadata/v1/instance/attributes/db_user" -H "Metadata-Flavor: Google")
  PASSWORD=$(curl "http://metadata.google.internal/computeMetadata/v1/instance/attributes/db_password" -H "Metadata-Flavor: Google")
  HOST=$(curl "http://metadata.google.internal/computeMetadata/v1/instance/attributes/db_private_ipv4" -H "Metadata-Flavor: Google")
  sudo echo "DATABASE=$DATABASE" >> /var/www/webapp/.env
  sudo echo "USER=$USER" >> /var/www/webapp/.env
  sudo echo "PASSWORD=$PASSWORD" >> /var/www/webapp/.env
  sudo echo "HOST=$HOST" >> /var/www/webapp/.env
  sudo chown csye6225 /var/www/webapp/.env
  sudo chgrp csye6225 /var/www/webapp/.env
fi