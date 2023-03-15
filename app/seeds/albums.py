from app.models import db, Albums, environment, SCHEMA


def seed_albums():
    album1 = Albums(albums_name='Sick Views', description='The best views I have', user_id=1)
    album2 = Albums(albums_name='Beautiful Views', description='Best views here', user_id=2)

    db.session.add(album1)
    db.session.add(album2)
    db.session.commit()


def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM albums")

    db.session.commit()
