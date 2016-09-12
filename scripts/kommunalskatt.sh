### RUN MEEEE #####
echo "SCRIPT FUN"

mongo < kommunalskatt.js

mongoimport -d 'skvdb' -c 'kommunalskatt' --type csv --headerline --file kommunalskatt.csv


echo "DUNE! :)))"
