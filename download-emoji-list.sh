#!/bin/sh

curl https://unicode.org/Public/emoji/12.0/emoji-sequences.txt \
	| grep Basic_Emoji \
	| grep -v "^#" \
	| grep -v FE0F \
	| grep -v square \
	| cut -d " " -f 1 \
	> emoji-list.txt
# cat test-data.txt | grep Basic_Emoji | grep -v "^#" | grep -v FE0F | cut -d " " -f 1 > emoji-list.txt
