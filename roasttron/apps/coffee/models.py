from django.db import models

from model_utils.models import TimeStampedModel
import autoslug

class Coffee(TimeStampedModel):

    name = models.CharField(max_length=255, null=False)
    slug = autoslug.fields.AutoSlugField(
        null=True, 
        editable=False,
        populate_from='name'
    )

    def __unicode__(self):
        return u'%s' % self.name