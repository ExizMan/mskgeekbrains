import pandas as pd

def processingQuestion(text):
    return text.upper()

# Если будут подписаны колонки

# df = pd.read_csv('file.csv')
# df['answer'] = df['text'].apply(processingQuestion)
# df.to_csv('file.csv', index=False)

# По номеру строки

df = pd.read_csv('file.csv')
for i in range(len(df)):
    text = df.iloc[i]['text']
    answer = processingQuestion(text)
    df.at[i, 'answer'] = answer
df.to_csv('file.csv', index=False)