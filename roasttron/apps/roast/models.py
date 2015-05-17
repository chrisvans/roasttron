from django.db import models

from model_utils.models import TimeStampedModel
import autoslug


class Roast(TimeStampedModel):

    name = models.CharField(max_length=255, null=False)
    slug = autoslug.fields.AutoSlugField(
        null=True, 
        editable=False,
        populate_from='name' # TODO: Callable, use name + created
    )
    coffee = models.ForeignKey(
        'coffee.Coffee', 
        null=True, 
        blank=False
    )


    def __unicode__(self):
        return u'%s: %s' % (unicode(self.coffee), self.name)