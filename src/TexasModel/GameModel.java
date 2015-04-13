/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TexasModel;

import java.util.ArrayList;
import java.util.LinkedList;

/**
 * A Main Model Class for Texas Holdem Game
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
    private boolean isTurnhand;
    private boolean isRiverhand;
    private ArrayList<Card> poolcards;
    public static double callAmount;
    private Player currentPlayer;

    /**
     * This is a constructor for GameModel
     *
     * @param moneypool
     * @param numplayer
     */
    public GameModel(double moneypool, int numplayer) {
        this.theDeck = new Deck();
        this.players = new ArrayList<Player>();
        this.moneypool = moneypool;
        this.poolcards = new ArrayList<Card>();
        this.isBlind = true; //If the Game is in Blind Stage(without three card
        //shown

        this.isTurnhand = false;//If the Game is in Turn Hand Stage
        this.isRiverhand = false; //If the Game is in RiverHand Stage
        this.poolcards.add(this.theDeck.drawRandomCard());
        this.poolcards.add(this.theDeck.drawRandomCard());
        this.poolcards.add(this.theDeck.drawRandomCard());
        this.callAmount = 50; //Initialize the Call Amount =50, So that it assures
        //the Game will have some money
        for (int i = 0; i < numplayer; i++) {
            this.players.add(new Player());
        }

        this.playerinGame.addAll(players);// The Player that is still in this game

        this.playerthisRound.addAll(playerinGame);//The Player left in this ROUND That is a player moves one by one system
        this.currentPlayer = this.playerthisRound.pop();
        currentPlayer.setIsPlay(true);
    }

    /**
     * This is a method to make every player in this Game has two cards
     *
     * @throws SixCardHandException
     */
    public void giveCards() throws SixCardHandException {
        for (Player p : this.playerinGame) {
            p.setHand(this.theDeck);
        }
    }

    public Player getCurrentPlayer() {

        return currentPlayer;
    }

    /**
     * This is the Listener in the Model to make sure the game moves on turn by
     * turn
     *
     * @throws NoMoneyException
     * @throws SixCardHandException
     */
    public void getPlayerChoice() throws NoMoneyException, SixCardHandException {
        if (this.currentPlayer.getAction() == Action.CALL) {
            this.call();
        }
        if (this.currentPlayer.getAction() == Action.ALL_IN) {
            this.allIn();
        }
        if (this.currentPlayer.getAction() == Action.RAISE) {
            this.raise(this.getCurrentPlayer().getRaiseamount());
        }
        if (this.currentPlayer.getAction() == Action.FOLD) {
            this.fold();
        }
        if (this.currentPlayer.getAction() == Action.CHECK) {
            this.check();
        }
    }

    /**
     * Next Player
     *
     * @throws SixCardHandException
     * @throws NoMoneyException
     */
    public void nextPlayer() throws SixCardHandException, NoMoneyException {
        if (this.playerthisRound.size() == 0) {
            nextTurn();
        } else {
            this.currentPlayer = this.playerthisRound.pop();
            this.getPlayerChoice();
        }
    }

    /**
     * If all of the players choose to check
     *
     * @return
     */
    public boolean isAllCheck() {
        for (Player p : playerinGame) {
            if (!p.isIsCheck() && p != this.currentPlayer) {
                return false;
            }

        }
        return true;
    }

    /**
     * Add a Player to this Game
     *
     * @param a
     */
    public void addPlayer(Player a) {
        this.players.add(a);
        this.playerinGame.add(a);
        this.playerthisRound.add(a);
    }

    /**
     * Next Turn, Means Next Round More precisely
     *
     * @throws SixCardHandException
     */
    public void nextTurn() throws SixCardHandException {
        if (this.isRiverhand) {
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
        if (this.isBlind == false && this.isTurnhand == false && this.isRiverhand == false) {
            this.isTurnhand = true;
            this.poolcards.add(this.theDeck.drawRandomCard());
        }
        if (this.isTurnhand == true) {
            this.isRiverhand = true;
            this.poolcards.add(this.theDeck.drawRandomCard());
        }
    }

    /**
     * A method to reset the pool
     */
    public void resetpool() {
        this.theDeck.resetDeck();
        this.poolcards.clear();
        this.poolcards.add(this.theDeck.drawRandomCard());
        this.poolcards.add(this.theDeck.drawRandomCard());
        this.poolcards.add(this.theDeck.drawRandomCard());
    }

    /**
     * Check who wins the game
     *
     * @throws SixCardHandException
     */
    public void checkWin() throws SixCardHandException {
        if (this.playerinGame.size() == 1) {
            this.playerinGame.getFirst().setMoney(moneypool + this.playerinGame.
                    getFirst().getMoney());
        } else {
            ArrayList<Hand> handlist = new ArrayList<>();
            for (Player p : playerinGame) {
                ArrayList<Card> h = p.getHand().getHand();
                h.add(this.poolcards.get(0));
                h.add(this.poolcards.get(1));
                h.add(this.poolcards.get(2));
                h.add(this.poolcards.get(3));
                h.add(this.poolcards.get(4));
                p.setHand(GameUtil.findTheBest(h));
            }
            playerinGame.sort(new Player());
            int tie = checkTie();
            for (int i = 0; i < tie; i++) {
                playerinGame.pop().addMoney(moneypool / tie);
            }
        }

    }

    public int checkTie() {
        LinkedList<Player> temp = playerinGame;
        int tienumber = 1;
        while (temp.size() > 0) {
            if (temp.getFirst().getHand().compareTo(temp.get(1).getHand()) != 0) {
                return tienumber;
            } else {
                temp.removeFirst();
                tienumber++;
            }
        }
        return tienumber;
    }

    //To do two more method about the river stage and etc. Done
    public Deck getTheDeck() {
        return theDeck;
    }

    public void setMoneypool(double moneypool) {
        this.moneypool = moneypool;
    }

    public double getMoneypool() {
        return moneypool;
    }

    public void fold() throws SixCardHandException, NoMoneyException {
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

    public boolean isIsBlind() {
        return isBlind;
    }

    public boolean isIsTurnhand() {
        return isTurnhand;
    }

    public boolean isIsRiverhand() {
        return isRiverhand;
    }

    public ArrayList<Card> getPoolcards() {
        return poolcards;
    }

    public static double getCallAmount() {
        return callAmount;
    }

    //TODO ISRAISE EXCEPTION
    public void raise(double amount) throws NoMoneyException, SixCardHandException {
        if (this.getCurrentPlayer().getMoney() < amount) {
            throw new NoMoneyException("You don't have enough money to raise!");
        }
        this.callAmount += amount;
        this.getCurrentPlayer().setMoney(this.getCurrentPlayer().getMoney() - amount);
        for (Player p : playerinGame) {
            p.setIsCall(false);
        }
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

    public void check() throws SixCardHandException, NoMoneyException {
        if (this.getCurrentPlayer().isIsCall()) {
            this.currentPlayer.setIsCheck(true);
            nextPlayer();
        }
    }

}
