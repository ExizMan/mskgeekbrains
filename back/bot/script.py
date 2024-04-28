

import requests


bot_token = '6916545851:AAFOPf6J-3rO9gNjotHOXJdr3QI-zqtwk4E'
def send_telegram_message( bot_token, chat_id, text):
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    params = {
        'chat_id': chat_id,
        'text': text
    }
    response = requests.get(url, params=params)
    print(response.json())
    if response.status_code == 200:
        print("Message sent successfully")
    else:
        print("Failed to send message")

send_telegram_message(bot_token, 836071166, "text")