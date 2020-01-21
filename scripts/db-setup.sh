# !/bin/bash
clear;
echo "Welcome to the Database Config File Setter Upper 9000."
echo "Press enter to continue after each prompt."
read -p "Enter username: " username
read -p "Enter password: "  password
read -p "Enter database: " database
read -p "Enter host: " host
read -p "Enter port: " port
read -p "Enter dialect: " dialect

mkdir config;

echo "{
  \"development\": {
    \"username\": \"${username}\",
    \"password\": \"${password}\",
    \"database\": \"${database}\",
    \"host\": \"${host}\",
    \"port\": \"${port}\",
    \"dialect\": \"${dialect}\",
    \"define\": {
      \"underscored\": true,
      \"timestamps\": false
    }
  }
}" > config/config.json

copy config/config.json config-backup.json

clear;
echo "Done setting up database config file."
echo "Also added a backup file in the root directory (just in case)"