from django.shortcuts import render,HttpResponse
import calendar
from calendar import HTMLCalendar

from datetime import datetime

# Create your views here.

def home(request, ):
    return render(request, 'main/index.html')

def dashboard(request):
    #create current calendar
    now = datetime.now();
    current_month = now.month;
    current_year = now.year;
    cal = HTMLCalendar().formatmonth(current_year, current_month);
    return render(request, 
    'main/dashboard.html', {
        "year": current_year,
        "month": current_month,
        "month_number": current_month,
        "cal": cal,
        "current_year": current_year,     
    })

def patients(request):
    return render(request, "main/patients.html")


def appointments(request):
    return render(request, "main/appointments.html")


def patientView(request):
    return render(request, "main/patientView.html")


