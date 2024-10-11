#!/usr/bin/env node

// 引数を見て、どのメソッドを呼ぶか分岐する
noOption();

//引数なしの時に呼び出すメソッド
function noOption() {
    const currentDate = new Date()

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const monthName = currentDate.toLocaleDateString('default', { month: 'long'})
    const week = 'Su Mo Tu We Th Fr Sa'
    let nowMonthFirst = new Date(year, month, 1);
    const nowMonthLast = new Date(year, month + 1, 0);

    console.log('  ', monthName, year)
    console.log(week)

    // 次：月の始まりまでスペースを出力する
    while (nowMonthFirst <= nowMonthLast) {
        process.stdout.write(nowMonthFirst.getDate() + " ");
        // 1桁の場合スペース追加
        if (String(nowMonthFirst.getDate()).length === 1) {
            process.stdout.write(" ")
        }
        if (nowMonthFirst.getDay() === 6) {
            console.log("\n")
        }
        nowMonthFirst.setDate(nowMonthFirst.getDate()+ 1);
    }
}


//mのみ引数ありの時に呼び出すメソッド
function mOption() {
}


//m,yどちらも指定された際に呼び出すメソッド
function ryouhouOption() {
}
