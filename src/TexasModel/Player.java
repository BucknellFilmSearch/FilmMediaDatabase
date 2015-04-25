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

    /**
     * To see if the player is win
     *
     * @return
     */
    public boolean isIsWin() {
        return isWin;
    }

    /**
     * Set win status
     *
     * @param isWin
     */
    public void setIsWin(boolean isWin) {
        this.isWin = isWin;
    }

    /**
     * Return a String about player's action
     *
     * @return
     */
    public String getActionperformed() {
        return actionperformed;
    }

    /**
     * Set the String about player's action
     *
     * @param actionperformed
     */
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

    /**
     * Constructor for the Player w/ String name
     */
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

    /**
     * Get the Action
     *
     * @return enum action
     */
    public Action getAction() {
        return action;
    }

    /**
     * Set players'action
     *
     * @param action
     */
    public void setAction(Action action) {
        this.action = action;
    }

    /**
     * Get the raise amount of money by the player
     *
     * @return
     */
    public double getRaiseamount() {
        return raiseamount;
    }

    /**
     * Set the raise amount of money by the player
     *
     * @param raiseamount
     */
    public void setRaiseamount(double raiseamount) {
        this.raiseamount = raiseamount;
    }

    /**
     * Reset the raise amount
     */
    public void resetRaise() {
        this.raiseamount = 0;
    }

    /**
     * To find the player is called
     *
     * @return
     */
    public boolean isIsCall() {
        return isCall;
    }

    /**
     * Set the player's call info.
     *
     * @param isCall
     */
    public void setIsCall(boolean isCall) {
        this.isCall = isCall;
    }

    /**
     * Check if the player all-in!
     *
     * @return
     */
    public boolean isIsAllin() {
        return isAllin;
    }

    /**
     * Set the player's all int status
     *
     * @param isAllin
     */
    public void setIsAllin(boolean isAllin) {
        this.isAllin = isAllin;
    }

    /**
     * Return the hand
     *
     * @return
     */
    public Hand getHand() {
        return this.hand;
    }

    /**
     * Set the hand
     *
     * @param h
     */
    public void setHand(Hand h) {
        this.hand = h;
    }

    /**
     * Set hamd by a deck
     *
     * @param deck
     * @throws SixCardHandException
     */
    public void setHand(Deck deck) throws SixCardHandException {
        this.hand = new Hand();
        this.hand.addCard(deck.drawRandomCard());
        this.hand.addCard(deck.drawRandomCard());
    }

    /**
     * Return Name
     *
     * @return
     */
    public String getName() {
        return this.name;
    }

    /**
     * Return Player's money
     *
     * @return
     */
    public double getMoney() {
        return this.money;
    }

    /**
     * Set the name of player
     *
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Set the amount of money of a player
     *
     * @param money
     */
    public void setMoney(double money) {
        this.money = money;
    }

    /**
     * Add a set of money to the player
     *
     * @param add
     */
    public void addMoney(double add) {
        this.money += add;
    }

    /**
     * Important implementation to comparator interface
     *
     * @param o1
     * @param o2
     * @return
     */
    @Override
    public int compare(Object o1, Object o2) {
        Hand h1 = ((Player) o1).getHand();
        Hand h2 = ((Player) o2).getHand();
        return h1.compareTo(h2);
    }

    /**
     * Player chooses to call
     */
    public void call() {
        this.action = Action.CALL;
    }

    /**
     * Get how many money to call
     *
     * @return
     */
    public int getCallamount() {
        return callamount;
    }

    /**
     * Set the money to call
     *
     * @param callamount
     */
    public void setCallamount(int callamount) {
        this.callamount = callamount;
    }

    /**
     * PLayer chooses to raise
     *
     * @param amount
     */
    public void raise(double amount) {
        this.action = Action.RAISE;
        this.raiseamount = amount;
    }

    /**
     * Player chooses to allin
     */
    public void allin() {
        this.action = Action.ALL_IN;
    }

    /**
     * Player chooses to check
     */
    public void check() {
        this.action = Action.CHECK;
    }

    /**
     * Player chooses to fold
     */
    public void fold() {
        this.action = Action.FOLD;
    }

    /**
     * reset the status of a player
     */
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
