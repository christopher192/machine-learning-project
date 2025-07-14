import os
import psycopg2
import pytesseract
from pdf2image import convert_from_path
from psycopg2 import sql
from contextlib import closing
from dotenv import load_dotenv

# Set up paths
OUTPUT_DIR = 'output'
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load environment variables
load_dotenv()
aws_endpoint = os.getenv('AWS_ENDPOINT')
aws_database = os.getenv('AWS_DATABASE')
aws_port = os.getenv('AWS_PORT')
aws_username = os.getenv('AWS_USERNAME')
aws_password = os.getenv('AWS_PASSWORD')

def process_pdf_and_extract_text(pdf_path):
    """Convert PDF pages to images, perform OCR, and return extracted text."""
    images = convert_from_path(pdf_path, 300)
    text_list = []
    
    for i, image in enumerate(images):
        # Save the image (optional step, could be skipped to save resources)
        image_path = os.path.join(OUTPUT_DIR, f'page_{i + 1}.png')
        image.save(image_path, 'PNG')

        # Perform OCR on the image
        text = pytesseract.image_to_string(image)
        text_list.append(text)

        # Save the text to a .txt file (optional, could be skipped)
        output_file = os.path.join(OUTPUT_DIR, f'text_{i + 1}.txt')
        with open(output_file, 'w', encoding='utf-8') as file:
            file.write(text)
    
    return text_list

def insert_text_to_db(cursor, page_number, text):
    """Insert the extracted text into the PostgreSQL database."""
    cursor.execute(
        sql.SQL("INSERT INTO extracted_text (page_number, text) VALUES (%s, %s)"),
        (page_number, text)
    )

if __name__ == "__main__":
    # Database configuration
    db_config = {
        'dbname': aws_database,
        'user': aws_username,
        'password': aws_password,
        'host': aws_endpoint,
        'port': aws_port
    }

    pdf_path = '2023-Double-Funnel.pdf'
    
    # Extract text from PDF
    text_list = process_pdf_and_extract_text(pdf_path)

    # Connect to PostgreSQL database using a context manager for resource management
    try:
        with closing(psycopg2.connect(**db_config)) as conn:
            with conn.cursor() as cursor:
                # Loop through text_list and insert into the database
                for i, text in enumerate(text_list):
                    insert_text_to_db(cursor, i + 1, text)

                # Commit all the changes after processing all pages
                conn.commit()
                print("All pages processed and data stored in the database.")

    except Exception as e:
        print(f"Error: {e}")
    else:
        print("Process completed successfully.")