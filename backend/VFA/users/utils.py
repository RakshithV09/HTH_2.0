# users/utils.py
def is_viewer(user):
    return user.groups.filter(name='Viewer').exists()

def is_business_owner(user):
    return user.groups.filter(name='Business Owner').exists()

def is_finance_team(user):
    return user.groups.filter(name='Finance Team').exists()

def get_user_groups(user):
    return list(user.groups.values_list('name', flat=True))
