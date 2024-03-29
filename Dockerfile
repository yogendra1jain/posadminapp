FROM node:8.15.0-alpine
RUN mkdir -p /pos-admin-ui-app-v2
CMD mkdir /var/log/applogs
CMD chmod +777 /var/log/applogs
WORKDIR /pos-admin-ui-app-v2
ADD . /pos-admin-ui-app-v2
RUN npm install -g serve
RUN npm rebuild node-sass
RUN npm run build
CMD sh cmd.sh