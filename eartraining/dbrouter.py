class MyAppRouter(object): 
    def db_for_read(model, **hints): 
        if model._meta.app_label = 'userData':
            return 'userData'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'userData':
            return 'userData'
        return None

    def allow_syncdb(self, db, model):
        if db == 'userData':
            return model._meta.app_label == 'userData'
        elif model._meta.app_label == 'userData':
            return False
        return None
