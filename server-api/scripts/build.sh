#!/usr/bin/env bash

rm -rdf ./build
mkdir ./build
go build -v -o ./build ./...
