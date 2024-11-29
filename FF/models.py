from django.db import models

# Create your models here.
class contacts(models.Model):
    name=models.CharField(max_length=50,null=False)
    email=models.EmailField(max_length=30,null=False)
    mobile=models.BigIntegerField(null=False)
    subject=models.CharField(max_length=100,null=False)
    msg=models.CharField(max_length=100,null=True)


# class addresss(models.Model):
#     Fullname=models.CharField(max_length=50,null=False)
#     EMAIL=models.CharField(max_length=50,null=False)
#     MOBILE=models.BigIntegerField(null=False)
#     Street=models.CharField(max_length=50,null=False)
#     City=models.CharField(max_length=50,null=False)
#     State=models.CharField(max_length=50,null=False)
#     PIN=models.BigIntegerField(null=False)
#     Country=models.CharField(max_length=50,null=False)
#     Shipping=models.CharField(max_length=50,null=False)

from django.db import models
from django.contrib.auth.models import User

class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link the address to the user
    name=models.CharField(max_length=50,null=False)
    email=models.CharField(max_length=50,null=False)
    phone=models.BigIntegerField(null=False)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state=models.CharField(max_length=50,null=False)
    pin = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    shipping=models.CharField(max_length=50,null=False)

    def __str__(self):
        return f'{self.name},{self.email},{self.phone},{self.street}, {self.city}, {self.state},{self.pin},{self.country},{self.shipping}'
