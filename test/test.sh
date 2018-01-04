#!/usr/bin/env bash
echo "---------------"
echo "CREATE"
echo "---------------"

ID=`curl -H "Content-Type: application/json" -X POST -d '{"balance": "1000", "name": "savings"}' "http://localhost:3000/accounts" |\
 awk -F  "[:/}]" '/_id/ {gsub(/"/, "", $5);print  $5 }'`

echo
echo
curl "http://localhost:3000/accounts"
curl "http://localhost:3000/accounts"
echo
echo "---------------"
echo "_id = ${ID} CREATED"
echo "---------------"
echo "UPDATE"
echo "---------------"

curl -H "Content-Type: application/json" -X PUT -d '{"balance": "1500"}' "http://localhost:3000/accounts/${ID}"
echo
echo "Can you see that _id ${ID} has now balance = to 1500 ?"
curl "http://localhost:3000/accounts"
echo
echo "---------------"
echo "REMOVE"
echo "---------------"

curl -H "Content-Type: application/json" -X DELETE "http://localhost:3000/accounts/${ID}"
echo
echo "Now _id ${ID} should not be listed here below!"
echo
curl "http://localhost:3000/accounts"
echo
echo "---------------"
echo
echo "Trying to delete not existing ID"

echo -n "Error: "
curl -H "Content-Type: application/json" -w "%{http_code}" -X DELETE "http://localhost:3000/accounts/5a4deb17a35a42922acc29ed"
echo
echo "you should read \"Error: 404\" here above"
echo "---------------"
echo
