import os
import psycopg2
from openai import OpenAI
import streamlit as st
from dotenv import load_dotenv

def fetch_data_from_db(query):
    try:
        # connect to the postgresql database
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()

        # execute the query
        cursor.execute(query)
        
        # fetch all results
        rows = cursor.fetchall()
        
        # close the connection
        cursor.close()
        conn.close()
        
        return rows
    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    # database configuration
    db_config = {
        'dbname': 'document_db',
        'user': 'postgres',
        'password': 'admin',
        'host': 'localhost',
        'port': '5432'
    }

    # query to fetch data
    query = "SELECT text FROM extracted_text;"
    data = ""

    # fetch data from database
    database = fetch_data_from_db(query)

    load_dotenv()

    open_ai_api_key = os.getenv('OPENAI_API_KEY')
    client = OpenAI(api_key = open_ai_api_key)

    st.title("Simple ChatGPT UI")

    user_input = st.text_input("You: ", "")

    if database:
        # format data into a prompt
        data = "Here is the data retrieved from the database:\n"
        for row in database:
            data += f"{row}\n"
    else:
        print("no data retrieved from the database.")

    if user_input:
        prompt = f"""
This is the data retrieved from the database:
{data}

Based on this data, please answer the following question:
{user_input}
"""
        response = client.chat.completions.create(
            model = "gpt-4o",
            messages = [
                {"role": "user", "content": prompt}
            ]
        )

        response_dict = response.model_dump()
        response_message = response_dict["choices"][0]["message"]["content"] 
        
        st.write(f"ChatGPT: {response_message}")