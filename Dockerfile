FROM ruby:2.7

VOLUME /mnt/app
VOLUME /mnt/app/vendor
VOLUME /mnt/app/node_modules

RUN mkdir /buildctx
WORKDIR /buildctx

RUN gem install bundler

RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    python3-pip \
    nodejs \
    npm \
    shellcheck \
    ;

COPY Gemfile Gemfile.lock ./
RUN bundle install --system

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

COPY package.json package-lock.json ./
RUN npm install
ENV PATH "$PATH:/buildctx/node_modules/.bin"

WORKDIR /mnt/app
