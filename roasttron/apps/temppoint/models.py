from django.db import models

from model_utils.models import TimeStampedModel


class TempPoint(TimeStampedModel):

    # Default temperature is in F
    reading = models.CharField(max_length=255, null=False, default=u'212.0')
    # Time is in seconds, relative to the start of the roast
    time = models.PositiveIntegerField()
    roast = models.ForeignKey(
        'roast.Roast', 
        null=False
    )


    def __unicode__(self):
        return u'%s: %s at %s' % (unicode(self.roast), self.reading, self.time)

