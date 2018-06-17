name="com.youbohudong.frontend"
git pull
cnpm install
# yarn add webpack@^3.10.0
yarn build
yarn global add serve
screen -S $name -p 0 -X quit
screen -S $name -d -m serve -s dist
