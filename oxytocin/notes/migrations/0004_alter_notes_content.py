# Generated by Django 5.0.3 on 2024-03-10 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0003_category_alter_notes_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notes',
            name='content',
            field=models.TextField(blank=True),
        ),
    ]