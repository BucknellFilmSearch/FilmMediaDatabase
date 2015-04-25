/* *****************************************
 * CSCI205 - Software Engineering and Design
 * Spring 2015
 *
 * Name: Jiayu Huang
 * Date: April 7, 2015
 * Time: 5:30:00 PM
 *
 * Project: csci205
 * Package: CS205Final.TexasModel
 * File: Player
 * Description:
 * The Player class for this game
 * ****************************************
 */
package TexasModel;

import java.util.Comparator;

enum Action {

    CALL, CHECK, RAISE, ALL_IN, BLANK, FOLD;
}

/**
 * Player Class for The Texas Holdem
 *
 * @author huangjiayu
 */
public class Player implements Comparator {

    private String name;
    private double money; //Money Amount
    private boolean isAllin; //If the player chooses to ALL IN
    private boolean isCall; //If the player called (So that he don't HAVE to call)
    private boolean isWin;
    private Action action;
    private double raiseamount;
    private int callamount;
    private String actionperformed;

    //*IMPORTANT not all of the boolean is useful right now. Just creat them incase.
    public boolean isIsWin() {
        return isWin;
    }

    public void setIsWin(boolean isWin) {
        this.isWin = isWin;
    }

    public String getActionperformed() {
        return actionperformed;
    }

    public void setActionperformed(String actionperformed) {
        this.actionperformed = actionperformed;
    }

    private Hand hand;

    /**
     * Constructor for the Player
     */
    public Player() {
        this.name = "Player";
        this.money = 100;
        this.hand = new Hand();
        this.isAllin = false;
        this.isCall = true;
        this.action = Action.BLANK;
        this.raiseamount = 0;
        this.callamount = 0;
        this.actionperformed = "";
    }

    public Player(String name) {
        this.name = name;
        this.money = 100;
        this.hand = new Hand();
        this.isAllin = false;
        this.isCall = true;
        this.action = Action.BLANK;
        this.raiseamount = 0;
        this.callamount = 0;
        this.actionperformed = "";
    }

    public Action getAction() {
        return action;
    }

    public void setAction(Action action) {
        this.action = action;
    }

    public double getRaiseamount() {
        return raiseamount;
    }

    public void setRaiseamount(double raiseamount) {
        this.raiseamount = raiseamount;
    }

    public void resetRaise() {
        this.raiseamount = 0;
    }

    public boolean isIsCall() {
        return isCall;
    }

    public void setIsCall(boolean isCall) {
        this.isCall = isCall;
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

    public void setName(String name) {
        this.name = name;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    public void addMoney(double add) {
        this.money += add;
    }

    @Override
    public int compare(Object o1, Object o2) {
        Hand h1 = ((Player) o1).getHand();
        Hand h2 = ((Player) o2).getHand();
        return h1.compareTo(h2);
    }

    public void call() {
        this.action = Action.CALL;
    }

    public int getCallamount() {
        return callamount;
    }

    public void setCallamount(int callamount) {
        this.callamount = callamount;
    }

    public void raise(double amount) {
        this.action = Action.RAISE;
        this.raiseamount = amount;
    }

    public void allin() {
        this.action = Action.ALL_IN;
    }

    public void check() {
        this.action = Action.CHECK;
    }

    public void fold() {
        this.action = Action.FOLD;
    }

    public void reset() {
        double money = this.getMoney();
        String name = this.getName();
        this.hand = new Hand();
        this.isAllin = false;
        this.isCall = false;
        this.action = Action.BLANK;
        this.raiseamount = 0;
        this.callamount = 0;
    }

}
