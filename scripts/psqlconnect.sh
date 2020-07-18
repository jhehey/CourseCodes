#!/bin/sh
docker-compose run -e PGPASSWORD=$Env:PGPASSWORD db psql -h db -p 5432 -U postgres -d CourseCodesDB
