# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('roast', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TempPoint',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, verbose_name='created', editable=False)),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, verbose_name='modified', editable=False)),
                ('reading', models.CharField(default='212.0', max_length=255)),
                ('time', models.PositiveIntegerField()),
                ('roast', models.ForeignKey(to='roast.Roast')),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
    ]
