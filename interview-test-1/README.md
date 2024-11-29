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
- Write a simple web demo in Python using a large language model (LLM) or (vision-language model) VLM with Langchain (https://python.langchain.com/docs/introduction/) that takes in a video or a video URL that can predict the caption and keywords for a video.
- Besides using an LLM or VLM, what other approaches are available?
