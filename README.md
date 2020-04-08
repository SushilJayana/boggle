NOTE:
1. For test purpose, initially it shows only 2 word matrix puzzle return from ror backend api
2. Checks in the puzzles and validates if it is correctly choosen by not overlapping the same characters again
3. Then if validates, checks the found word in dictionary API (used Yandex dictionary api)
    - for some past tense,and plural words were not found in Yandex
4. Warning messages :
    a) Nothing , valid word in matrix and dictionary api
    b) Found but invalid, valid word in matrix but not found in dictionary api
    c) Invalid word, Not valid in matrix
    d) Must be 3 or more char , if input is less than 3 chars
    e) Already added, if you want to add same valid (matrix + dictionary api) again
5. Error messages : Message varies on response by ror backend api.