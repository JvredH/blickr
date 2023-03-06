from app.models import db, Tags, environment, SCHEMA

def seed_tags():
    tags1 = Tags(tag_name='view')

    db.session.add(tags1)
    db.session.commit()


def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tags")

    db.session.commit()
