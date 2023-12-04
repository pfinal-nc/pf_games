package pkg

import (
	"context"
	"database/sql"
	"time"
)

/**
 * @Author: PFinal南丞
 * @Author: lampxiezi@163.com
 * @Date: 2023/12/4
 * @Desc:
 * @Project: wails_game
 */

type Pwd struct {
	ctx context.Context
}

type PassWord struct {
	Pid      int    `gorm:"-" json:"pid"`
	Mark     string `json:"mark"`
	UserName string `json:"username"`
	PassWord string `json:"password"`
	Created  string `json:"created"`
}

func (p *Pwd) startup(ctx context.Context) {
	// Perform your setup here
	p.ctx = ctx
}

func Create(pwd PassWord) bool {
	db := &DataBase{}
	db.Start()
	defer db.Close()
	// 使用事务执行 SQL 语句
	tx, err := db.Db.Begin()
	db.checkErr(err)
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
	stmt, err := db.Db.Prepare("INSERT INTO user_password(mark,username, password, created) VALUES (?, ?, ?, ?)")
	db.checkErr(err)
	defer func(stmt *sql.Stmt) {
		err := stmt.Close()
		db.checkErr(err)
	}(stmt)
	_, err = stmt.Exec(pwd.Mark, pwd.UserName, pwd.PassWord, pwd.Created)
	if err != nil {
		return false
	}
	return true
}

func GetALLPwd() (passwords []PassWord) {
	db := &DataBase{}
	db.Start()
	defer db.Close()
	rows, err := db.Db.Query("SELECT * FROM main.user_password ORDER BY created DESC")
	db.checkErr(err)
	for rows.Next() {
		var pw PassWord
		_ = rows.Scan(&pw.Pid, &pw.Mark, &pw.UserName, &pw.PassWord, &pw.Created)
		parsedTime, _ := time.Parse(time.RFC3339, pw.Created)
		pw.Created = parsedTime.Format("2006-01-02 15:04:05")
		passwords = append(passwords, pw)
	}
	return passwords
}

func Update(newPass PassWord) bool {
	db := &DataBase{}
	db.Start()
	defer db.Close()
	stmt, err := db.Db.Prepare("UPDATE user_password SET password = ?,username = ?,mark = ? WHERE pid= ?")
	// 使用事务执行 SQL 语句
	tx, err := db.Db.Begin()
	db.checkErr(err)
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
	db.checkErr(err)
	defer func(stmt *sql.Stmt) {
		err := stmt.Close()
		db.checkErr(err)
	}(stmt)
	_, err = stmt.Exec(newPass.Mark, newPass.UserName, newPass.PassWord, newPass.Created)
	if err != nil {
		return false
	}
	return true
}

//func (p *Pwd) Delete(pid int) bool {
//
//}
