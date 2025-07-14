# base image
FROM ubuntu:20.04

# update package list and install necessary system dependencies
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    python3 \
    python3-pip \
    poppler-utils \
    libpq-dev \
    && apt-get clean

# install python libraries
RUN pip3 install pytesseract pdf2image pillow streamlit psycopg2 openai python-dotenv

# create a directory in the container
RUN mkdir -p /app/output

# set the working directory in the container
WORKDIR /app

# copy local files into the container
# COPY . /app
COPY ocr_extraction.py /app/
COPY frontend.py /app/
COPY .env /app/
COPY 2023-Double-Funnel.pdf /app/

# expose port for streamlit
EXPOSE 8501

# run processes sequentially
CMD ["sh", "-c", "python3 ocr_extraction.py && streamlit run frontend.py"]
# CMD ["streamlit", "run", "frontend.py"]