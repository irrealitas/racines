#
# Variables
#
# File extension (ex.: txt, md, markdown)
MEXT = md

# For SSH
USER=name
HOST=example.org
DIR=www/racines

# Text files in directory "text"
SRC = $(sort $(wildcard text/*.$(MEXT)))

# Name of the produced file (which is the name of the current directory)
NAME = $(shell basename $(CURDIR))

html:
	pandoc -s -f markdown -t html --self-contained --template=template/racines.html -o $(NAME).html $(SRC) && cp $(NAME).html public/index.html

ssh:
	rsync -avz --delete -e ssh public/ ${USER}@${HOST}:~/${DIR}

deploy:
	make html && make ssh
