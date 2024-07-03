#!/usr/bin/env bash
set -e

main() {
  set enable-bracketed-paste on
  local LADOK_CERT
  printf "Path to LADOK cert (base64 encoded): "
  read LADOK_CERT_PATH
  base64 --decode -i $LADOK_CERT_PATH | openssl pkcs12 -out cert.pem -nodes
}
main;