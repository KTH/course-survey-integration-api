#!/usr/bin/env bash
tmp="$(cat ./query_data.csv | grep 'url:' )"

# Isolate the UID
lines=$(echo "$tmp" | awk -F '/' '{print $(NF-1)}')

for tillfallesId in $lines; do
  instansId=$(./get-utbildningstillfalle.sh --ladok-uid=$tillfallesId | jq '.UtbildningsinstansUID')
  instansId=${instansId//\"/}
  ./get-utbildningsinstans.sh is-skippable --ladok-uid=$instansId &> /dev/null
  if [ $? -eq 0 ]; then
    echo "$tillfallesId: skippable       (instansId: $instansId)"
  else
    echo "$tillfallesId: INVESTIGATE     (instansId: $instansId)"
  fi
  # Rate limits...
  sleep 0.01s
done

cat <<EOF
1. Do a search for failed messages in [Azure](https://portal.azure.com/#@kth.onmicrosoft.com/resource/subscriptions/89badcd9-244a-4255-af4f-bc0d931d3a69/resourceGroups/course-survey-integration-api-prod/analytics):
'''
AppTraces
| where TimeGenerated >= ago(28h) and SeverityLevel >= 3
| where SeverityLevel >= 3 and OperationName == "PaborjatUtbildningstillfalleEvent" and Message !has "MongoServerError" and Message !has "Executed 'Functions."
| where Message has "ApiError [UnhandledApiError]: Response code 400 (Bad Request)"
| where Message has "at async handler (/home/site/wwwroot/dist/src/functions/ladok-events/paborjatUtbildningstillfalleEvent.js:27:38)"
| project Message
'''
2. Save these as a CSV file called query_data.csv
3. Run this script to check which of these are exchange course instances

You can find course instances using:
https://www.start.ladok.se/gui/app/gui/#/utbildningsinformation/utbildningsinstans/2007gkurs?utbildningsinstansUID=$INSTANCE_ID
EOF