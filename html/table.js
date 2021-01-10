document.addEventListener("DOMContentLoaded", function() {
    let tableData=["",""];
    let grid = document.getElementById('grid');
    let hot = new Handsontable(grid, {
        data: tableData,
        fillHandle: false,
        allowInsertRow: false,
        readOnly: false,
        allowInsertCol: false,
        colHeaders: ['選択','名前','特徴'],
        maxRows: 50,
        columnSorting: true,
        // カラムの定義
        columns: [
        {
            data: 'select',
            type: 'checkbox',
            className: "htCenter",
            width: 50,
            readOnly:false
        },
        {
            data: 'name',// jsonの項目名と一致させる
            allowEmpty: false,
            width: 120,
            validator: /^.+$/,
        },
        {
            data: 'tokutyou',
            allowEmpty: false,
            width: 300,
            validator: /^.+$/,
        }
        ]
    })
  
    // JSONファイ読み込み
    read_json.addEventListener('click', () => {
        setting_table(json_name.value)
    })

    // テーブル設定
    async function setting_table(json_file_path) {
        // jsonからデータを取得(同期処理)
        json_data = await eel.read_json_to_table(json_file_path)()
        tableData = JSON.parse(json_data)
        // tableにデータを反映
        hot.updateSettings({
            data: tableData // データを設定
      })
    }   

    // 保存ボタン押下時
    save_table.addEventListener('click',()=>{
        saveTableData(tableData)
        alert("保存しました")
    })
  
    // 削除ボタン押下時
    // ※複数チェックした場合は正常に動作しない(handsontableのバグか？)
    delete_data.addEventListener('click',()=>{
        for (let i = 0; i <= hot.countRows(); i++){
            if(hot.getDataAtCell(i, 0)){
                hot.alter('remove_row', i);
            }
        }
    })
  
    // 追加ボタン押下時 
    add_data.addEventListener('click',()=>{
      hot.alter('insert_row', hot.countRows());
    })

    // データの追加
    eel.expose(addData)
    function addData(name) {
        tableData.push({ "name": name, "tokutyou": "" })
        saveTableData(tableData)
    }

    // テーブルデータを保存する
    function saveTableData(data) {
        dataJson=JSON.stringify(data);
        eel.save_json_py(json_name.value,dataJson)
    }

    // 検索ボタンクリック時の処理
    search.addEventListener('click', () => {
        saveTableData(tableData)
        eel.kimetsu_search(serch_word.value,json_name.value)
    })

    // ログ表示
    eel.expose(view_log_js)
    function view_log_js(text){
        result.value += text + "\n"
    }
  });