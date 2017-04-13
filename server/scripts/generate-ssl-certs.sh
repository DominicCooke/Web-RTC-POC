#!/bin/bash

if [ ! -e server.js ]
then
	echo "Error: could not find main application server.js file"
	echo "You should run the generate-ssl-certs.sh script from the main application root directory"
	echo "i.e: bash scripts/generate-ssl-certs.sh"
	exit -1
fi

echo "Generating self-signed certificates..."
mkdir -p ./config/sslcerts
openssl genrsa -out ./config/sslcerts/key.pem 1024

openssl req -new -key ./config/sslcerts/key.pem -out ./config/sslcerts/csr.pem -config C:/GnuWin32/share/openssl.cnf
#openssl req -new -key key.pem -out csr.pem -config C:\GnuWin32\share\openssl.cnf

openssl x509 -req -days 9999 -in ./config/sslcerts/csr.pem -signkey ./config/sslcerts/key.pem -out ./config/sslcerts/cert.pem
#openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem

rm ./config/sslcerts/csr.pem

chmod 600 ./config/sslcerts/key.pem ./config/sslcerts/cert.pem
#chmod 600 key.pem cert.pem
