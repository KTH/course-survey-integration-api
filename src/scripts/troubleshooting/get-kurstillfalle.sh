#!/usr/bin/env bash
set -e
LADOK_HOST="api.ladok.se" 
LADOKUID=""

for i in "$@"; do
  case $i in
    --host=*)
    LADOK_HOST="${i#*=}"
    shift
    ;;
    --ladok-uid=*)
    LADOK_UID="${i#*=}"
    shift
    ;;
  esac
done

outp=$(hurl --json <<EOF | jq -r '.entries[].captures[]'
GET https://$LADOK_HOST/resultat/kurstillfalle/$LADOK_UID/moment
Accept: application/vnd.ladok-resultat+json

[Options]
cert: ./cert.pem

HTTP *
[Captures]
response_status: status
response_body: body
EOF
)

printf "HTTP STATUS: "; echo $outp | jq -r 'select(.name == "response_status") | .value'
echo $outp | jq -r 'select(.name == "response_body") | .value' | jq
