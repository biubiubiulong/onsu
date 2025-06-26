enter the env for django: .venv\Scripts\activate
run django: python manage.py runserver

# drop table

python manage.py migrate products zero
rm products/migrations/00\*.py
python manage.py makemigrations products
python manage.py migrate

# update db

modify models.py
python manage.py makemigrations products
python manage.py migrate
update csv
python manage.py import_products products_to_import.csv --images-dir import_images
update serializer for api
