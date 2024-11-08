from fastapi import APIRouter, Query
import mysql.connector as mysql 
from pydantic import BaseModel
import logging

router = APIRouter()

db_config = {
    'host': 'localhost',    
    'user': 'root',
    'passwd': 'password',
    'db': 'CS631_Project',
}

class User(BaseModel):
    username: str
    email: str
    password: str
    bio: str

class UpdateUser(BaseModel):
    user_id : int
    username: str
    email: str
    password: str
    bio: str

class Post(BaseModel):
    user_id: int
    content: str

class UpdatePost(BaseModel):
    post_id : int
    user_id : int 
    content : str

class Like(BaseModel):
    user_id: int
    post_id: int

class Comment(BaseModel):
    user_id: int
    post_id: int
    content: str

class UpdateComment(BaseModel):
    comment_id: int
    user_id: int
    post_id: int
    content: str

class DeleteUser(BaseModel):
    user_id: int

class DeletePost(BaseModel):
    post_id: int

class DeleteLike(BaseModel):
    like_id: int

class DeleteComment(BaseModel):
    comment_id: int

class Follower(BaseModel):
    pass

# add user 
@router.post("/adduser")
def add_user(user : User):
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()
        insert_query = f""" 
            INSERT INTO users (username, email, user_password, bio) VALUES 
            ('{user.username}', '{user.email}', '{user.password}', '{user.bio}');
        """
        cursor.execute(insert_query)
        db_connection.commit()
        print(insert_query)
        cursor.close()
        db_connection.close()

# add post 
@router.post("/addpost")
def add_post(post: Post):
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()
        insert_query = f""" 
            INSERT INTO posts (user_id, post_timestamp, content, likes_count, comments_count) VALUES 
            ('{post.user_id}', NOW(), '{post.content}', 0, 0);
        """
        cursor.execute(insert_query)
        db_connection.commit()
        print(insert_query)
        cursor.close()
        db_connection.close()

# add comment 
@router.post("/addcomment")
def add_comment(comment: Comment):
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()
        insert_query = f""" 
            INSERT INTO comments (user_id, post_id, content, comment_timestamp) VALUES 
            ('{comment.user_id}', '{comment.post_id}', '{comment.content}', NOW());
        """
        cursor.execute(insert_query)
        db_connection.commit()
        print(insert_query)
        cursor.close()
        db_connection.close()

# add like 
@router.post("/addlike")
def add_like(like: Like):

    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()
        insert_query = f""" 
            INSERT INTO likes (user_id, post_id) VALUES
            ('{like.user_id}', '{like.post_id}')
        """
        cursor.execute(insert_query)
        db_connection.commit()
        print(insert_query)
        cursor.close()
        db_connection.close()

@router.post("/addfollow")
def add_follow(follower: Follower):
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()
        insert_query = f""" 
            INSERT INTO followers (user_id, follower_id) VALUES
            ('{follower.user_id}', '{follower.follower_id}')
        """
        cursor.execute(insert_query)
        db_connection.commit()
        print(insert_query)
        cursor.close()
        db_connection.close()

@router.get("/users")
def get_users():
    db_connection = mysql.connect(**db_config)
        
    if db_connection.is_connected():
        cursor = db_connection.cursor()
        select_query = "SELECT * FROM users ORDER BY user_id DESC;"
        cursor.execute(select_query)
        rows = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in cursor.fetchall()]
        cursor.close()
        db_connection.close()
        return {"users": rows}
    
@router.get("/posts")
def get_posts():
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()
        select_query = "SELECT * FROM posts ORDER BY post_id DESC;"
        cursor.execute(select_query)
        rows = cursor.fetchall()
        cursor.close()
        db_connection.close()
        return {"posts": rows}
    
@router.get("/comments")
def get_comments():
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()
        select_query = f"""
        SELECT * FROM comments ORDER BY comment_id DESC
        """
        cursor.execute(select_query)
        rows = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in cursor.fetchall()]
        cursor.close()
        db_connection.close()
        return {"comments": rows}

@router.get("/likes")
def get_likes():
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()
        select_query = f"""
        SELECT * FROM likes ORDER BY like_id DESC
        """
        cursor.execute(select_query)
        rows = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in cursor.fetchall()]
        cursor.close()
        db_connection.close()
        return {"likes": rows}
    
@router.get("/followers")
def get_followers():
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()
        select_query = f"""
        SELECT followers.id, u1.user_id, u1.username, followers.follower_id, u2.username AS follower_name FROM followers 
        JOIN users u1 ON u1.user_id = followers.user_id
        JOIN users u2 ON u2.user_id = followers.follower_id
        ORDER BY follower_id DESC
        """
        cursor.execute(select_query)
        rows = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in cursor.fetchall()]
        cursor.close()
        db_connection.close()
        return {"followers": rows}

@router.get("/getalluserids")
def get_all_user_ids():
    db_connection = mysql.connect(**db_config)
    cursor = db_connection.cursor()

    select_query = "SELECT user_id FROM users ORDER BY user_id ASC;"
    cursor.execute(select_query)
    rows = cursor.fetchall()
    user_ids = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in rows]

    cursor.close()
    db_connection.close()

    return user_ids

    
@router.get("/getallpostids")
def get_all_post_ids():
    db_connection = mysql.connect(**db_config)
    cursor = db_connection.cursor()

    select_query = "SELECT post_id FROM posts ORDER BY post_id ASC;"
    cursor.execute(select_query)

    rows = cursor.fetchall()
    post_ids = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in rows]

    cursor.close()
    db_connection.close()

    return post_ids

@router.get("/getallfollowerids")
def get_all_user_ids():
    db_connection = mysql.connect(**db_config)
    cursor = db_connection.cursor()

    select_query = "SELECT DISTINCT user_id FROM users ORDER BY user_id ASC;"
    cursor.execute(select_query)
    rows = cursor.fetchall()
    user_ids = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in rows]

    cursor.close()
    db_connection.close()

    return user_ids


@router.get("/getalllikeids")
def get_all_user_ids():
    db_connection = mysql.connect(**db_config)
    cursor = db_connection.cursor()

    select_query = "SELECT DISTINCT like_id FROM likes ORDER BY like_id ASC;"
    cursor.execute(select_query)
    rows = cursor.fetchall()
    like_ids = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in rows]

    cursor.close()
    db_connection.close()

    return like_ids

@router.get("/getallcommentids")
def get_all_user_ids():
    db_connection = mysql.connect(**db_config)
    cursor = db_connection.cursor()

    select_query = "SELECT DISTINCT comment_id FROM comments ORDER BY comment_id ASC;"
    cursor.execute(select_query)
    rows = cursor.fetchall()
    comment_ids = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in rows]

    cursor.close()
    db_connection.close()

    return comment_ids

@router.get("/{post_id}/likes")
def get_likes_for_post():
    
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()
        select_query = "SELECT likes_count FROM posts WHERE post_id = %s"
        cursor.execute(select_query)
        rows = cursor.fetchall()
        cursor.close()
        db_connection.close()
        return {"likes_count": rows[0][0]} if rows else {"likes_count": 0}
    
# search bar functionality --> WHERE LIKE clause 
@router.get("/search_posts/")
def search_posts(keyword: str = Query(..., min_length=1)):
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()
        select_query = "SELECT * FROM posts WHERE content LIKE %s ORDER BY post_id DESC;"
        cursor.execute(select_query, ('%' + keyword + '%',))
        # rows = cursor.fetchall()
        rows = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in cursor.fetchall()]
        cursor.close()
        db_connection.close()
        return {"posts": rows}

    
# order posts by most liked

# function to get post between range of dates

# get average stats on a user (count of posts, total # of likes, )
@router.get("/{user_id}/user_stats")
def get_user_stats():
    pass

# get count of likes and comments grouped by user_id 
@router.get("/getaveragestats")
def get_all_stats():
        # Establish database connection
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()

        select_query = """
            SELECT l.user_id, 
                   COUNT(DISTINCT like_id) AS like_count, 
                   COUNT(DISTINCT comment_id) AS comment_count
            FROM likes l 
            JOIN comments c ON l.user_id = c.user_id
            GROUP BY l.user_id
            ORDER BY like_count DESC, comment_count DESC
        """
        cursor.execute(select_query)
        rows = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in cursor.fetchall()]

        cursor.close()
        db_connection.close()

        return {"user_stats": rows}



# if post is deleted --> delete comments and likes associated with that post 

# triggers to update like count 

# triggers to update comments 

# get top 3 users with most followers

# delete user
@router.post("/deleteuser")
def delete_user(user: DeleteUser):
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()

        delete_query = f"""DELETE FROM users WHERE user_id = {user.user_id}"""
        cursor.execute(delete_query)

        db_connection.commit()

        cursor.close()
        db_connection.close()


# delete post 
@router.post("/deletepost/")
def delete_user(post: DeletePost):
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()

        delete_query = f"""DELETE FROM posts WHERE post_id = {post.post_id}"""
        cursor.execute(delete_query)

        db_connection.commit()

        cursor.close()
        db_connection.close()

# delete comment 

@router.post("/deletecomment")
def delete_like(comment: DeleteComment):
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()

        delete_query = f"""DELETE FROM comments WHERE comment_id = {comment.comment_id}"""
        
        cursor.execute(delete_query)

        db_connection.commit()

        cursor.close()
        db_connection.close()

# delete like 

@router.post("/deletelike/")
def delete_like(like: DeleteLike):
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()

        delete_query = f"""DELETE FROM likes WHERE like_id = {like.like_id}"""
        
        cursor.execute(delete_query)

        db_connection.commit()

        cursor.close()
        db_connection.close()


# update user 

@router.post("/updateuser")
def add_user(user : UpdateUser):
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()
        insert_query = f""" 
            UPDATE users
            SET username = '{user.username}',
            email = '{user.email}',
            user_password = '{user.password}',
            bio = '{user.bio}'
            WHERE user_id = {user.user_id}
        """
        cursor.execute(insert_query)
        db_connection.commit()
        print(insert_query)
        cursor.close()
        db_connection.close()


# update post 

@router.post("/updatepost")
def add_user(post : UpdatePost):
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()
        insert_query = f""" 
            UPDATE posts
            SET user_id = {post.user_id},
            content = '{post.content}'
            WHERE post_id = {post.post_id}
        """
        cursor.execute(insert_query)
        db_connection.commit()
        print(insert_query)
        cursor.close()
        db_connection.close()


# update comment 

@router.post("/updatecomment")
def add_user(comment : UpdateComment):
    db_connection = mysql.connect(**db_config)

    if db_connection.is_connected():
        cursor = db_connection.cursor()
        insert_query = f""" 
            UPDATE comments
            SET user_id = {comment.user_id},
            post_id = {comment.post_id},
            content = '{comment.content}'
            WHERE comment_id = {comment.comment_id}
        """
        cursor.execute(insert_query)
        db_connection.commit()
        print(insert_query)
        cursor.close()
        db_connection.close()

# user engagement analysis 
@router.get("/userengagementanalysis")
def get_user_engagement():
    db_connection = mysql.connect(**db_config)
    cursor = db_connection.cursor()

    select_query = f"""
    SELECT p.user_id, u.username, 
       AVG(l.like_count) AS avg_likes_per_post, 
       AVG(c.comment_count) AS avg_comments_per_post
    FROM posts p
    JOIN users u ON p.user_id = u.user_id
    LEFT JOIN (
        SELECT post_id, COUNT(like_id) AS like_count
        FROM likes
        GROUP BY post_id
    ) l ON p.post_id = l.post_id
    LEFT JOIN (
        SELECT post_id, COUNT(comment_id) AS comment_count
        FROM comments
        GROUP BY post_id
    ) c ON p.post_id = c.post_id
    GROUP BY p.user_id
    ORDER BY p.user_id;"""
    cursor.execute(select_query)
    rows = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in cursor.fetchall()]

    cursor.close()
    db_connection.close()

    return {"userengagement": rows}

# user engagement analysis 
@router.get("/top3posts")
def get_top_posts():
    db_connection = mysql.connect(**db_config)
    cursor = db_connection.cursor()

    select_query = f"""
    SELECT *
    FROM posts
    ORDER BY (likes_count + comments_count) DESC
    LIMIT 3;"""
    cursor.execute(select_query)
    rows = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in cursor.fetchall()]

    cursor.close()
    db_connection.close()

    return {"top3posts": rows}
