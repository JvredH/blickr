from app.models import db, AlbumsPhotos, environment, SCHEMA


def seed_albums_photos():
  albums_photos1 = AlbumsPhotos(album_id=1, photo_id=1)
  albums_photos2 = AlbumsPhotos(album_id=2, photo_id=7)

  db.session.add(albums_photos1)
  db.session.add(albums_photos2)
  db.session.commit()


def undo_albums_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums_photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM albums_photos")

    db.session.commit()
