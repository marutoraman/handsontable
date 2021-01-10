import os
import eel
import desktop
import search
import pandas as pd

app_name="html"
end_point="index.html"
size=(700,600)


def write_text(filepath,data,mode,encoding="utf-8"):
    with open(f"{os.getcwd()}/{filepath}", mode=mode,encoding=encoding) as f:
        f.write(data + "\n")
    
def read_text(filepath,encoding="utf-8"):
    with open(f"{os.getcwd()}/{filepath}", mode="r",encoding=encoding) as f:
        return f.read()

@ eel.expose
def read_json_to_table(filepath):
  json_data=read_text(filepath)
  print("jsonを読み込みました")
  print(json_data)
  return json_data

@ eel.expose
def save_json_py(filepath,json_data):
  write_text(filepath,data=json_data,mode="w")
  print(f"{filepath}を保存しました")
  #eel.saveSettingJs()

@ eel.expose
def kimetsu_search(word,json_name):
    search.kimetsu_search(word,json_name)
    
desktop.start(app_name,end_point,size)
#desktop.start(size=size,appName=app_name,endPoint=end_point)