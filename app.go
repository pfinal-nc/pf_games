package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
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
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
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

func (a *App) GameData() string {
	game := a.getGameConfig()
	data, _ := json.Marshal(game)
	return fmt.Sprintf("%s", string(data))
}

// GetGameConfig 获取游戏配置
func (a *App) getGameConfig() (games []GameConfigData) {
	// TODO 这里可以直接从网上读取 配置
	content, err := os.ReadFile("./conf/data.json")
	if err != nil {
		log.Fatal("Error when opening file: ", err)
	}
	//解析json 数据到切片中
	_ = json.Unmarshal(content, &games)
	return
}

func (a *App) CheckLogin() bool {
	user := pkg.NewUser()
	return user.CheckLogin()
}

func (a *App) CheckInstall() bool {
	return pkg.CheckInstall()
}
