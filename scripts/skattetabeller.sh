### RUN MEEEE #####
echo "SCRIPT FUN"

mongo < skattetabeller.js

mongoimport -d 'skvdb' -c 'skattetabeller' --type csv --headerline --file skattetabeller.csv


echo "DUNE! :)))"
