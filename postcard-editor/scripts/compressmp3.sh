#!/bin/bash

#resize mp3
PATH="./public/audio"
FILES="*.mp3"

for F in "$PATH/$FILES"

do
newname=`"$F"-new.mp3`
echo $newname
ffmpeg -i "$F" -acodec libmp3lame -ac 2 -ab 64k -ar 44100 "$newname.mp3"

done