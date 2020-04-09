#!/bin/sh

# curl https://unicode.org/Public/emoji/12.0/emoji-sequences.txt > emoji-sequences-12.txt
cat emoji-sequences-12.txt \
	| grep Basic_Emoji \
	| grep -v "^#" \
	| grep -v FE0F \
	| grep -v square \
	| grep -v circle \
	| cut -d " " -f 1 \
	> emoji-list.txt
