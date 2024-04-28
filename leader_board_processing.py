import pandas as pd
import requests
from colorama import init, Fore, Back, Style

def processingQuestion(message):
    m1 = "I: " + str(message)
    print(Back.BLUE + m1)
    response = requests.post('http://localhost:5005/webhooks/rest/webhook', json={'message': message})
    result = "O: " + str(response.json()[0]["text"])
    print(Back.GREEN + result)
    return str(response.json()[0]["text"])

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
