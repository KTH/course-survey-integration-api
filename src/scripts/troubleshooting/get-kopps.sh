#!/usr/bin/env bash
set -e
KOPPS_HOST_PATH="api.kth.se/api/kopps/v2" 
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
    STATUS=no
    shift
    ;;
  esac
done

outp=$(hurl --json <<EOF | jq -r '.entries[].captures[]'
GET https://$KOPPS_HOST_PATH/courses/offerings/roundnumber?ladokuid=$LADOK_UID
Accept: application/json

HTTP *
[Captures]
response_status: status
response_body: body
EOF
)

if [ -z "$STATUS" ]; then
  printf "HTTP STATUS: "; echo $outp | jq -r 'select(.name == "response_status") | .value'
fi
echo $outp | jq -r 'select(.name == "response_body") | .value' | jq
