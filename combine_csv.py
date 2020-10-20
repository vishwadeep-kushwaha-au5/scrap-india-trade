import pandas as pd
import json
import pymongo

cnames = ['Total Trade','Export','Import','Trade Balance']

for cname in cnames:
    dbClient = pymongo.MongoClient("mongodb+srv://outreach-admin:1212@outreach-gdicx.mongodb.net/<dbname>?retryWrites=true&w=majority")
    db = dbClient["india-commerce"]
    dbCollection = db[cname]
    i=1997

    df = pd.read_csv('data/countrywise/'+str(i)+'/Rupee.csv')[['Country',cname]]
    df=df.rename(columns={cname:str(i)})
    i+=1

    df2 = open('country_codes/country_code.json')
    df2 = json.load(df2)
    df2k = df2.keys()

    while i<2020:
        df = pd.merge(df,pd.read_csv('data/countrywise/'+str(i)+'/Rupee.csv')
                      [['Country',cname]],
                      on="Country")
        df=df.rename(columns={cname:str(i)})
        i+=1

    df['Country']=df['Country'].map(lambda x:x.replace(".","").lower())
    df=df.set_index('Country')
    df = df.fillna(0)
    df = eval(df.to_json(orient='index'))
    dfk = df.keys()

    for key in df2k:
        if key in dfk:
            df[key]['Code']=df2[key]['Code']
    print(df['u s a'])

    dbCollection.insert_many(df.values())

    #dbCollection.insert_many([eval(df.to_json(orient='index'))])



