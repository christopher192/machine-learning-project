import os
import psycopg2
from openai import OpenAI
import streamlit as st
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Check if the OpenAI API key is set
open_ai_api_key = os.getenv('OPENAI_API_KEY')
if not open_ai_api_key:
    st.error("OpenAI API key not set in environment variables.")
    exit()

# Database configuration
db_config = {
    'dbname': 'document_db',
    'user': 'postgres',
    'password': 'admin',
    'host': 'localhost',
    'port': '5432'
}

# Initialize OpenAI client
client = OpenAI(api_key=open_ai_api_key)

def fetch_data_from_db(query):
    """Fetch data from PostgreSQL database."""
    try:
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return rows
    except Exception as e:
        print(f"Error: {e}")
        return None

def generate_response(prompt):
    """Generate response from OpenAI model."""
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )
        response_dict = response.model_dump()
        return response_dict["choices"][0]["message"]["content"]
    except Exception as e:
        print(f"Error generating response: {e}")
        return "Sorry, there was an issue processing your request."

if __name__ == "__main__":
    st.title("Simple ChatGPT UI")

    # Query to fetch data
    query = "SELECT text FROM extracted_text;"
    database = fetch_data_from_db(query)

    # User input
    user_input = st.text_input("You: ", "")

    # Retrieve data from the database and create the prompt
    if database:
        data = "Here is the data retrieved from the database:\n" + "\n".join([row[0] for row in database]) + "\n"
    else:
        st.warning("No data retrieved from the database.")
        data = ""

    # Generate prompt based on user input and database data
    if user_input:
        if data:
            prompt = f"""
This is the data retrieved from the database:
{data}

Based on this data, please answer the following question:
{user_input}
"""
        else:
            prompt = f"Please answer the following question:\n{user_input}"

        response_message = generate_response(prompt)
        st.write(f"ChatGPT: {response_message}")