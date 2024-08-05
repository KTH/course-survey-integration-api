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
    --no-status)
    NO_STATUS=yes
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

if [ -z "$NO_STATUS" ]; then
  printf "HTTP STATUS: "; echo $outp | jq -r 'select(.name == "response_status") | .value'
fi
echo $outp | jq -r 'select(.name == "response_body") | .value' | jq
