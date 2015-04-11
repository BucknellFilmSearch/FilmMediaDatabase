/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TexasModel;

import CardDeckHand.Deck;
import CardDeckHand.Hand;
import CardDeckHand.SixCardHandException;
import java.util.Comparator;

/**
 *
 * @author huangjiayu
 */
public class Player implements Comparator {

    private String name;
    private double money;
    private boolean isPlay;
    private boolean isRaise;
    private boolean isFold;
    private boolean callable;
    private boolean isAllin;
    private boolean isCall;
    private boolean isCheck;

    public boolean isIsRaise() {
        return isRaise;
    }

    public boolean isIsFold() {
        return isFold;
    }

    public void setIsFold(boolean isFold) {
        this.isFold = isFold;
    }

    public void setIsRaise(boolean isRaise) {
        this.isRaise = isRaise;
    }
    private Hand hand;

    public Player() {
        this.name = "Player";
        this.money = 100;
        this.isPlay = false;
        this.hand = new Hand();
        this.isRaise = false;
        this.isFold = false;
        this.callable = true;
        this.isAllin = false;
        this.isCall = false;
        this.isCheck = false;
    }

    public boolean isIsCall() {
        return isCall;
    }

    public void setIsCall(boolean isCall) {
        this.isCall = isCall;
    }

    public boolean isCallable() {
        if (this.money > GameModel.callAmount) {
            return true;
        } else {
            return false;
        }
    }

    public void setCallable(boolean callable) {
        this.callable = callable;
    }

    public Player(String name, double money, boolean isPlay, Hand hand) {
        this.name = name;
        this.money = money;
        this.isPlay = isPlay;
        this.hand = hand;
        this.isRaise = false;
        this.isFold = false;
        this.callable = true;
        this.isAllin = false;
        this.isCall = false;
        this.isCheck = false;

    }

    public boolean isIsCheck() {
        return isCheck;
    }

    public void setIsCheck(boolean isCheck) {
        this.isCheck = isCheck;
    }

    public boolean isIsAllin() {
        return isAllin;
    }

    public void setIsAllin(boolean isAllin) {
        this.isAllin = isAllin;
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

    @Override
    public int compare(Object o1, Object o2) {
        Hand h1 = ((Player) o1).getHand();
        Hand h2 = ((Player) o2).getHand();
        return h1.compareTo(h2);
    }
}
