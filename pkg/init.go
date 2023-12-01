package pkg

import (
	"database/sql"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
	"sync"
)

type DataBase struct {
	Db *sql.DB
}

func (d *DataBase) Start() {
	if d.Db == nil {
		// TODO 这里需要配置一下数据库的目录
		db, err := sql.Open("sqlite3", "./foo.db")
		d.checkErr(err)
		d.Db = db
	}
}

func (d *DataBase) Close() {
	if d.Db != nil {
		err := d.Db.Close()
		if err != nil {
			fmt.Println("无法关闭数据库连接:", err)
		}
	}
}
func (d *DataBase) checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
func (d *DataBase) CheckTable(tableName string) bool {
	d.Start()
	defer d.Close()
	checkSql := "SELECT name FROM sqlite_master WHERE type='table' AND name = ?"
	rows, err := d.Db.Query(checkSql, tableName)
	d.checkErr(err)
	defer func(rows *sql.Rows) {
		err := rows.Close()
		d.checkErr(err)
	}(rows)
	defer func(Db *sql.DB) {
		err := Db.Close()
		d.checkErr(err)
	}(d.Db)
	// 如果有匹配的表名，则表存在
	return rows.Next()
}

func (d *DataBase) CreateTable(tableName, tableDefinition string) error {
	// 使用参数化的 SQL 语句
	createTableSQL := fmt.Sprintf("CREATE TABLE IF NOT EXISTS %s (%s)", tableName, tableDefinition)

	// 使用事务执行 SQL 语句
	tx, err := d.Db.Begin()
	if err != nil {
		return err
	}
	defer func() {
		// 在 defer 中提交或回滚事务
		if p := recover(); p != nil {
			_ = tx.Rollback()
		} else if err != nil {
			_ = tx.Rollback()
		} else {
			_ = tx.Commit()
		}
	}()

	_, err = tx.Exec(createTableSQL)
	if err != nil {
		return err
	}

	return nil
}

func (d *DataBase) CreateUserTable() error {
	d.Start()
	defer d.Close()
	// 定义表的列
	tableDefinition := "`uid` INTEGER PRIMARY KEY AUTOINCREMENT, `username` VARCHAR(64) NULL, `password` VARCHAR(128) NULL, `created` DATE NULL"
	// 调用通用的 CreateTable 函数
	return d.CreateTable("admin_user", tableDefinition)
}

func (d *DataBase) CreatePassTable() error {
	d.Start()
	defer d.Close()
	// 定义表的列
	tableDefinition := "`pid` INTEGER PRIMARY KEY AUTOINCREMENT, `mark` VARCHAR(256) NULL, `username` VARCHAR(64) NULL, `password` VARCHAR(256) NULL, `created` DATE NULL"
	// 调用通用的 CreateTable 函数
	return d.CreateTable("user_password", tableDefinition)
}

func InitDataBase() {
	// 检测数据库表是否存在
	db := &DataBase{}
	var wg sync.WaitGroup
	initTable := func(tableName string, createTableFunc func() error) {
		defer wg.Done()
		tableStatus := db.CheckTable(tableName)
		if !tableStatus {
			fmt.Printf("数据库表 %s 不存在，正在初始化数据库\n", tableName)
			if err := createTableFunc(); err != nil {
				fmt.Printf("初始化表 %s 出错：%v\n", tableName, err)
			}
		}
	}
	// 使用 WaitGroup 等待所有协程完成
	wg.Add(2)
	go initTable("admin_user", db.CreateUserTable)
	go initTable("user_password", db.CreatePassTable)
	// 等待所有协程完成
	wg.Wait()
}
func CheckInstall() bool {
	return false
}
func Init() {

}