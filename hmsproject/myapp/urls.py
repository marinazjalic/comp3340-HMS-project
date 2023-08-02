from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('patients/', views.patients, name = 'patients'),
    path('appointments/', views.appointments, name = "appointments"),
    path('patientView/', views.patientView, name = "patientView")
  
]