# Generated by Django 5.1.2 on 2024-10-20 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FF', '0003_signups'),
    ]

    operations = [
        migrations.CreateModel(
            name='addresss',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Fullname', models.CharField(max_length=50)),
                ('EMAIL', models.CharField(max_length=50)),
                ('MOBILE', models.BigIntegerField(max_length=50)),
                ('Street', models.CharField(max_length=50)),
                ('City', models.CharField(max_length=50)),
                ('State', models.CharField(max_length=50)),
                ('PIN', models.BigIntegerField(max_length=50)),
            ],
        ),
    ]
