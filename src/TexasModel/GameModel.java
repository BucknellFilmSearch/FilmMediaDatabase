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
import java.util.LinkedList;

/**
 *
 * @author huangjiayu
 */
public class GameModel {

    private Deck theDeck;
    private ArrayList<Player> players;
    private LinkedList<Player> playerinGame;
    private LinkedList<Player> playerthisRound;
    private double moneypool;
    private boolean isBlind;
    private ArrayList<Card> poolcards;
    public static double callAmount;
    private Player currentPlayer;

    public GameModel(double moneypool, int numplayer) {
        this.theDeck = new Deck();
        this.players = new ArrayList<Player>();
        this.moneypool = moneypool;
        this.poolcards = new ArrayList<Card>();
        this.poolcards.add(this.theDeck.drawRandomCard());
        this.poolcards.add(this.theDeck.drawRandomCard());
        this.poolcards.add(this.theDeck.drawRandomCard());
        this.callAmount = 0;
        for (int i = 0; i < numplayer; i++) {
            this.players.add(new Player());
        }
        this.playerinGame.addAll(players);
        this.playerthisRound.addAll(playerinGame);
        this.currentPlayer = this.playerthisRound.pop();
        currentPlayer.setIsPlay(true);
    }

    public void giveCards() throws SixCardHandException {
        for (Player p : this.playerinGame) {
            p.setHand(this.theDeck);
        }
    }

    public Player getCurrentPlayer() {

        return currentPlayer;
    }

    public void nextPlayer() throws SixCardHandException {
        if (this.playerthisRound.size() == 0) {
            nextTurn();
        } else {
            this.currentPlayer = this.playerthisRound.pop();
        }
    }

    public boolean isAllCheck() {
        for (Player p : playerinGame) {
            if (!p.isIsCheck()) {
                return false;
            }

        }
        return true;
    }

    public void nextTurn() throws SixCardHandException {
        if (isAllCheck()) {
            checkWin();
        }
        if (this.playerinGame.size() == 1) {
            checkWin();
        }
        this.playerthisRound.addAll(this.playerinGame);
        this.currentPlayer = this.playerthisRound.pop();
        if (this.isBlind == true) {
            this.isBlind = false;
        }
    }

    public void resetpool() {
        this.theDeck.resetDeck();
        this.poolcards.clear();
        this.poolcards.add(this.theDeck.drawRandomCard());
        this.poolcards.add(this.theDeck.drawRandomCard());
        this.poolcards.add(this.theDeck.drawRandomCard());
    }

    //To do a Static to deal with 5 cards issue
    public void checkWin() throws SixCardHandException {
        if (this.playerinGame.size() == 1) {
            this.playerinGame.getFirst().setMoney(moneypool + this.playerinGame.
                    getFirst().getMoney());
        } else {
            ArrayList<Hand> handlist = new ArrayList<>();
            for (Player p : playerinGame) {
                Hand h = p.getHand();
                h.addCard(this.poolcards.get(0));
                h.addCard(this.poolcards.get(1));
                h.addCard(this.poolcards.get(2));
                p.setHand(h);
            }
            playerinGame.sort(new Player());
            this.playerinGame.getFirst().setMoney(moneypool + this.playerinGame.
                    getFirst().getMoney());
        }

    }

    //To do two more method about the river stage and etc.
    public Deck getTheDeck() {
        return theDeck;
    }

    public void setMoneypool(double moneypool) {
        this.moneypool = moneypool;
    }

    public double getMoneypool() {
        return moneypool;
    }

    public void fold() throws SixCardHandException {
        this.playerinGame.remove(this.currentPlayer);
        nextPlayer();
    }

    public void allIn() throws NoMoneyException, SixCardHandException {
        if (this.getCurrentPlayer().getMoney() == 0) {
            throw new NoMoneyException("You don't have money at all");
        }
        double moneyallin = this.getCurrentPlayer().getMoney();
        this.getCurrentPlayer().setMoney(0);
        if (moneyallin > this.callAmount) {
            this.callAmount = moneyallin;
            this.getCurrentPlayer().setIsRaise(true);
        }
        this.moneypool += moneyallin;
        this.getCurrentPlayer().setIsAllin(true);
        this.getCurrentPlayer().setIsCall(true);
        nextPlayer();

    }

    //TODO ISRAISE EXCEPTION
    public void raise(double amount) throws NoMoneyException, SixCardHandException {
        if (this.getCurrentPlayer().getMoney() < amount) {
            throw new NoMoneyException("You don't have enough money to raise!");
        }
        this.callAmount += amount;
        this.getCurrentPlayer().setMoney(this.getCurrentPlayer().getMoney() - amount);
        this.getCurrentPlayer().setIsRaise(true);
        this.getCurrentPlayer().setIsCall(true);
        nextPlayer();
    }

    public void call() throws NoMoneyException, SixCardHandException {
        if (this.getCurrentPlayer().getMoney() < this.moneypool) {
            throw new NoMoneyException("You don't have enough money to call!");
        }
        this.getCurrentPlayer().setMoney(this.getCurrentPlayer().getMoney() - this.callAmount);
        this.getCurrentPlayer().setIsCall(true);
        nextPlayer();

    }

    public void check() throws SixCardHandException {
        if (this.getCurrentPlayer().isIsCall()) {
            this.currentPlayer.setIsCheck(true);
            nextPlayer();
        }
    }

}
