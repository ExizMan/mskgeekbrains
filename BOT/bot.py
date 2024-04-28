import logging
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import Application,PicklePersistence, CommandHandler, MessageHandler, CallbackQueryHandler, filters, ConversationHandler, ContextTypes
import logging
from aiohttp import ClientSession
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ConversationHandler, ContextTypes
persistence = PicklePersistence(filepath='my_bot_persistence',)
import requests
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Extract text from the incoming Telegram message
    await update.message.reply_text("Ожидайте...")

    text = update.message.text
    message_data = {
        "text": update.message.text,  # Текст сообщения
        "date": update.message.date.strftime("%Y-%m-%d %H:%M:%S"),  # Дата в формате строки
        "chat_id": update.message.chat.id,  # ID чата
        "usertg_id": update.message.from_user.id  # ID пользователя
    }
    print(message_data)
    # Prepare the HTTP POST request
    url = 'http://192.168.1.206:8000/bot/api/message/receive/'

    # Send "Loading..." message to the user

    async with ClientSession() as session:
        try:
            # Send the text to your custom endpoint as JSON
            async with session.post(url, json=message_data) as response:
                if response.status == 200 or response.status == 201:
                    # Receive the response text (JSON expected)
                    data = await response.json()
                    print(data)
                    response_text = data.get('text', 'Вызываю менеджера, не понял что вы сказали')
                else:
                    response_text = f"Failed to reach the server, status code: {response.status}"
        except Exception as e:
            response_text = f"An error occurred: {str(e)}"
            logging.error(f"HTTP request error: {e}")

    # Send the response back to the user
    keyboard = [
    [
        InlineKeyboardButton("1", callback_data='1'),
        InlineKeyboardButton("2", callback_data='2'),
        InlineKeyboardButton("3", callback_data='3'),
        InlineKeyboardButton("4", callback_data='4'),
        InlineKeyboardButton("5", callback_data='5')
    ]
]

    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(response_text, reply_markup=reply_markup)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Telegram bot token
TELEGRAM_TOKEN = "6916545851:AAFOPf6J-3rO9gNjotHOXJdr3QI-zqtwk4E"

# Define conversation states
TEXT_INPUT, HELP = range(2)

# Function to handle the start command
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
        # Получаем user_tg_id и chat_id из сообщения пользователя
    user_tg_id = update.effective_user.id
    chat_id = update.effective_chat.id

    # Определяем приветственное сообщение
    message = "Привет! Рад помочь тебе с учебными вопросами!"

    # Создаем клавиатуру с кнопкой для вызова менеджера
#     keyboard = [
#     [
#         InlineKeyboardButton("1", callback_data='1'),
#         InlineKeyboardButton("2", callback_data='2'),
#         InlineKeyboardButton("3", callback_data='3'),
#         InlineKeyboardButton("4", callback_data='4'),
#         InlineKeyboardButton("5", callback_data='5')
#     ]
# ]

#     # Создаем разметку для клавиатуры
#     reply_markup = InlineKeyboardMarkup(keyboard)

    # Отправляем сообщение пользователю с клавиатурой
    await update.message.reply_text(message)#, reply_markup=reply_markup)

    # Здесь можно добавить логику для отправки user_tg_id и chat_id на ваш API-эндпоинт
    # Например, можно использовать библиотеку requests для отправки POST-запроса на ваш API
    # 
    api_url = "http://192.168.1.206:8000/bot/api/student/"
    payload = {'usertg_id': user_tg_id} #, 'chat_id': chat_id
    response = requests.post(api_url, json={'usertg_id': user_tg_id})
    print({'usertg_id': user_tg_id})
    # Проверяем успешность запроса и обрабатываем ответ
    if response.status_code == 200:
        print("User data sent successfully to the API.")
    else:
        print(f"Failed to send user data to the API.{response.status_code}")
    response = requests.post("http://192.168.1.206:8000/bot/api/chat/", json={'id':chat_id,'usertg_id': user_tg_id,'observer_id' : 1})
    print({'usertg_id': user_tg_id})
    # Проверяем успешность запроса и обрабатываем ответ
    if response.status_code == 200:
        print("User data sent successfully to the http://192.168.1.206:8000/bot/api/chat/.")
    else:
        print(f"Failed to send user data to the API.{response.status_code}")
    # Возвращаем следующее состояние для обработчика диалога
    return TEXT_INPUT
# Function to handle the help command
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    help_text = "This is the help section. Ask me anything!"
    keyboard = [
    [
        InlineKeyboardButton("1", callback_data='1'),
        InlineKeyboardButton("2", callback_data='2'),
        InlineKeyboardButton("3", callback_data='3'),
        InlineKeyboardButton("4", callback_data='4'),
        InlineKeyboardButton("5", callback_data='5')
    ]
    ]

    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(help_text, reply_markup=reply_markup)

# Function to handle button presses (callback queries)
async def handle_callback_query(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer() 
     # Notify Telegram that the callback has been handled
    if query.data in {'1', '2'}:
        await query.edit_message_text(text="Перевожу на куратора")
    elif query.data in {'3', '4'}:
        await query.edit_message_text(text="Что можно было бы улучшить?")
    elif query.data in {'5'}:
        await query.edit_message_text(text="Cпасибо за обратную связь!")
    else:
        await query.edit_message_text(text="Sorry, I didn't understand that command.")
async def handle_group_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_message = update.message.text
    print(f"User message: {user_message}")
    await context.bot.send_message(chat_id=update.effective_chat.id, text="I received your message!")

# Main function to start the bot
def main():
    application = Application.builder().token(TELEGRAM_TOKEN).persistence(persistence).build()

    # Define the conversation handler
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],
        states={
            TEXT_INPUT: [MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message)],
            HELP: [CommandHandler('help', help_command)]
        },
        fallbacks=[CommandHandler('start', start)]
    )

    # Add the conversation handler and the callback query handler to the application
    application.add_handler(conv_handler)
    application.add_handler(CallbackQueryHandler(handle_callback_query))
    group_message_handler = MessageHandler(filters.ChatType.GROUPS, handle_group_message)
    application.add_handler(group_message_handler)
    # Start the bot
    application.run_polling()

if __name__ == '__main__':
    main()
