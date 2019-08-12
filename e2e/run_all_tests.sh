#!/bin/bash
# Runs protractor tests

protractor cfg/test.conf.js
read -n 1 -s -r -p "Press any key to continue"