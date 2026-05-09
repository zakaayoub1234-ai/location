#!/bin/bash
php artisan migrate --force
php artisan storage:link --force
php artisan db:seed --class=CarSeeder --force
