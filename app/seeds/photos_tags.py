from app.models import db, PhotosTags, environment, SCHEMA

def seed_photos_tags():
    photosTags1 = PhotosTags(photo_id=1, tag_id=1)

    db.session.add(photosTags1)
    db.session.commit()

def undo_photos_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos_tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM photos_tags")

    db.session.commit()
