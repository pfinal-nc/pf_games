package main

import (
	"fmt"
	"path/filepath"
	"testing"
)

func TestCheckTable(t *testing.T) {
	relativePath := "database"
	// 获取相对路径的绝对路径
	absolutePath, _ := filepath.Abs(relativePath)
	fmt.Println("指定目录的路径:", absolutePath)
	//db := &pkg.DataBase{}
	//tableStatus := db.CheckTable("admin_user")
	//fmt.Println(tableStatus)
}

//
//func TestCreateTable(t *testing.T) {
//	db := &pkg.DataBase{}
//	_ = db.CreateUserTable()
//}
