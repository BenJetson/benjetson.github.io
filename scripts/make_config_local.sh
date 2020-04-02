
cat << EOF > _config_local.yml

################################################################################
# _config_local.yml                                                            #
#                                                                              #
# This config file will be used by the Makefile when the Jekyll server is to   #
# be made available over the local network, in addition to _config_lan.yml.    #
#                                                                              #
# This file is ignored by Git and contains values specific to your local       #
# machine only, like hostname and port.                                        #
#                                                                              #
# Upon changing networks, this file may need to be recreated. Use the script:  #
#    rm -f _config_local.yml && ./scripts/make_config_local.sh                 #
################################################################################

EOF

printf "Enter the port for the local server.\n>>> "
read port

if [ ! -z "$port" ]; then
    echo "port: $port" >> _config_local.yml
else
    echo "No input - ABORT."
    exit 1
fi

printf "Enter the hostname/ip for this computer on the local network.\n>>> "
read host

if [ ! -z "$host" ]; then
    echo "url: http://$host:$port" >> _config_local.yml
else
    echo "No input - ABORT."
    exit 2
fi

echo "\nSuccess. Local config file has been saved to disk.\n"
