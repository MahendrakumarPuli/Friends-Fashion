from django.shortcuts import render,redirect
from .models import contacts
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.models import User


# Create your views here.
def home(request):
    return render(request,"index.html")

def brand(request):
    return render(request,"brands.html")

def shop(request):
    return render(request,"shop.html")

def contact(request):
    if request.method=="POST":

        username=request.POST["uname"]
        useremail=request.POST["umail"]
        usermobile=request.POST["umobile"]
        usersubject=request.POST["subject"]
        usermessage=request.POST['msgs']

        record=contacts.objects.create(name=username,email=useremail,mobile=usermobile,subject=usersubject,msg=usermessage)
        record.save()

    return render(request,"contact.html")

def mens(request):
    return render(request,"menfashion.html")

def womens(request):
    return render(request,"women'sFashion.html")

def traditional(request):
    return render(request,"Tradition wear.html")

def kids(request):
    return render(request,"kids wear.html")

def bags(request):
    return render(request,"Bags.html")

def footwear(request):
    return render(request,"Footwear.html")



from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages

def signup(request):
    if request.method == "POST":
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        phone = request.POST['smobile']
        username = request.POST['suser']
        email = request.POST['smail']
        password = request.POST['password']
        confirm_password = request.POST['cpassword']

        # Check if passwords match
        if password == confirm_password:
            # Check if username already exists
            if User.objects.filter(username=username).exists():
                messages.error(request, "Username already exists")
            # Check if email is already registered
            elif User.objects.filter(email=email).exists():
                messages.error(request, "Email is already registered")
            else:
                # Create the user
                user = User.objects.create_user(
                    username=username, 
                    password=password,
                    email=email, 
                    first_name=first_name, 
                    last_name=last_name
                )
                user.save()
                messages.success(request, "Account created successfully")
                return render(request,'login.html')
                # return redirect('login')  # Redirect to login page after successful registration
        else:
            messages.error(request, "Passwords do not match")
    
    return render(request, 'register.html')

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            messages.error(request,'Logged in successfully ')
            # Redirect to a success page (you can change this to any URL)
            return redirect('home')  
        else:
            messages.error(request, 'Invalid username or password.')

    return render(request, 'login.html')  # Make sure to point to your actual template path

@login_required(login_url='login_view')
def logout_view(request):
    logout(request)
    messages.success(request,'Logged out successfully')
    return redirect('home')


from django.shortcuts import render, redirect
from django.contrib import messages

def cart(request):
    # Assuming address is stored in session or database
    address = request.session.get('address', None)  # Get the address from the session, if available
    return render(request, 'cart.html', {'address': address})

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Address

@login_required(login_url='login_view')
def address(request):
    if request.method == 'POST':
        name=request.POST.get('name')
        email=request.POST.get('email')
        phone=request.POST.get('phone')
        street = request.POST.get('street')
        city = request.POST.get('city')
        state=request.POST.get('state')
        pin = request.POST.get('pin')
        country = request.POST.get('country')
        ship=request.POST.get('ship')

        # Save the address to the database for the logged-in user
        Address.objects.create(
            user=request.user,
            name=name,
            email=email,
            phone=phone,
            street=street,
            city=city,
            state=state,
            pin=pin,
            country=country,
            shipping=ship
        )

        messages.success(request, 'Address added successfully!')
        return redirect('cart')  # Redirect back to the cart page after adding the address

    return render(request, 'address.html')

@login_required(login_url='login_view')
def cart(request):
    # Get the address for the logged-in user
    address = Address.objects.filter(user=request.user).first()  
    return render(request, 'cart.html', {'address': address})