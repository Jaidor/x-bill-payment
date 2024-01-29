ARG CONTAINER_REGISTRY_URL

FROM $CONTAINER_REGISTRY_URL/node18:latest

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# set app port
ENV PORT=80

# Copying source files
COPY . .

# Installing dependencies
RUN yarn install

# Build application
RUN yarn build

# set app serving to permissive / assigned
# ENV HOST=0.0.0.0

# expose $port on container
EXPOSE $PORT

# Grant 'execute permission'
RUN ["chmod", "+x", "/app/deploy.sh"]

# Building and starting the app
ENTRYPOINT ["/app/deploy.sh"]