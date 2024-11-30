### <ins>Question 1</ins>
The CEO of a stock photo company is having the impression that there is a big drop in content downloads recently. Perform an analysis using downloads data here to better understand the situation.

Questions and contexts:
- When did the drop occur, if any do you think the CEO was referring to? How can we identify the drop? How serious is the drop?
    <br><br>1. Overall Drop
    ![](images/overall_drop.png)
    <br>2. Overall Drop Table
    ![](images/overall_drop_table.png)
    <br>3. Percentage drop calculation<br>
    Formula: Percentage drop = ((Before Start Drop Value−Biggest Drop Value)/Before Start Drop Value)*100<br>
    ​![](images/percentage_drop_table.png)

- Is the drop attributed to certain countries and/or users? If so, how can we identify them?
    <br><br>1. Drop accociate with countries
    <p float="left">
        <img src="images/country_g1.png" width="45%" />
        <img src="images/country_g2.png" width="45%" /> 
    </p>
    <p float="left">
        <img src="images/country_g3.png" width="45%" />
        <img src="images/country_g4.png" width="45%" /> 
    </p>
    <p float="left">
        <img src="images/country_g5.png" width="45%" />
        <img src="images/country_g6.png" width="45%" /> 
    </p>
    <p float="left">
        <img src="images/country_g7.png" width="45%" />
        <img src="images/country_g8.png" width="45%" /> 
    </p>
    <p float="left">
        <img src="images/country_g9.png" width="45%" />
        <img src="images/country_g10.png" width="45%" /> 
    </p>

- Is the drop coming from many small downloaders, or coming from few major downloaders?
- Is the drop coming from the Malaysia market and a result of Malaysian public holidays because the CEO said he saw a drop in download count whenever there is a public holiday.
- What other insights can you obtain from this analysis?

Perform your analysis using Python and provide the code for the solution in a jupyter notebook. The fields 'uid' and 'supplier' from downloads table (downloads.csv) correspond to the 'uid' in the member table (member.csv).

### <ins>Question 2</ins>
Figure 1 and Figure 2 are two screenshots from the details page of a footage.

Figure 1
![](images/screen-1.png)

Figure 2
![](images/screen-2.png)

Instructions:<br>
- Write a simple web demo in Python using a large language model (LLM) or (vision-language model) VLM with Langchain (https://python.langchain.com/docs/introduction/) that takes in a video or a video URL that can predict the caption and keywords for a video.<br><br><img src="images/2024-11-30%2012-51-48.gif" width="400">

- Besides using an LLM or VLM, what other approaches are available?
1. Rule-Based Approaches
    <br>First step (frame analysis) - Use computer vision for scene recognition, pre-trained object detection or classification models such as YOLO, Faster R-CNN, ResNet for identifying key objects in the video. Can also use classical computer vision techniques such as edge detection, optical flow etc.. to identify objects, actions, or events.
    <br><br>Second step (event detection) - Detect changes in scenes using histograms, color clustering, or motion analysis. Identify actions using handcrafted features like spatiotemporal descriptors. For example, histogram of optical flow, motion boundary histograms.
    <br><br>Third step (caption formation) - Combine detected objects, actions, and events into simple template-based captions. For example, "A person [action] [object] in [scene]."
    <br><br>Forth step (Keyword Extraction): Extract nouns, verbs, and other key parts of speech from captions using rule-based parsers. For example, NLTK or SpaCy. If the caption is "A person is running in a park", extract keywords like "person," "running," "park.".

2. Audio-Based Approach
    <br>Can extract meaningful information from audio tracks in the video. Firstly, use speech-to-text models such as Google Speech API, AWS Speech to Text, etc to transcribe speech in the video then apply audio classification models to detect background sounds, events (clapping, honking, footsteps..), or emotions (excitement, sadness..). Combine audio insights with visual data for better captions and keywords. If the audio indicates there are clapping and cheering during a scene of running, the combined output might be "A person running in a marathon with an excited crowd cheering."

3. Multi-Modal Approach
    <br>Can combine traditional methods for text, visual, and audio data. For example, extract visual features using object detection or action recognition models. Then process audio using speech-to-text model or sound event detection. After that, merge visual and audio outputs to form coherent descriptions with NLP techniques such as N-grams, TF-IDF and Word Embeddings. Finally, use simple NLP techniques such as n-grams, word embeddings, etc to summarize extracted data.
