/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CardDeckHand;

import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
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
        try {
            System.out.println("defineHand");
            // also testing my drawRandomCard method here
            hand.addCard(deck.drawRandomCard());
            hand.addCard(deck.drawRandomCard());
            hand.addCard(deck.drawRandomCard());
            hand.addCard(deck.drawRandomCard());
            hand.addCard(deck.drawRandomCard());
            // after fifth card is added, hand automatically defines itself
            assert (hand.getHandType() != HandType.INCOMPLETE_HAND);
            assert (hand.getHandRank() != 0);
        } catch (SixCardHandException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Test of lowCard method, of class Hand.
     */
    @Test
    public void testLowCard() {
        try {
            System.out.println("lowCard");
            Card card1 = new Card(Suite.Clubs, "A");
            Card card2 = new Card(Suite.Diamonds, 2);
            Card card3 = new Card(Suite.Spades, 5);
            hand.addCard(card1);
            hand.addCard(card2);
            hand.addCard(card3);
            assert (hand.lowCard().equals(card2));
        } catch (BadCardCreationException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SixCardHandException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Test of highCard method, of class Hand.
     */
    @Test
    public void testHighCard() {
        try {
            System.out.println("lowCard");
            Card card1 = new Card(Suite.Clubs, "A");
            Card card2 = new Card(Suite.Diamonds, 2);
            Card card3 = new Card(Suite.Spades, 5);
            hand.addCard(card1);
            hand.addCard(card2);
            hand.addCard(card3);
            assert (hand.highCard().equals(card1));
        } catch (BadCardCreationException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SixCardHandException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Test of isRoyalFlush method, of class Hand.
     */
    @Test
    public void testIsRoyalFlush() {
        try {
            Card card1 = new Card(Suite.Clubs, "A");
            Card card2 = new Card(Suite.Clubs, "K");
            Card card3 = new Card(Suite.Clubs, "Q");
            Card card4 = new Card(Suite.Clubs, "J");
            Card card5 = new Card(Suite.Clubs, 10);
            hand.addCard(card1);
            hand.addCard(card2);
            hand.addCard(card3);
            hand.addCard(card4);
            hand.addCard(card5);
            System.out.println(hand.getHandType().name());
            assert (hand.getHandType() == HandType.ROYAL_FLUSH);
        } catch (BadCardCreationException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SixCardHandException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Test of isStraightFlush method, of class Hand.
     */
    @Test
    public void testIsStraightFlush() {
        try {
            Card card1 = new Card(Suite.Clubs, "K");
            Card card2 = new Card(Suite.Clubs, "Q");
            Card card3 = new Card(Suite.Clubs, "J");
            Card card4 = new Card(Suite.Clubs, 10);
            Card card5 = new Card(Suite.Clubs, 9);
            hand.addCard(card1);
            hand.addCard(card2);
            hand.addCard(card3);
            hand.addCard(card4);
            hand.addCard(card5);
            System.out.println(hand.getHandType().name());
            assert (hand.getHandType() == HandType.STRAIGHT_FLUSH);
        } catch (BadCardCreationException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SixCardHandException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Test of isFourOfAKind method, of class Hand.
     */
    @Test
    public void testIsFourOfAKind() {
        try {
            Card card1 = new Card(Suite.Clubs, 9);
            Card card2 = new Card(Suite.Diamonds, 10);
            Card card3 = new Card(Suite.Hearts, 10);
            Card card4 = new Card(Suite.Spades, 10);
            Card card5 = new Card(Suite.Clubs, 10);
            hand.addCard(card1);
            hand.addCard(card2);
            hand.addCard(card3);
            hand.addCard(card4);
            hand.addCard(card5);
            System.out.println(hand.getHandType().name());
            assert (hand.getHandType() == HandType.FOUR_OF_A_KIND);
        } catch (BadCardCreationException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SixCardHandException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Test of isFullHouse method, of class Hand.
     */
    @Test
    public void testIsFullHouse() {
        try {
            Card card1 = new Card(Suite.Clubs, 9);
            Card card2 = new Card(Suite.Diamonds, 9);
            Card card3 = new Card(Suite.Hearts, 10);
            Card card4 = new Card(Suite.Spades, 10);
            Card card5 = new Card(Suite.Clubs, 10);
            hand.addCard(card1);
            hand.addCard(card2);
            hand.addCard(card3);
            hand.addCard(card4);
            hand.addCard(card5);
            System.out.println(hand.getHandType().name());
            assert (hand.getHandType() == HandType.FULL_HOUSE);
        } catch (BadCardCreationException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SixCardHandException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Test of isFlush method, of class Hand.
     */
    @Test
    public void testIsFlush() {
        try {
            Card card1 = new Card(Suite.Clubs, 3);
            Card card2 = new Card(Suite.Clubs, 9);
            Card card3 = new Card(Suite.Clubs, "J");
            Card card4 = new Card(Suite.Clubs, 10);
            Card card5 = new Card(Suite.Clubs, "A");
            hand.addCard(card1);
            hand.addCard(card2);
            hand.addCard(card3);
            hand.addCard(card4);
            hand.addCard(card5);
            System.out.println(hand.getHandType().name());
            assert (hand.getHandType() == HandType.FLUSH);
        } catch (BadCardCreationException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SixCardHandException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Test of isStraight method, of class Hand.
     */
    @Test
    public void testIsStraight() {
        try {
            Card card1 = new Card(Suite.Clubs, 3);
            Card card2 = new Card(Suite.Diamonds, 4);
            Card card3 = new Card(Suite.Clubs, 6);
            Card card4 = new Card(Suite.Spades, 5);
            Card card5 = new Card(Suite.Hearts, 2);
            hand.addCard(card1);
            hand.addCard(card2);
            hand.addCard(card3);
            hand.addCard(card4);
            hand.addCard(card5);
            System.out.println(hand.getHandType().name());
            assert (hand.getHandType() == HandType.STRAIGHT);
        } catch (BadCardCreationException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SixCardHandException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Test of isThreeOfAKind method, of class Hand.
     */
    @Test
    public void testIsThreeOfAKind() {
        try {
            Card card1 = new Card(Suite.Clubs, 3);
            Card card2 = new Card(Suite.Diamonds, 3);
            Card card3 = new Card(Suite.Clubs, 6);
            Card card4 = new Card(Suite.Spades, 3);
            Card card5 = new Card(Suite.Hearts, 2);
            hand.addCard(card1);
            hand.addCard(card2);
            hand.addCard(card3);
            hand.addCard(card4);
            hand.addCard(card5);
            System.out.println(hand.getHandType().name());
            assert (hand.getHandType() == HandType.THREE_OF_A_KIND);
        } catch (BadCardCreationException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SixCardHandException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Test of isTwoPair method, of class Hand.
     */
    @Test
    public void testIsTwoPair() {
        try {
            Card card1 = new Card(Suite.Clubs, 3);
            Card card2 = new Card(Suite.Diamonds, 4);
            Card card3 = new Card(Suite.Clubs, 4);
            Card card4 = new Card(Suite.Spades, 3);
            Card card5 = new Card(Suite.Hearts, 2);
            hand.addCard(card1);
            hand.addCard(card2);
            hand.addCard(card3);
            hand.addCard(card4);
            hand.addCard(card5);
            System.out.println(hand.getHandType().name());
            assert (hand.getHandType() == HandType.TWO_PAIR);
        } catch (BadCardCreationException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SixCardHandException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Test of isPair method, of class Hand.
     */
    @Test
    public void testIsPair() {
        try {
            Card card1 = new Card(Suite.Clubs, 3);
            Card card2 = new Card(Suite.Diamonds, 4);
            Card card3 = new Card(Suite.Clubs, 5);
            Card card4 = new Card(Suite.Spades, 3);
            Card card5 = new Card(Suite.Hearts, 2);
            hand.addCard(card1);
            hand.addCard(card2);
            hand.addCard(card3);
            hand.addCard(card4);
            hand.addCard(card5);
            System.out.println(hand.getHandType().name());
            assert (hand.getHandType() == HandType.PAIR);
        } catch (BadCardCreationException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SixCardHandException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Test of compareTo method, of class Hand.
     */
    @Test
    public void testCompareTo() {
        try {
            Card card1 = new Card(Suite.Clubs, 3);
            Card card2 = new Card(Suite.Diamonds, 4);
            Card card3 = new Card(Suite.Clubs, 4);
            Card card4 = new Card(Suite.Spades, 3);
            Card card5 = new Card(Suite.Hearts, 2);
            hand.addCard(card1);
            hand.addCard(card2);
            hand.addCard(card3);
            hand.addCard(card4);
            hand.addCard(card5);
            Hand hand1 = new Hand();
            Card card6 = new Card(Suite.Clubs, "A");
            Card card7 = new Card(Suite.Clubs, "K");
            Card card8 = new Card(Suite.Clubs, "Q");
            Card card9 = new Card(Suite.Clubs, "J");
            Card card10 = new Card(Suite.Clubs, 10);
            hand1.addCard(card6);
            hand1.addCard(card7);
            hand1.addCard(card8);
            hand1.addCard(card9);
            hand1.addCard(card10);
            ArrayList<Hand> handList = new ArrayList<>();
            handList.add(hand);
            handList.add(hand1);
            handList.sort(null);
            assert (handList.get(0).equals(hand1));
        } catch (BadCardCreationException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SixCardHandException ex) {
            Logger.getLogger(HandTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
