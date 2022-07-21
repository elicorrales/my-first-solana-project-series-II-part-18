#!/usr/bin/bash

keypairfiles=$(ls -t $(find . -name "*.json" | grep -v -E "debug|bpfel|release|test-ledger|rustc|vscode"));
for file in $keypairfiles;
do
    echo $file;echo;
    content=$(cat $file);
    if [ "$content" = "" ];
    then
      echo "EMPTY FILE"; continue;
      echo "========================================================";
    fi;
    pubkey=$(solana-keygen pubkey $file);
    cat $file;echo;echo;
    solana account $pubkey;
    echo "========================================================";
done;
