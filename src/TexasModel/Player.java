/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TexasModel;

import CardDeckHand.Deck;
import CardDeckHand.Hand;
import CardDeckHand.SixCardHandException;

/**
 *
 * @author huangjiayu
 */
public class Player {

    private String name;
    private double money;
    private boolean isPlay;
    private double bet;
    private Hand hand;

    public Player() {
        this.name = "Player";
        this.money = 100;
        this.isPlay = false;
        this.bet = 0;
        this.hand = new Hand();
    }

    public Player(String name, double money, boolean isPlay, Hand hand) {
        this.name = name;
        this.money = money;
        this.isPlay = isPlay;
        this.bet = 0;
        this.hand = hand;

    }

    public double getBet() {
        return bet;
    }

    public Hand getHand() {
        return this.hand;
    }

    public void setHand(Hand h) {
        this.hand = h;
    }

    public void setHand(Deck deck) throws SixCardHandException {
        this.hand = new Hand();
        this.hand.addCard(deck.drawRandomCard());
        this.hand.addCard(deck.drawRandomCard());
    }

    public String getName() {
        return this.name;
    }

    public double getMoney() {
        return this.money;
    }

    public boolean isIsPlay() {
        return this.isPlay;
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

    public void call(double amount) throws NoMoneyException {
        if (this.money < amount) {
            throw new NoMoneyException("You don't have enough money to call!");
        }
        this.bet += amount;
        this.money -= amount;
    }

    public void raise(double amount) {

    }

    public void allIn() {
        this.bet += this.money;
        this.money = 0;
    }
}
