# blickr

blickr is a website clone that is inspired by <a href='https://www.flickr.com/'>flickr</a>. blickr is for individuals looking for a place to share photos to individuals who love the art of photography. It provides a community of photography enthusiasts where they can connect and share their thoughts about any photograph that they think is cool or has a deeper meaning to. Visit blickr by clicking <a href='https://blickr.onrender.com/'>here</a> or visiting this link: https://blickr.onrender.com/.

## WikiLinks
- Database Schema: https://github.com/JvredH/blickr/wiki/Database-Schema
- Feature List: https://github.com/JvredH/blickr/wiki/MVP-Features
- User Stories: https://github.com/JvredH/blickr/wiki/User-Stories
- WireFrames: https://github.com/JvredH/blickr/wiki/WireFrames

## Built With
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)


## Features Directions
### Home Page/Splash Page
Upon visiting the link to blickr, you will be directed to the splash page. You can login/sign up by clicking either of the buttons on the top right corner. You can also sign up by clicking the 'Start for free' button located on the center of the screen. To view photos within flickr, you can click the 'Explore' button directly under it.

*** PHOTO COMING SOON ***

### Create a Photo Post
After signing in, a button with a cloud and an arrow on the top right corner of the page will appear. This will direct you to the new photo form page.

*** PHOTO COMING SOON ***

### Photo Details
You can view a photos detail page by clicking one of the photos in the feed. After clicking a photo, you will be directed to the photo detail page of that photo. If you are the user that posted the photo you will be able to see Edit and Delete photo buttons under the photo on the right side. Also on this page, you are able to leave comments of photos under below the description of the photos.

*** PHOTO COMING SOON ***

## To Do List for Future Features
- [ ] Tags
- [ ] Albums
- [ ] Search Bar
- [ ] AWS implementation

## To Get Started Locally
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. In a seperate terminal cd into the react-app directory and run the command ```pipenv install ```

## Contact Information
Jared Hem - hem.jared@gmail.com

Project Link: https://github.com/JvredH/blickr
