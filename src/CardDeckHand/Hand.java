/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package CardDeckHand;

import java.util.ArrayList;

/**
 *
 * @author justi_000
 */
public class Hand {

    private ArrayList<Card> hand;

    public void addCard(Card card) throws SixCardHandException {
        if (hand.size() < 5) {
            hand.add(card);
        } else {
            throw new SixCardHandException("Tried to add more than 5 cards to a hand.");
        }
    }

    public String defineHand() {
        //TODO
        if (hand.size() == 5) {

        }
        return "feature not available yet";
    }

    public Card lowCard() {
        int minimum = 15;
        Card lowCard = null;
        for (Card card : hand) {
            if (card.getValue() < minimum) {
                minimum = card.getValue();
                lowCard = card;
            }
        }
        return lowCard;
    }

    public Card highCard() {
        int maximum = 0;
        Card highCard = null;
        for (Card card : hand) {
            if (card.getValue() > maximum) {
                maximum = card.getValue();
                highCard = card;
            }
        }
        return highCard;
    }

}
