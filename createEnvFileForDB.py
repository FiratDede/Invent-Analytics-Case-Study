import os

# Check if .env file exists
if not os.path.exists('.env'):
    print(".env file not found. It will be created for your db settings.")
    
    # Ask the user for values
    db_name = input("Database Name (DB_NAME): ")
    db_username = input("Database User (DB_USERNAME): ")
    db_password = input("Database Password (DB_PASSWORD): ")
    db_host = input("Database Host (DB_HOST): ")
    db_port = input("Database Port (DB_PORT): ")

    # Create the .env file and write the content
    with open('.env', 'w') as f:
        f.write(f"DB_NAME={db_name}\n")
        f.write(f"DB_USERNAME={db_username}\n")
        f.write(f"DB_PASSWORD={db_password}\n")
        f.write(f"DB_HOST={db_host}\n")
        f.write(f"DB_PORT={db_port}\n")

    print(".env file has been successfully created!")
else:
    print(".env file already exists. No action was taken.")
