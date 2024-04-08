sudo adduser csye6225 --shell /usr/sbin/nologin
cd /var
sudo mkdir www
sudo cp -r /tmp/webapp /var/www/webapp
sudo cp /var/www/webapp/packer/node-app.service /etc/systemd/system
rm -R /tmp/webapp
sudo dnf update -y
cd /
sudo curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
sudo cp /var/www/webapp/packer/config.yaml /etc/google-cloud-ops-agent/config.yaml
sudo dnf module install nodejs:20 -y
cd /var/www/webapp
sudo npm install
sudo npm uninstall bcrypt
sudo npm install bcrypt
sudo chown -R csye6225 /var/www/webapp
sudo chgrp -R csye6225 /var/www/webapp
sudo mkdir /var/log/webapp
sudo chown -R csye6225 /var/log/webapp
sudo chgrp -R csye6225 /var/log/webapp
sudo systemctl daemon-reload
sudo systemctl enable node-app
sudo systemctl restart google-cloud-ops-agent