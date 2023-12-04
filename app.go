package main

import (
	"context"
	"encoding/json"
	"fmt"
	"time"
	"wails_game/pkg"
)

// App struct
type App struct {
	ctx context.Context
}

type GameConfigData struct {
	Title    string `json:"title"`
	Icon     string `json:"icon"`
	Describe string `json:"describe"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	pkg.Init()
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Create your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) CheckLogin() bool {
	return pkg.CheckLogin()
}

func (a *App) Login(username string, password string) bool {
	admin := pkg.Admin{
		UserName: username,
		PassWord: pkg.MD5(password),
		Created:  time.Now().Format("2006-01-02 15:04:05"),
	}
	return pkg.Login(admin)
}
func (a *App) LoginOut() bool {
	return pkg.LoginOut()
}

func (a *App) GetPassList() string {
	password := pkg.GetALLPass()
	fmt.Println(password)
	if len(password) <= 0 {
		return ""
	}
	marshal, _ := json.Marshal(password)
	return string(marshal)
}

func (a *App) SavePass(mark string, username string, psswd string) string {
	pwd := pkg.PassWord{
		Mark:     mark,
		UserName: username,
		PassWord: psswd,
		Created:  time.Now().Format("2006-01-02 15:04:05"),
	}
	if pkg.Create(pwd) {
		marshal, _ := json.Marshal(pwd)
		return string(marshal)
	}
	return ""
}
