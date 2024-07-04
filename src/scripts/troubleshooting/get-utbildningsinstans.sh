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
    *)
      if [[ "is-course-package" == *"${i}"* ]]; then
        CMD="${i}"
      fi
    ;;
  esac
done

outp=$(hurl --json <<EOF | jq -r '.entries[].captures[]'
GET https://$LADOK_HOST/utbildningsinformation/ro/utbildningsinstans/$LADOK_UID
Accept: application/vnd.ladok-utbildningsinformation+json

[Options]
cert: ./cert.pem

HTTP *
[Captures]
response_status: status
response_body: body
EOF
)

printf "HTTP STATUS: "; echo $outp | jq -r 'select(.name == "response_status") | .value'

if [ "$CMD" = "" ]; then
  echo $outp | jq -r 'select(.name == "response_body") | .value' | jq
  exit 0
fi

if [ "$CMD" = "is-course-package" ]; then
  res=$(echo $outp | jq -r 'select(.name == "response_body") | .value' | jq '.Attributvarden[].GrupperadeVarden[]?.Varden[] | select(.Attributdefinition.Kod == "utbildningstyp.grundtyp") | .Varden[]')

  if [[ "$res" = '"KURSPAKETERING"' ]]; then
    echo "This is a course package"
    exit 0
  else
    echo "This is NOT skippable"
    exit 255
  fi
fi