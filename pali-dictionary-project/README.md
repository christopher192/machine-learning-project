## Pali Dictionary Project
### Introduction
Loading..

### Dataset
1. `vocab_class_*.csv`
    - <b>id</b> - Unique identifier for each Pali word entry.
    - <b>pali</b> - The Pali word, including declensions and conjugations.
    - <b>pos</b> - Part of Speech, the grammatical category of the word (e.g., noun, verb, adjective).
    - <b>meaning</b> - The English meaning of the Pali word.
    - <b>source_1</b> - The first source where the word appears (e.g., Sutta number).
    - <b>sutta_1</b> - The name of the sutta where the word appears
    - <b>example_1</b> - An example sentence from the sutta using the word in context.
    - <b>source_2</b> to <b>source_4</b> - Additional sources where the word appears, following the same structure as <b>source_1</b>.
2. `exercises_class_*.txt`

### To-do-list
1. Word Matching
    <br>Identify sentences containing the target Pali word, recognizing its various forms (e.g., declensions - nouns and conjugations - verbs). 
    - Extract meaningful & relavant data as much as possible from `vocab_class_*.csv`.
2. Relevance Filtering
    <br>

### Relevant Discussion
1. https://github.com/digitalpalidictionary/dpd-db/discussions/33
2. https://github.com/digitalpalidictionary/dpd-db/issues/45