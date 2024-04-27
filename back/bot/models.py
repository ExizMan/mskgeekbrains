from django.db import models


class Message(models.Model):
    # tg_id = models.IntegerField()
    chat_id = models.ForeignKey('bot.Chat', on_delete=models.CASCADE)
    text = models.TextField()
    # is_sended_to_rasa = models.BooleanField()

    is_processed_rasa = models.BooleanField(null=True, blank=True)
    answer = models.TextField(null=True, blank=True)
    answer_by = models.TextField(choices=[(0, 'observer'), (1, 'rasa')], null=True, blank=True)
    is_rasa_can_solve = models.BooleanField(null=True, blank=True)
    # is_sended_to_gpt = models.BooleanField()
    date = models.DateTimeField()

    sent_to = models.TextField(choices=[(0, 'rasa'), (1, 'gpt')], null=True, blank=True)

    gpt_answer = models.TextField(null=True, blank=True)




class Chat(models.Model):
    tg_id = models.ForeignKey('Student', on_delete=models.CASCADE)
    observer_id = models.ForeignKey('users.User', on_delete=models.CASCADE, null=True, blank=True)


class Student(models.Model):
    firstname = models.TextField()
    lastname = models.TextField()
    username = models.TextField()
    tg_id = models.IntegerField(primary_key=True)


# Create your models here.
