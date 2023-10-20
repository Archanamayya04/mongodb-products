FROM mongo:3.6
RUN mkdir -p /etc/mongod
COPY mongod.conf /etc/mongod/mongod.conf
EXPOSE 27017
CMD ["mongod", "--config", "/etc/mongod/mongod.conf"]

