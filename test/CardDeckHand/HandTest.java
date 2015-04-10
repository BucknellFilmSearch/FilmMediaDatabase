/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CardDeckHand;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 *
 * @author justi_000
 */
public class HandTest {

    public Hand hand;
    public Deck deck;

    public HandTest() {
    }

    @Before
    public void setUp() {
        deck = new CardDeckHand.Deck();
        hand = new CardDeckHand.Hand();
    }

    @After
    public void tearDown() {
    }

    /**
     * Test of addCard method, of class Hand.
     */
    @Test
    public void testAddCard() throws Exception {
        System.out.println("addCard");
        Card card1 = new Card(Suite.Clubs, "A");
        Card card2 = new Card(Suite.Diamonds, 2);
        hand.addCard(card1);
        hand.addCard(card2);
        assert hand.getHand().contains(card1);
        assert hand.getHand().contains(card1);
    }

    /**
     * Test of defineHand method, of class Hand.
     */
    @Test
    public void testDefineHand() {
        System.out.println("defineHand");
        Hand instance = new Hand();
        instance.defineHand();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of lowCard method, of class Hand.
     */
    @Test
    public void testLowCard() {
        System.out.println("lowCard");
        Hand instance = new Hand();
        Card expResult = null;
        Card result = instance.lowCard();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of highCard method, of class Hand.
     */
    @Test
    public void testHighCard() {
        System.out.println("highCard");
        Hand instance = new Hand();
        Card expResult = null;
        Card result = instance.highCard();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of isRoyalFlush method, of class Hand.
     */
    @Test
    public void testIsRoyalFlush() {
        System.out.println("isRoyalFlush");
        Hand instance = new Hand();
        boolean expResult = false;
        boolean result = instance.isRoyalFlush();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of isStraightFlush method, of class Hand.
     */
    @Test
    public void testIsStraightFlush() {
        System.out.println("isStraightFlush");
        Hand instance = new Hand();
        boolean expResult = false;
        boolean result = instance.isStraightFlush();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of isFourOfAKind method, of class Hand.
     */
    @Test
    public void testIsFourOfAKind() {
        System.out.println("isFourOfAKind");
        Hand instance = new Hand();
        boolean expResult = false;
        boolean result = instance.isFourOfAKind();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of isFullHouse method, of class Hand.
     */
    @Test
    public void testIsFullHouse() {
        System.out.println("isFullHouse");
        Hand instance = new Hand();
        boolean expResult = false;
        boolean result = instance.isFullHouse();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of isFlush method, of class Hand.
     */
    @Test
    public void testIsFlush() {
        System.out.println("isFlush");
        Hand instance = new Hand();
        boolean expResult = false;
        boolean result = instance.isFlush();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of isStraight method, of class Hand.
     */
    @Test
    public void testIsStraight() {
        System.out.println("isStraight");
        Hand instance = new Hand();
        boolean expResult = false;
        boolean result = instance.isStraight();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of isThreeOfAKind method, of class Hand.
     */
    @Test
    public void testIsThreeOfAKind() {
        System.out.println("isThreeOfAKind");
        Hand instance = new Hand();
        boolean expResult = false;
        boolean result = instance.isThreeOfAKind();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of isTwoPair method, of class Hand.
     */
    @Test
    public void testIsTwoPair() {
        System.out.println("isTwoPair");
        Hand instance = new Hand();
        boolean expResult = false;
        boolean result = instance.isTwoPair();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of isPair method, of class Hand.
     */
    @Test
    public void testIsPair() {
        System.out.println("isPair");
        Hand instance = new Hand();
        boolean expResult = false;
        boolean result = instance.isPair();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of compareTo method, of class Hand.
     */
    @Test
    public void testCompareTo() {
        System.out.println("compareTo");
        Hand other = null;
        Hand instance = new Hand();
        int expResult = 0;
        int result = instance.compareTo(other);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

}
