/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TexasModel;

import CardDeckHand.Card;
import CardDeckHand.Deck;
import CardDeckHand.Hand;
import CardDeckHand.SixCardHandException;
import java.util.ArrayList;

/**
 *
 * @author huangjiayu
 */
public class GameModel {

    private Deck theDeck;
    private Player player1;
    private Player player2;
    private double moneypool;
    private boolean isBlind;
    private ArrayList<Card> poolcards;

    public GameModel(double moneypool) {
        this.theDeck = new Deck();
        this.player1 = new Player();
        this.player2 = new Player();//This can also be an AI
        this.moneypool = moneypool;
        this.poolcards.add(this.theDeck.drawRandomCard());
        this.poolcards.add(this.theDeck.drawRandomCard());
        this.poolcards.add(this.theDeck.drawRandomCard());
    }

    public void giveCards() throws SixCardHandException {
        this.player1.setHand(theDeck);
        this.player2.setHand(theDeck);
    }

    public void resetpool() {
        this.theDeck.resetDeck();
        this.poolcards.clear();
        this.poolcards.add(this.theDeck.drawRandomCard());
        this.poolcards.add(this.theDeck.drawRandomCard());
        this.poolcards.add(this.theDeck.drawRandomCard());
    }

    public int isWin() throws SixCardHandException {
        Hand p1 = this.player1.getHand();
        for (Card c : poolcards) {
            p1.addCard(c);
        }
        Hand p2 = this.player2.getHand();
        for (Card c : poolcards) {
            p2.addCard(c);
        }
        if (p1.getHandRank() == p2.getHandRank()) {
            if (p1.highCard().getValue() == p2.highCard().getValue()) {
                return -1;
            } else {
                if (p1.highCard().getValue() > p2.highCard().getValue()) {
                    return 1;
                } else {
                    return 2;
                }
            }
        } else if (p1.getHandRank() > p2.getHandRank()) {
            return 1;
        } else {
            return 2;
        }

    }

    public Deck getTheDeck() {
        return theDeck;
    }

    public Player getPlayer1() {
        return player1;
    }

    public void setPlayer1(Player player1) {
        this.player1 = player1;
    }

    public void setPlayer2(Player player2) {
        this.player2 = player2;
    }

    public void setMoneypool(double moneypool) {
        this.moneypool = moneypool;
    }

    public Player getPlayer2() {
        return player2;
    }

    public double getMoneypool() {
        return moneypool;
    }

}
