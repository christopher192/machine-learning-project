import os
from openai import OpenAI
import streamlit as st
from dotenv import load_dotenv

if __name__ == "__main__":
    load_dotenv()

    open_ai_api_key = os.getenv('OPENAI_API_KEY')
    client = OpenAI(api_key = open_ai_api_key)

    st.title("Simple ChatGPT UI")

    user_input = st.text_input("You: ", "")

    if user_input:
        response = client.chat.completions.create(
            model = "gpt-4o",
            messages = [
                {"role": "user", "content": user_input}
            ]
        )

        response_dict = response.model_dump()
        response_message = response_dict["choices"][0]["message"]["content"] 
        
        st.write(f"ChatGPT: {response_message}")