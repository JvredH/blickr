from app.models import db, Tags, environment, SCHEMA

def seed_tags():
    tags1 = Tags(tag_name='view')
    tags2 = Tags(tag_name='beautiful')
    tags3 = Tags(tag_name='amazing')
    tags4 = Tags(tag_name='sick')
    tags5 = Tags(tag_name='nice')
    tags6 = Tags(tag_name='pink')
    tags7 = Tags(tag_name='wonderful')
    tags8 = Tags(tag_name='candid')

    db.session.add(tags1)
    db.session.add(tags2)
    db.session.add(tags3)
    db.session.add(tags4)
    db.session.add(tags5)
    db.session.add(tags6)
    db.session.add(tags7)
    db.session.add(tags8)

    db.session.commit()


def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tags")

    db.session.commit()
