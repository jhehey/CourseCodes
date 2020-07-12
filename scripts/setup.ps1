$Env:PGPASSWORD="S2MognJhsZUnwY8LY8neenn2yUKmXMyLD5QTH9mFWhU"

echo "Building Containers..."
docker-compose up -d --build

echo "Running Migrations..."
.\migrate.ps1
docker-compose ps
