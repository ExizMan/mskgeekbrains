# Generated by Django 5.0.4 on 2024-04-27 10:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bot', '0005_rename_tg_id_message_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chat',
            old_name='tg_id',
            new_name='usertg_id',
        ),
        migrations.RenameField(
            model_name='message',
            old_name='user_id',
            new_name='usertg_id',
        ),
        migrations.RenameField(
            model_name='student',
            old_name='tg_id',
            new_name='usertg_id',
        ),
    ]