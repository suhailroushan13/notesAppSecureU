pm2 delete secure
rm -rf build
cd ..
cd client
rm -rf build
npm run build
mv build ../server
cd ..
cd server
pm2 start app.js --name "secure"
