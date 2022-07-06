FROM jekyll/jekyll

WORKDIR /app

# This fixes the issue of `There was an error while trying to write to /app/Gemfile.lock. It is
# likely that you need to grant write permissions for that path.`
#
# Reference: https://github.com/daattali/beautiful-jekyll/issues/443#issue-394101449
COPY --chown=jekyll:jekyll Gemfile .
COPY --chown=jekyll:jekyll Gemfile.lock .

RUN bundle check || bundle install

COPY . ./

CMD ["bundle", "exec", "jekyll", "serve", "--host=0.0.0.0"]
