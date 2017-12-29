name="com.youbohudong.frontend"
git pull
cnpm install
yarn build
yarn global add serve
screen -S $name -p 0 -X quit
screen -S $name -d -m serve -s dist
