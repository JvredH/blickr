from app.models import db, PhotosTags, environment, SCHEMA

def seed_photos_tags():
    all_photos_tags = []
    for photo_id in range(1, 11):
        for tag_id in range(1, 9):
            photo_tag = PhotosTags(photo_id=photo_id, tag_id=tag_id)
            all_photos_tags.append(photo_tag)

    db.session.bulk_save_objects(all_photos_tags)
    db.session.commit()

    # photosTags1 = PhotosTags(photo_id=1, tag_id=1)
    # photosTags2 = PhotosTags(photo_id=1, tag_id=2)
    # photosTags3= PhotosTags(photo_id=2, tag_id=2)
    # photosTags4 = PhotosTags(photo_id=1 , tag_id=3 )
    # photosTags5 = PhotosTags(photo_id=1 , tag_id=4 )
    # photosTags6 = PhotosTags(photo_id=1 , tag_id=5 )
    # photosTags7 = PhotosTags(photo_id=1 , tag_id=6 )
    # photosTags8 = PhotosTags(photo_id=2 , tag_id=1 )
    # photosTags9 = PhotosTags(photo_id=2 , tag_id=3 )
    # photosTags10 = PhotosTags(photo_id=2 , tag_id=4 )
    # photosTags11 = PhotosTags(photo_id=2 , tag_id=5 )
    # photosTags12 = PhotosTags(photo_id=2 , tag_id=6 )
    # photosTags13 = PhotosTags(photo_id=3 , tag_id=1 )
    # photosTags14 = PhotosTags(photo_id=3 , tag_id=2 )
    # photosTags15 = PhotosTags(photo_id=3 , tag_id=3 )
    # photosTags16 = PhotosTags(photo_id=3 , tag_id=4 )
    # photosTags17 = PhotosTags(photo_id=3 , tag_id=5 )
    # photosTags18 = PhotosTags(photo_id=3 , tag_id=6 )
    # photosTags19 = PhotosTags(photo_id=4 , tag_id=2 )
    # photosTags20 = PhotosTags(photo_id=4 , tag_id=3 )
    # photosTags21 = PhotosTags(photo_id=5 , tag_id=3 )
    # photosTags22 = PhotosTags(photo_id=5 , tag_id=4 )
    # photosTags23 = PhotosTags(photo_id=5 , tag_id=5 )
    # photosTags24 = PhotosTags(photo_id=6 , tag_id=3 )
    # photosTags25 = PhotosTags(photo_id=6 , tag_id=2 )
    # photosTags26 = PhotosTags(photo_id=7 , tag_id=1 )
    # photosTags27 = PhotosTags(photo_id=7 , tag_id=2 )
    # photosTags28 = PhotosTags(photo_id=7 , tag_id=3 )

    # allPhotosTags = [photosTags1, photosTags2, photosTags3, photosTags4, photosTags5, photosTags6, photosTags7,photosTags8 ,photosTags9, photosTags10,photosTags11, photosTags12, photosTags13, photosTags14, photosTags15, photosTags16, photosTags17, photosTags18, photosTags19, photosTags20, photosTags21, photosTags22, photosTags23, photosTags24, photosTags25, photosTags26, photosTags27, photosTags28]
    # addPhotosTags = [db.session.add(photosTags) for photosTags in allPhotosTags]
    # db.session.commit()

def undo_photos_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos_tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM photos_tags")

    db.session.commit()
