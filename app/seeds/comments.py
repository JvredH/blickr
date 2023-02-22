from app.models import db, Comment, environment, SCHEMA
from datetime import date

def seed_comments():
  comment1 = Comment(comment='That is an amazing photo', date=date(2022, 2, 23) , photo_id=1 , user_id=2)
  comment2 = Comment(comment='What a wonderful photo', date=date(2022, 1, 23) , photo_id=2 , user_id=2)
  comment3 = Comment(comment='Beautiful!', date=date(2023, 1, 11) , photo_id=3 , user_id=2)
  comment4 = Comment(comment='Love it!', date=date(2022, 8, 23) , photo_id=4 , user_id=2)
  comment5 = Comment(comment='that looks amazing' , date=date(2022, 3, 11) , photo_id=5 , user_id=2)
  comment6 = Comment(comment='What a great photo, I wish I had the skills like you!' , date=date(2022, 4, 26) , photo_id=6 , user_id=2)
  comment7 = Comment(comment='What an impressive shot' , date=date(2022, 9, 31) , photo_id=7 , user_id=3)
  comment8 = Comment(comment='I want to visit this place one day' , date=date(2023, 1, 25) , photo_id=8 , user_id=3)
  comment9 = Comment(comment='Wow!' , date=date(2022, 4, 16) , photo_id=9 , user_id=3)
  comment10 = Comment(comment='That is sick!' , date=date(2022, 4, 30) , photo_id=10 , user_id=3)
  comment11 = Comment(comment='Awesome work!' , date=(2023, 2, 20) , photo_id=11 , user_id=3)
  comment12 = Comment(comment='beautiful!' , date=date(2023, 1, 6) , photo_id=12 , user_id=3)
  comment13 = Comment(comment='Wow thats a lovely photo' , date=date(2023, 1, 15) , photo_id=13 , user_id=3)
  comment14 = Comment(comment='so pretty!' , date=date(2023, 1, 13) , photo_id=14 , user_id=1)
  comment15 = Comment(comment='sweet photo man' , date=date(2023, 1, 13) , photo_id=15 , user_id=1)
  comment16 = Comment(comment='That is awesome!' , date=date(2023, 1, 12) , photo_id=16 , user_id=1)
  comment17 = Comment(comment='Lovin it!' , date=date(2023, 1, 14) , photo_id=17 , user_id=1)
  comment18= Comment(comment='Wow!' , date=date(2023, 1, 11) , photo_id=18 , user_id=1)
  comment19 = Comment(comment='Amazing!' , date=date(2023, 1, 19) , photo_id=19 , user_id=1)
  comment20 = Comment(comment='That is a stunning shot' , date=date(2023, 1, 18) , photo_id=20 , user_id=1)

  all_comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13, comment14, comment15, comment16, comment17, comment18, comment19, comment20 ]
  add_comments = [db.session.add(comment) for comment in all_comments]
  db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
