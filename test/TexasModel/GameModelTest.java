/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TexasModel;

import java.util.ArrayList;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

/**
 *
 * @author huangjiayu
 */
public class GameModelTest {

    public Player play1;
    public Player play2;
    public Player play3;
    public GameModel gametest;

    public GameModelTest() {
    }

    @Before
    public void setUp() {
        play1 = new Player("Jerry");
        play2 = new Player("Justin");
        play3 = new Player("Jaspr");
        ArrayList<Player> play = new ArrayList<>();
        play.add(play1);
        play.add(play2);
        play.add(play3);
        gametest = new GameModel(0, play);

    }

    @After
    public void tearDown() {
    }

    /**
     * Test of giveCards method, of class GameModel.
     */
    @Test
    public void testGiveCards() throws Exception {
        gametest.giveCards();
        int cardnum = 2;
        for (Player p : gametest.getPlayers()) {
            Assert.assertEquals(p.getHand().getHand().size(), cardnum);
        }
        Assert.assertEquals(gametest.getTheDeck().getDeck().size(), 43);
    }

    @Test
    public void testNextPlayer() throws Exception {
        Player instance = gametest.getCurrentPlayer();
        Assert.assertEquals(instance, play1);
        gametest.nextPlayer();
        instance = gametest.getCurrentPlayer();
        Assert.assertEquals(instance, play2);
        gametest.nextPlayer();
        instance = gametest.getCurrentPlayer();
        Assert.assertEquals(instance, play3);
        gametest.nextPlayer();
        instance = gametest.getCurrentPlayer();
        Assert.assertEquals(instance, play1);
    }

    /**
     * Test of isAllCheck method, of class GameModel.
     */
    @Test
    public void testisAllCall() throws NoMoneyException, SixCardHandException, CallMoreException {

        Player play1 = gametest.getPlayers().get(0);
        play1.setMoney(10000);
        Player play2 = gametest.getPlayers().get(1);
        play2.setMoney(10000);
        Player play3 = gametest.getPlayers().get(2);
        play3.setMoney(10000);
        play1.raise(100);
        play2.call();
        play3.call();
        //Current Player = play1
        gametest.getPlayerChoice();
        //Current Player = play2
        //Size of Player in the Round is 1
        Assert.assertEquals(gametest.isAllCall(), false);
        gametest.getPlayerChoice();
        //Size of Player in the Round is 0
        Assert.assertEquals(gametest.isAllCall(), false);
        gametest.getPlayerChoice();
        Assert.assertEquals(gametest.isIsFlop(), true);

    }

    /**
     * Test of addPlayer method, of class GameModel.
     */
    @Test
    public void testAddPlayer() throws SixCardHandException, NoMoneyException {
        gametest.addPlayer(new Player("Brian King"));
        Assert.assertEquals(gametest.getPlayers().size(), 4);
        gametest.nextPlayer();
        gametest.nextPlayer();
        gametest.nextPlayer();
        Player instance = gametest.getCurrentPlayer();
        Assert.assertEquals(instance.getName(), "Brian King");
    }

    /**
     * Test of nextTurn method, of class GameModel.
     */
    @Test
    public void testNextTurn() throws Exception {
        Player play1 = gametest.getPlayers().get(0);
        play1.setMoney(10000);
        Player play2 = gametest.getPlayers().get(1);
        play2.setMoney(10000);
        Player play3 = gametest.getPlayers().get(2);
        play3.setMoney(10000);
        play1.raise(100);
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        Assert.assertEquals(gametest.isIsFlop(), true);
        play1.raise(200);
        play2.raise(400);
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        Assert.assertEquals(gametest.isIsFlop(), true);
        play1.call();
        play2.check();
        play3.check();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        Assert.assertEquals(gametest.isIsTurnhand(), true);
        play1.call();
        play2.check();
        play3.check();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        Assert.assertEquals(gametest.isIsRiverhand(), true);

    }

    /**
     * Test of resetpool method, of class GameModel.
     */
    @Test
    public void testReset() throws NoMoneyException, SixCardHandException, CallMoreException {
        Player play1 = gametest.getPlayers().get(0);
        play1.setMoney(10000);
        Player play2 = gametest.getPlayers().get(1);
        play2.setMoney(10000);
        Player play3 = gametest.getPlayers().get(2);
        play3.setMoney(10000);
        play1.raise(100);
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        Assert.assertEquals(gametest.isIsFlop(), true);
        play1.raise(200);
        play2.raise(400);
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        Assert.assertEquals(gametest.isIsFlop(), true);
        gametest.reset();
        Assert.assertEquals(gametest.getMoneypool(), 0, 0);
        Assert.assertEquals(gametest.isIsBlind(), true);
        Assert.assertEquals(gametest.isIsFlop(), false);
        play1.setMoney(0);
        gametest.reset();
        Assert.assertEquals(gametest.getPlayers().size(), 2);
        Assert.assertEquals(play1.isIsCall(), false);
        Assert.assertEquals(play2.isIsCall(), false);
        Assert.assertEquals(play3.isIsCall(), false);
    }

    /**
     * Test of checkWin method, of class GameModel.
     */
    @Test
    public void testCheckWin() throws Exception {
        play1.raise(60);
        play2.call();
        play3.fold();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        play1.call();
        play2.fold();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        Assert.assertEquals(gametest.isIsEnd(), true);
        Assert.assertEquals(play1.getMoney(), 160, 0);
    }

    @Test
    public void testCheckHand() throws Exception {
        play1.raise(60);
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        play1.call();
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        play1.call();
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        ArrayList<Card> temptest = gametest.getPoolcards();
        temptest.removeAll(temptest);
        temptest.add(new Card(Suite.Clubs, "A"));
        temptest.add(new Card(Suite.Clubs, 2));
        temptest.add(new Card(Suite.Clubs, 3));
        temptest.add(new Card(Suite.Clubs, 4));
        temptest.add(new Card(Suite.Hearts, 6));
        play1.setHand(new Hand(new Card(Suite.Clubs, 5), new Card(Suite.Diamonds, 5)));
        play2.setHand(new Hand(new Card(Suite.Diamonds, 7), new Card(Suite.Diamonds, 8)));
        play3.setHand(new Hand(new Card(Suite.Hearts, 9), new Card(Suite.Hearts, 10)));
        play1.call();
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        Assert.assertEquals(gametest.isIsEnd(), true);
        Assert.assertEquals(play1.getMoney(), 220, 0);
    }

    /**
     * Test of checkTie method, of class GameModel.
     */
    @Test
    public void testCheckTie() throws NoMoneyException, SixCardHandException, CallMoreException, BadCardCreationException {
        play1.raise(60);
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        play1.call();
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        play1.call();
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        ArrayList<Card> temptest = gametest.getPoolcards();
        temptest.removeAll(temptest);
        temptest.add(new Card(Suite.Clubs, "A"));
        temptest.add(new Card(Suite.Clubs, 2));
        temptest.add(new Card(Suite.Clubs, 3));
        temptest.add(new Card(Suite.Clubs, 4));
        temptest.add(new Card(Suite.Clubs, 5));
        play1.setHand(new Hand(new Card(Suite.Clubs, 7), new Card(Suite.Diamonds, 8)));
        play2.setHand(new Hand(new Card(Suite.Diamonds, 7), new Card(Suite.Diamonds, 9)));
        play3.setHand(new Hand(new Card(Suite.Hearts, 9), new Card(Suite.Hearts, 10)));
        play1.call();
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        Assert.assertEquals(gametest.isIsEnd(), true);
        Assert.assertEquals(play1.getMoney(), 100, 0);

    }

    @Test
    public void testAllInraise() throws Exception {
        play1.allin();
        play2.setMoney(10000);
        play2.call();
        play3.setMoney(10000);
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        play1.raise(400); //This will be INVALID, Because play1 is already all-in!
        play2.raise(500);
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        play1.call();
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        ArrayList<Card> temptest = gametest.getPoolcards();
        temptest.removeAll(temptest);
        temptest.add(new Card(Suite.Clubs, "A"));
        temptest.add(new Card(Suite.Clubs, 2));
        temptest.add(new Card(Suite.Clubs, 3));
        temptest.add(new Card(Suite.Clubs, 4));
        temptest.add(new Card(Suite.Hearts, 6));
        play1.setHand(new Hand(new Card(Suite.Clubs, 5), new Card(Suite.Diamonds, 5)));
        play2.setHand(new Hand(new Card(Suite.Diamonds, 7), new Card(Suite.Diamonds, 8)));
        play3.setHand(new Hand(new Card(Suite.Hearts, 9), new Card(Suite.Hearts, 10)));
        play1.call();
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        Assert.assertEquals(gametest.isIsEnd(), true);
        Assert.assertEquals(play1.getMoney(), 1300, 0);
    }

    @Test
    public void testAllInCall() throws Exception {
        play1.raise(20);
        play2.setMoney(10000);
        play2.raise(1000);
        play3.setMoney(10000);
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        play1.allin(); //This will be INVALID, Because play1 is already all-in!
        play2.raise(1500);
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        play1.call();
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        play1.call();
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        ArrayList<Card> temptest = gametest.getPoolcards();
        temptest.removeAll(temptest);
        temptest.add(new Card(Suite.Clubs, "A"));
        temptest.add(new Card(Suite.Clubs, 2));
        temptest.add(new Card(Suite.Clubs, 3));
        temptest.add(new Card(Suite.Clubs, 4));
        temptest.add(new Card(Suite.Hearts, 6));
        play1.setHand(new Hand(new Card(Suite.Clubs, 5), new Card(Suite.Diamonds, 5)));
        play2.setHand(new Hand(new Card(Suite.Diamonds, 7), new Card(Suite.Diamonds, 8)));
        play3.setHand(new Hand(new Card(Suite.Hearts, 9), new Card(Suite.Hearts, 10)));
        play1.call();
        play2.call();
        play3.call();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        gametest.getPlayerChoice();
        Assert.assertEquals(gametest.isIsEnd(), true);
        Assert.assertEquals(play1.getMoney(), 5100, 0);
    }
}
