try:
    import troposphere.settings.local
except ImportError:
    raise Exception("No local settings module found. Refer to README.md")
