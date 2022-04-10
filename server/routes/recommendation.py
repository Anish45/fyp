import string
import sys;
import pandas as pd;


ratings = pd.read_csv('C:/Users/Anish/Desktop/fyp/server/routes/ratings.csv')
recipes = pd.read_csv('C:/Users/Anish/Desktop/fyp/server/routes/recipes.csv')
ratings = pd.merge(recipes,ratings)
ratings.head()

#pivot table the merged dataframe where index is usedid and columns is title and value is rating
ratings = ratings.pivot_table(index=['userId'],columns=['title'],values='rating')
#dropping all the movies which is rated by less than 10 users and fill nan values with 0
ratings = ratings.dropna(thresh=10, axis=1).fillna(0,axis=1)
ratings.head()

similarity = ratings.corr(method='pearson')
similarity.head(10)


#creating a function which returns similarity value
def get_similar(title,rating):
    similarity_value = similarity[title]
    return similarity_value


#creating a user and storing the movies they have rated previously and making recommendations
user = [(sys.argv[1], sys.argv[2])]
similar_movies = pd.DataFrame()
for title,rating in user:
    similar_movies = similar_movies.append(get_similar(title, rating))
    similar_movies = similar_movies.drop(columns = title, axis=1) 
print(similar_movies.sum().sort_values(ascending=False).head(10).to_json())


