#!/bin/bash
npm run script-install
npm run build
scp -r public/* doobus@165.22.236.83:~/public
exit