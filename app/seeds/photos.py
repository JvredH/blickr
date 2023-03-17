from app.models import db, Photo, environment, SCHEMA
from datetime import date

def seed_photos():
  photo1 = Photo(url='https://live.staticflickr.com/65535/48712674607_6224279e6b_c.jpg', name='Canyon Vibes' , description='Photo was taken out in the canyons. The photo depicts a vast and expansive mountain range under a sky filled with fluffy white clouds. The foreground features a tranquil and serene lake surrounded by lush green vegetation. The mountains, which appear to be in shades of blue and grey, stretch into the distance and are shrouded in a misty haze. The photo captures the beauty and majesty of nature, with its combination of rugged mountain peaks and serene water.' , date=date(2022, 2, 22) , user_id=1)
  photo2 = Photo(url='https://live.staticflickr.com/8302/29005742911_3f516b8883_c.jpg' , name='Random photo I took' , description='Out at the lake and enjoying this view. The photo shows a brightly-lit urban cityscape at night, with tall skyscrapers towering over the streets below. The lights of the city form a dazzling array of colorful patterns and reflections, creating a vibrant and energetic atmosphere. The photo is taken from a high vantage point, capturing the sweeping lines of the city streets and the glow of the buildings against the dark night sky. Despite the frenetic energy of the city.' , date=date(2022, 1, 22) , user_id=1)
  photo3 = Photo(url='https://live.staticflickr.com/737/31844162061_db4cb4fef9_h.jpg', name='At the lake.' , description='Took a drive out to see the lake and saw this stunning view. The photo captures the majesty and power of a massive waterfall cascading down a rocky cliff face. The waterfall, which is surrounded by lush green vegetation and rocky outcroppings, creates a white misty spray as it crashes into the pool below.' , date=date(2023, 1, 10) , user_id=1)
  photo4 = Photo(url='https://live.staticflickr.com/1592/25730475136_9e9e76b4fc_h.jpg' , name='Beach Day' , description='Went to the beach to snap some flicks today. The photo captures a stunning sunset over a vast and serene body of water, with a small wooden pier jutting out into the distance. The sky is awash with warm tones of orange and pink, casting a golden glow over the landscape. The stillness of the water creates a mirror-like reflection of the sky, adding to the sense of calm and tranquility. ' , date=date(2022, 8, 22) , user_id=1)
  photo5 = Photo(url='https://live.staticflickr.com/4663/28288734859_bf4e272750_b.jpg' , name='Sunset' , description='Caught the sunset today, looked pretty good' , date=date(2022, 3, 10) , user_id=1)
  photo6 = Photo(url='https://live.staticflickr.com/65535/52699067959_e2a9f0636d_c.jpg' , name='Waterfall Hike' , description='Went for a hike today and saw this waterfall!' , date=date(2022, 4, 25) , user_id=1)
  photo7 = Photo(url='https://live.staticflickr.com/65535/52701117010_aeb3fea7f4_c.jpg' , name='Amazing' , description='Snapped a quick flick with my iphone and it came out perfect' , date=date(2022, 9, 30) , user_id=2)
  photo8 = Photo(url='https://live.staticflickr.com/5015/5474954487_7bd7ffd625_h.jpg' , name='Beach Sunset' , description='Spent the day here today' , date=date(2023, 1, 24) , user_id=2)
  photo9 = Photo(url='https://live.staticflickr.com/1940/44414769345_a4461eb8b2_c.jpg' , name='Pink Flower' , description='Saw this flower today while on a hike, had to take a pic!' , date=date(2022, 4, 15) , user_id=2)
  photo10 = Photo(url='https://live.staticflickr.com/5629/21679873090_b13a944896_h.jpg' , name='Mountains' , description='Hiked up the mountain today, caught a sick view' , date=date(2022, 4, 29) , user_id=2)
  photo11 = Photo(url='https://live.staticflickr.com/8660/16665269231_6d07d8d3c4_c.jpg' , name='Cloudy' , description='The sky was looking crazy today' , date=date(2023, 2, 20) , user_id=2)
  photo12 = Photo(url='https://live.staticflickr.com/947/40827723115_d10f0e4963_h.jpg' , name='Crazy Rocks' , description='The rocks looked sick today. Come visit.' , date=date(2023, 1, 5) , user_id=2)
  photo13 = Photo(url='https://live.staticflickr.com/5323/30433328130_dfda6f839f_c.jpg' , name='Random Photo' , description='Just going to leave this here' , date=date(2023, 1, 14) , user_id=2)
  photo14 = Photo(url='https://live.staticflickr.com/1524/24023438910_4afc06f30a_c.jpg' , name='Snow Tops' , description='Went on this crazy 8 mile hike, view was so worth it.' , date=date(2023, 1, 12) , user_id=3)
  photo15 = Photo(url='https://live.staticflickr.com/65535/52700522121_4e81978fd5_h.jpg' , name='San Francisco Sunset' , description='The best city' , date=date(2023, 1, 12) , user_id=3)
  photo16 = Photo(url='https://live.staticflickr.com/65535/52698861409_5ffe081723_b.jpg' , name='Pokey' , description="Don't touch these they might hurt." , date=date(2023, 1, 11) , user_id=3)
  photo17 = Photo(url='https://live.staticflickr.com/4385/36284963494_500c672e21_b.jpg' , name='Bamboozled' , description='Took a stroll down this path, and this is what it looked like' , date=date(2023, 1, 13) , user_id=3)
  photo18 = Photo(url='https://live.staticflickr.com/7130/26375634033_4d4e4c0079_b.jpg' , name='Clouds' , description='Was on my way home from work and I saw this.' , date=date(2023, 1, 10) , user_id=3)
  photo19 = Photo(url='https://live.staticflickr.com/4008/4185708344_a307fc25e9_c.jpg' , name='Palm Palms' , description='The trees here are awesome.' , date=date(2023, 1, 18) , user_id=3)
  photo20 = Photo(url='https://live.staticflickr.com/65535/52696716330_8cc08db321_c.jpg' , name='Random Pic' , description='Snapped this random photo' , date=date(2023, 1, 17) , user_id=3)

  all_photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16, photo17, photo18, photo19, photo20]
  add_photos = [db.session.add(photo) for photo in all_photos]
  db.session.commit()

def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM photos")

    db.session.commit()
