#!/usr/bin/env bash

rm -rdf coverage
mkdir coverage

go test -v -covermode=atomic -coverprofile=./coverage/coverage.out ./...
