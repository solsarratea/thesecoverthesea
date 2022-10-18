#!/bin/bash

#Convert gif files into mp4

PATH="public"
FILES="*.mp4"

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
    basename="${filename%*".mp4"}"
    echo $filename
    /usr/local/bin/ffmpeg -i "$filename" "small-$basename.gif" -nostdin
done
