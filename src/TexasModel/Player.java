/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TexasModel;

/**
 *
 * @author huangjiayu
 */
public class Player {

    private String name;
    //private Hand
    private double money;
    private boolean isPlay;
    private double bet;

    public Player(String name, double money, boolean isPlay) {
        this.name = name;
        this.money = money;
        this.isPlay = isPlay;
        this.bet = bet;
    }

    public double getBet() {
        return bet;
    }

    public String getName() {
        return name;
    }

    public double getMoney() {
        return money;
    }

    public boolean isIsPlay() {
        return isPlay;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    public void setIsPlay(boolean isPlay) {
        this.isPlay = isPlay;
    }

    public void fold() {
        this.bet = 0;

    }

    public void call(double amount) {
        this.bet += amount;
        this.money -= amount;
    }

    public void allIn() {
        this.bet += this.money;
        this.money = 0;
    }
}
