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
      if [[ "is-skippable" == *"${i}"* ]]; then
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

# if [ "$CMD" = "is-exchange" ]; then
#   res=$(echo $outp | jq -r 'select(.name == "response_body") | .value' | jq '.Attributvarden[].GrupperadeVarden[]?.Varden[] | select(.Attributdefinition.Kod == "utbildning.attribut.markningsvarde.kod") | .Varden[]')
#   if [[ "$res" = '"BIL"' ||  "$res" = '"EMU"' ]]; then
#     echo "This is an exchange"
#     exit 0
#   else
#     echo "This is NOT an exchange"
#     exit 255
#   fi
# fi
if [ "$CMD" = "is-skippable" ]; then
  res=$(echo $outp | jq -r 'select(.name == "response_body") | .value' | jq '.Attributvarden[].GrupperadeVarden[]?.Varden[] | select(.Attributdefinition.Kod == "utbildning.attribut.markningsnyckel.kod") | .Varden[]')
  if [ "$res" = "" ]; then
    res=$(echo $outp | jq -r 'select(.name == "response_body") | .value' | jq '.Attributvarden[].GrupperadeVarden[]?.Varden[] | select(.Attributdefinition.Kod == "utbildningstyp.grundtyp") | .Varden[]')
  fi

  if [[ "$res" = '"UTBPROG"' ]]; then
    echo "This is an exchange"
    exit 0
  elif [[ "$res" = '"SKOLA"' ]]; then
    echo "This is a school"
    exit 0
  elif [[ "$res" = '"DOKTORSPROG"' ]]; then
    echo "This is a doctoral program"
    exit 0
  elif [[ "$res" == *"PROGRAM"* ]]; then
    echo "This is a program"
    exit 0
  elif [[ "$res" = '"KURSPAKETERING"' ]]; then
    echo "This is a course package"
    exit 0
  else
    echo "This is NOT skippable"
    exit 255
  fi
fi
