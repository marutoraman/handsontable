import pandas as pd
import eel
import json

### デスクトップアプリ作成課題
def kimetsu_search(word,json_name):
    # 検索対象取得
    df=pd.read_json("./{}".format(json_name))
    source=list(df["name"])
    tokutyou=list(df["tokutyou"])
    
    # 検索
    find_df=df[df["name"]==word]
    if len(find_df)>=1:
        print(f"『{word}』の特徴は{list(find_df['tokutyou'])[0]}です")
        eel.view_log_js(f"『{word}』の特徴は{list(find_df['tokutyou'])[0]}です")
    else:
        print("『{}』はありません".format(word))
        eel.view_log_js("『{}』は未登録です".format(word))
        eel.view_log_js("『{}』を追加します".format(word))
        
        # データの追加
        eel.addData(word)
