# Generated by Django 5.0.4 on 2024-04-27 10:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bot', '0003_alter_chat_observer_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='tg_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='bot.student'),
            preserve_default=False,
        ),
    ]
