# -------- Stage 1: Build (Composer) --------
FROM composer:2 AS build
WORKDIR /app

# Composer in containers
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_MEMORY_LIMIT=-1

# Install dependencies; ignore ext-gd in the BUILD stage only
COPY composer.json composer.lock ./
RUN composer install \
  --no-dev --prefer-dist --no-interaction --no-progress --optimize-autoloader \
  --ignore-platform-req=ext-gd

# Copy your project sources (ONLY paths that exist — adjust as needed)
# If a path doesn't exist in your repo, remove the line.
COPY web/modules/custom/ web/modules/custom/
# COPY web/themes/custom/  web/themes/custom/   # <- keep commented if you don't have a custom theme
COPY web/sites/default/  web/sites/default/

# -------- Stage 2: Runtime (Apache + PHP) --------
FROM drupal:10.3-apache

# Needed PHP extensions for Drupal (intl, zip, gd)
RUN apt-get update && apt-get install -y --no-install-recommends \
      git unzip libzip-dev libicu-dev \
      libpng-dev libjpeg62-turbo-dev libfreetype6-dev \
  && docker-php-ext-install -j"$(nproc)" intl zip \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install -j"$(nproc)" gd \
  && rm -rf /var/lib/apt/lists/* \
  && a2enmod rewrite

# Place built project and serve /opt/drupal/web
WORKDIR /opt/drupal
COPY --from=build /app /opt/drupal
RUN rm -rf /var/www/html && ln -s /opt/drupal/web /var/www/html

# Safe perms for writable dirs
RUN chown -R www-data:www-data /opt/drupal/web/sites
