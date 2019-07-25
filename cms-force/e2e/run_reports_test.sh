#!/bin/bash
# Runs protractor population script

protractor cfg/reports.conf.js
read -n 1 -s -r -p "Press any key to continue"