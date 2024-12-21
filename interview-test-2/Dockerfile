# base image
FROM ubuntu:20.04

# update package list and install necessary system dependencies
RUN apt-get update && apt-get install -y \
    # tesseract-ocr \
    # libtesseract-dev \
    python3 \
    python3-pip \
    # poppler-utils \
    && apt-get clean

# install python libraries
# RUN pip3 install pytesseract pdf2image pillow sqlite3
RUN pip3 install streamlit

# set the working directory in the container
WORKDIR /app

# copy local files into the container
COPY . /app
# COPY ocr_extraction.py /app/

# expose port for streamlit
EXPOSE 8501

CMD ["streamlit", "run", "ocr_extraction.py"]