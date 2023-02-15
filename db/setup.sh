psql -f "$(dirname "$0")/install.sql" -U postgres
PGPASSWORD=admin psql -d timetracker -f "$(dirname "$0")/structure.sql" -U admin
PGPASSWORD=admin psql -d timetracker -f "$(dirname "$0")/data.sql" -U admin
