# Generated by Django 2.2 on 2019-04-30 08:36

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('member', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='id',
            field=models.UUIDField(default=uuid.UUID('fe67c682-6b22-11e9-88ce-784f4385dde6'), editable=False, primary_key=True, serialize=False),
        ),
    ]
