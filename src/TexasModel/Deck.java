/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TexasModel;

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
    private LinkedList<Card> deck = new LinkedList<>();
    // AL for fast indexing for creating deck
    private ArrayList<Suite> suitList = new ArrayList<>();
    private ArrayList<Integer> valueList = new ArrayList<>();

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
                try {
                    Card card = new Card(suit, value);
                    deck.add(card);
                } catch (BadCardCreationException ex) {
                    System.out.println(ex.getMessage());
                }
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
     * Removed a specific card from the deck.
     *
     * @param card
     * @return 1 if successful, -1 if specified card was already not in deck
     */
    public int removeCard(Card card) {
        for (int index = 0; index < deck.size(); index++) {
            if (deck.get(index).getValue() == card.getValue() && deck.get(index).getSuite() == card.getSuite()) {
                deck.remove(index);
                return 1;
            }
        }
        return -1;
    }

    /**
     * Resets deck to default state with all 52 cards.
     */
    public void resetDeck() {
        deck = new LinkedList<>();
        for (Suite suit : suitList) {
            for (int value : valueList) {
                try {
                    Card card = new Card(suit, value);
                    deck.add(card);
                } catch (BadCardCreationException ex) {
                    System.out.println(ex.getMessage());
                }
            }
        }
    }

    public LinkedList<Card> getDeck() {
        return deck;
    }

    public ArrayList<Suite> getSuitList() {
        return suitList;
    }

    public ArrayList<Integer> getValueList() {
        return valueList;
    }

}
