# Create temp dir
Write-Host "Setting up..."
$TMPDIR="$(PWD)\\tmp"
mkdir $TMPDIR

# Create sql script
Write-Host "Generating migration script..."
dotnet ef migrations script -p "../CourseCodesAPI/CourseCodesAPI/CourseCodesAPI.csproj" --idempotent --output ${TMPDIR}/tmpMigration.sql

# Create db in the container
Write-Host "Creating database..."
docker-compose run -e PGPASSWORD=$Env:PGPASSWORD db createdb CourseCodesDB -h db -p 5432 -U postgres

# Migrate
Write-Host "Migrating..."
docker-compose run -v ${TMPDIR}/:/tmp/migrations -e PGPASSWORD=$Env:PGPASSWORD db psql -h db -p 5432 -U postgres -d CourseCodesDB -a -f /tmp/migrations/tmpMigration.sql

# CleanUp
Write-Host "Cleaning up..."
rm -Recurse $TMPDIR
