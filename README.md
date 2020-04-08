NOTE:
1. For test purpose, initially it shows only 2 word matrix puzzle returned from ROR backend api
2. Checks in the puzzle if word exists and validates if it is correctly choosen by not overlapping the same characters again
3. Then if validates, checks the found word in dictionary API (used Yandex dictionary api)
    - for some past tense,and plural words were not found in Yandex
4. Warning messages :
    - Nothing , valid word in puzzle and dictionary api
    - Found but invalid, valid word in puzzle but not found in dictionary api
    - Invalid word, Not valid in puzzle
    - Must be 3 or more char , if input is less than 3 chars
    - Already added, if you want to add same valid (puzzle + dictionary api) again
5. Error messages : Message varies on response by ROR backend api.