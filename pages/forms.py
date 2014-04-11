from django import forms
from pages.models import User

class RegisterForm(forms.ModelForm):
    username = forms.CharField(max_length=20, help_text="Enter desired username.")
    password = forms.CharField(max_length=30, help_text="Choose a secure password.")
    confirm = forms.CharField(max_length=30, help_text="Reenter your password.")

    class Meta: 
        model = User
        fields = ('username', 'password', 'confirm')
