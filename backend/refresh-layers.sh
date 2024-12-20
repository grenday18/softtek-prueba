#!/bin/bash

cd ./layers
yarn tsc
cd ../..
mkdir -p ./.esbuild/.build/
cp -r ./layers/dist/nodejs/node_modules/ ./.esbuild/.build/
