echo "Running wait script"

# Sleep is necessary for enabling the init_db script called by the temporary db_setup container to execute and create a fresh database in the case it doesn't exist
sleep 5 && pm2-runtime start dev.config.js