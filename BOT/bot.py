import logging
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import Application,PicklePersistence, CommandHandler, MessageHandler, CallbackQueryHandler, filters, ConversationHandler, ContextTypes
import logging
from aiohttp import ClientSession
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ConversationHandler, ContextTypes
persistence = PicklePersistence(filepath='my_bot_persistence')

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Extract text from the incoming Telegram message
    text = update.message.text
    message_data = {
        "text": update.message.text,  # Текст сообщения
        "date": update.message.date.strftime("%Y-%m-%d %H:%M:%S"),  # Дата в формате строки
        "chat_id": update.message.chat.id,  # ID чата
        "user_id": update.message.from_user.id  # ID пользователя
    }
    print(message_data)
    # Prepare the HTTP POST request
    url = 'http://192.168.1.206:8000/bot/test/'
    async with ClientSession() as session:
        try:
            # Send the text to your custom endpoint as JSON
            async with session.post(url, json={"message": message_data }) as response:
                
                if response.status == 200:
                    # Receive the response text (JSON expected)
                    data = await response.json()
                    print(data)
                    response_text = data.get("message", "No response from server")
                else:
                    response_text = f"Failed to reach the server, status code: {response.status}"
        except Exception as e:
            response_text = f"An error occurred: {str(e)}"
            logging.error(f"HTTP request error: {e}")

    # Send the response back to the user
    keyboard = [[InlineKeyboardButton("Call Manager", callback_data='call_manager')]]
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
    message = "Welcome! How can I assist you today?"
    keyboard = [[InlineKeyboardButton("Call Manager", callback_data='call_manager')]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(message, reply_markup=reply_markup)
    return TEXT_INPUT

# Function to handle the help command
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    help_text = "This is the help section. Ask me anything!"
    keyboard = [[InlineKeyboardButton("Call Manager", callback_data='call_manager')]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(help_text, reply_markup=reply_markup)

# Function to handle button presses (callback queries)
async def handle_callback_query(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()  # Notify Telegram that the callback has been handled
    if query.data == 'call_manager':
        await query.edit_message_text(text="Help is on the way!")
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
