# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone
import autoslug.fields
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('coffee', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Roast',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, verbose_name='created', editable=False)),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, verbose_name='modified', editable=False)),
                ('name', models.CharField(max_length=255)),
                ('slug', autoslug.fields.AutoSlugField(null=True, editable=False)),
                ('coffee', models.ForeignKey(to='coffee.Coffee', null=True)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
    ]
