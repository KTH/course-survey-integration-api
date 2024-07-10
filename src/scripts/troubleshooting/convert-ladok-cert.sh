#!/usr/bin/env bash
set -e

for i in "$@"; do
  case $i in
    --cert-path=*)
    LADOK_CERT_PATH="${i#*=}"
    shift
    ;;
  esac
done

if [ -z "$LADOK_CERT_PATH" ]; then
  cat <<EOF
Usage: $0 --cert-path=<path-to-cert>

The cert is expected to be a base64 encoded string.
You will also need the passcode for the cert.
EOF
  exit 1
fi

if [ -f cert.pem ]; then
  echo "cert.pem already exists. Remove it before running this script."
  exit 1
fi

# This is the actual code
base64 --decode -i $LADOK_CERT_PATH | openssl pkcs12 -out cert.pem -nodes
echo "./cert.pem created valid until:"
openssl x509 -enddate -noout -in cert.pem
