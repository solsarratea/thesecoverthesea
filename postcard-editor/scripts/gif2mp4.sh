#!/bin/bash

#Convert gif files into mp4

PATH="public"
FILES="*.gif"

# Declare a string array
arrVar=()

# Add elements to array
for F in "$PATH/$FILES"
do
    arrVar=(${arrVar[@]} $F)
 done  

cd $PATH
echo "current path: "
pwd
# Get filename and convert
for value in "${arrVar[@]}"
do  
    filename="${value##*/}"
    basename="${filename%*".gif"}"
    echo $filename
    /usr/local/bin/ffmpeg -f gif -i "$filename" "$basename.mp4" -nostdin
done

