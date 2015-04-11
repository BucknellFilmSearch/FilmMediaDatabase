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
 * Player Class for The Texas Holdem
 *
 * @author huangjiayu
 */
public class Player implements Comparator {

    private String name;
    private double money; //Money Amount
    private boolean isPlay; // If it is in he's round or not
    private boolean isRaise; //If the player raise
    private boolean isFold; //If the player Fold
    private boolean callable; //If the Player has money to call
    private boolean isAllin; //If the player chooses to ALL IN
    private boolean isCall; //If the player called (So that he don't HAVE to call)
    private boolean isCheck; //If the player chooses to check

    //*IMPORTANT not all of the boolean is useful right now. Just creat them incase.
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

    /**
     * Constructor for the Player
     */
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

    public Player(String name) {
        this.name = name;
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

    public void addMoney(double add) {
        this.money += add;
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
