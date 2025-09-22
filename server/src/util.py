def pascal_case_to_words(text: str) -> str:
    words = []
    current = ""

    for chr in text:
        if chr.isupper():
            if current != "":
                words.append(current)
            current = chr
        else:
            current += chr
    
    if current != "":
        words.append(current)

    return " ".join(words).title()
