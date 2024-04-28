import uuid

from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Message(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    usertg_id = models.ForeignKey('Student', on_delete=models.CASCADE)
    chat_id = models.ForeignKey('bot.Chat', on_delete=models.CASCADE)
    text = models.TextField()
    # is_sended_to_rasa = models.BooleanField()

    is_processed_rasa = models.BooleanField(null=True, blank=True)
    answer = models.TextField(null=True, blank=True)
    answer_by = models.TextField(choices=[("observer", "observer"), ("rasa", "rasa"),("student", "student")], null=True, blank=True)
    is_rasa_can_solve = models.BooleanField(null=True, blank=True)
    # is_sended_to_gpt = models.BooleanField()
    date = models.DateTimeField()

    sent_to = models.TextField(choices=[('rasa', 'rasa'), ('gpt', 'gpt')], null=True, blank=True)

    gpt_answer = models.TextField(null=True, blank=True)




class Chat(models.Model):
    id = models.IntegerField(primary_key=True)
    usertg_id = models.ForeignKey('Student', on_delete=models.CASCADE)
    observer_id = models.ForeignKey('users.User', on_delete=models.CASCADE, null=True, blank=True)


class Student(models.Model):
    firstname = models.TextField(blank=True, null=True)
    username = models.TextField(blank=True, null=True)
    usertg_id = models.IntegerField(primary_key=True)

class Review(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    observer = models.ForeignKey('users.User', on_delete=models.CASCADE)
    on_message = models.ForeignKey(Message, on_delete=models.CASCADE)
    rate = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    description = models.TextField()

class Statistics(models.Model):
    observer = models.ForeignKey('users.User', on_delete=models.CASCADE)
    reviews = models.ManyToManyField(Review)
    messages = models.ManyToManyField(Message)

    def clean(self):
        super().clean()

        for review in self.reviews.all():
            if review.observer != self.observer:
                raise ValidationError("Observer of review must match Statistics observer.")

        for message in self.messages.all():
            if message.observer != self.observer:
                raise ValidationError("Observer of message must match Statistics observer.")

# Create your models here.
