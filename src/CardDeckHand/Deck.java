/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CardDeckHand;

import CardDeckHand.Card.Suite;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Random;

/**
 * Software representation of a deck of cards.
 *
 * @author justi_000
 */
public class Deck {

    // LL for fast adding/removing of cards
    private LinkedList<Card> deck;
    // AL for fast indexing for creating deck
    private ArrayList<Suite> suitList;
    private ArrayList<Integer> valueList;

    /**
     * Initialized a software representation of a standard deck of 52 cards.
     */
    public Deck() {
        suitList.add(Suite.Clubs);
        suitList.add(Suite.Spades);
        suitList.add(Suite.Hearts);
        suitList.add(Suite.Diamonds);
        /* In our system, an ace has the
         value 14, a king is 13, a queen is 12, a jack is 11, the rest
         correspond to the value on the card. Card has a method to return
         the type as a String. */
        for (int i = 2; i < 15; i++) {
            valueList.add(i);
        }
        for (Suite suit : suitList) {
            for (int value : valueList) {
                Card card = new Card(suit, value);
                deck.add(card);
            }
        }
    }

    /**
     * Allows user to draw a random card from the deck; IMPORTANT: THIS MEANS
     * THAT THE DRAWN CARD IS REMOVED FROM THE DECK!
     *
     * @return The Card object drawn at random from deck.
     */
    public Card drawRandomCard() {
        Random selector = new Random();
        int cardIndex = selector.nextInt(deck.size());
        Card card = deck.remove(cardIndex);
        return card;
    }

    /**
     * Resets deck to default state with all 52 cards.
     */
    public void resetDeck() {
        deck = new LinkedList<>();
        for (Suite suit : suitList) {
            for (int value : valueList) {
                Card card = new Card(suit, value);
                deck.add(card);
            }
        }
    }

}
