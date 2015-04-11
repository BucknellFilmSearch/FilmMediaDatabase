/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TexasModel;

import java.util.ArrayList;

/**
 *
 * @author justi_000
 */
public class Hand implements Comparable<Hand> {

    private ArrayList<Card> hand = new ArrayList<>();

    /* Our ranking system for hands works as follows:
     A high rank number indicates a better hand.
     No special hand: high card value (2-14)
     Pair: 15
     Two pair: 16
     Three of a kind: 17
     Straight: 18
     Flush: 19
     Full house: 20
     Four of a kind: 21
     Straight flush: 22
     Royal flush: 23
     */
    private int handRank = 0;
    private HandType handType = HandType.INCOMPLETE_HAND;

    /**
     * Can initialize a hand with no cards.
     */
    public Hand() {

    }

    /**
     * Can initialize a hand with two cards.
     *
     * @param card1
     * @param card2
     */
    public Hand(Card card1, Card card2) {
        this.hand.add(card1);
        this.hand.add(card2);
    }

    /**
     * Adds a card to the hand; Use with Deck.drawRandomCard() to simulate
     * drawing a random card from the deck and adding it to the hand. The syntax
     * for the operation described above would be:
     * hand.addCard(deck.drawRandomCard());
     *
     * @param card
     * @throws SixCardHandException
     */
    public void addCard(Card card) throws SixCardHandException {
        if (hand.size() < 5) {
            hand.add(card);
            /* Automatically defines the hand types once the fifth card has been
             added.
             */
            if (hand.size() == 5) {
                defineHand();
            }
        } else {
            throw new SixCardHandException("Tried to add more than 5 cards to a hand.");
        }
    }

    /**
     * Updates handType and handRank variables. Called automatically Once fifth
     * card has been added to the hand.
     *
     * Our ranking system for hands works as follows: A high rank number
     * indicates a better hand. No special hand: high card value (2-14), Pair:
     * 15, Two pair: 16, Three of a kind: 17, Straight: 18, Flush: 19, Full
     * house: 20, Four of a kind: 21, Straight flush: 22, Royal flush: 23,
     */
    public void defineHand() {
        if (hand.size() == 5) {
            if (isRoyalFlush()) {
                this.handRank = 23;
                this.handType = HandType.ROYAL_FLUSH;
            } else if (isStraightFlush()) {
                this.handRank = 22;
                this.handType = HandType.STRAIGHT_FLUSH;
            } else if (isFourOfAKind()) {
                this.handRank = 21;
                this.handType = HandType.FOUR_OF_A_KIND;
            } else if (isFullHouse()) {
                this.handRank = 20;
                this.handType = HandType.FULL_HOUSE;
            } else if (isFlush()) {
                this.handRank = 19;
                this.handType = HandType.FLUSH;
            } else if (isStraight()) {
                this.handRank = 18;
                this.handType = HandType.STRAIGHT;
            } else if (isThreeOfAKind()) {
                this.handRank = 17;
                this.handType = HandType.THREE_OF_A_KIND;
            } else if (isTwoPair()) {
                this.handRank = 16;
                this.handType = HandType.TWO_PAIR;
            } else if (isPair()) {
                this.handRank = 15;
                this.handType = HandType.PAIR;
            } else {
                this.handRank = highCard().getValue();
                this.handType = HandType.HIGH_CARD;
            }
        } else {
            System.out.println("Tried to define an incomplete hand.");
        }
    }

    /**
     * Returns the low card from the hand.
     *
     * @return Card object with lowest value in hand.
     */
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

    /**
     * Returns the high card of the hand.
     *
     * @return Card object of the highest value in hand.
     */
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

    /**
     * Determines whether current hand is a royal flush.
     *
     * @return boolean - true for royal flush, false otherwise
     */
    public boolean isRoyalFlush() {
        // if we have a flush and the high card is an ace...
        if (isFlush() && isStraight() && highCard().getValue() == 14) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Determines whether current hand is a straight flush.
     *
     * @return boolean - true for straight flush, false otherwise
     */
    public boolean isStraightFlush() {
        if (isFlush() && isStraight()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Determines whether current hand is a four of a kind.
     *
     * @return boolean - true for four of a kind, false otherwise
     */
    public boolean isFourOfAKind() {
        /* A four of a kind only has two different values in the hand.
         This method picks two values from the hand and counts how many there
         are. If the hand is a four of a kind, one of the counts should be 4.
         Otherwise, we know it's not.
         */
        int value1 = hand.get(0).getValue();
        int value1Count = 0;
        int value2 = 0;
        int value2Count = 0;
        // Count # cards of each of the two values we care about.
        for (Card card : hand) {
            if (card.getValue() == value1) {
                value1Count++;
            } else if (value2 == 0) {
                value2 = card.getValue();
                value2Count++;
            } else if (card.getValue() == value2) {
                value2Count++;
            } else {
                return false;
            }
        }
        // Check counts to verify if we have 4 for one of the counts. Else not a four of a kind.
        if (value1Count == 4 || value2Count == 4) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Determines whether current hand is a full house.
     *
     * @return boolean - true for four of a kind, false otherwise
     */
    public boolean isFullHouse() {
        /* A full house only has two different values in the hand.
         This method picks two values from the hand and counts how many there
         are. If the hand is a full house, one of the counts should be 2, and
         the other should be 3. Otherwise, we know it's not a full house.
         */
        int value1 = hand.get(0).getValue();
        int value1Count = 0;
        int value2 = 0;
        int value2Count = 0;
        // Count # cards of each of the two values we care about.
        for (Card card : hand) {
            if (card.getValue() == value1) {
                value1Count++;
            } else if (value2 == 0) {
                value2 = card.getValue();
                value2Count++;
            } else if (card.getValue() == value2) {
                value2Count++;
            } else {
                return false;
            }
        }
        // Check counts to verify if we have 4 for one of the counts. Else not a four of a kind.
        if ((value1Count == 2 && value2Count == 3)
            || (value1Count == 3 && value2Count == 2)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Determines whether current hand is a flush.
     *
     * @return boolean - true for flush, false otherwise
     */
    public boolean isFlush() {
        Suite cardSuit = hand.get(0).getSuite();
        for (Card card : hand) {
            if (!card.getSuite().equals(cardSuit)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Determines whether current hand is a straight.
     *
     * @return boolean - true for straight, false otherwise
     */
    public boolean isStraight() {
        int lowCardValue = lowCard().getValue();
        /* Increment through values required to have a straight. (low card value,
         low card value +1, low card value +2, etc.) */
        for (int value = lowCardValue; value < lowCardValue + hand.size(); value++) {
            boolean nextReqCardIsInHand = false;
            for (Card card : hand) {
                // Check if card of certain required value is in the deck.
                if (card.getValue() == value) {
                    nextReqCardIsInHand = true;
                }
            }
            if (nextReqCardIsInHand == false) {
                return false;
            }
        }
        return true;
    }

    /**
     * Determines whether current hand is a three of a kind.
     *
     * @return boolean - true for three of a kind, false otherwise
     */
    public boolean isThreeOfAKind() {
        /* A three of a kind only has three possible values in the deck. This
         method takes three values from the deck and counts how many of each.
         One of counts should be 3, to be three of a kind.
         */
        int value1 = hand.get(0).getValue();
        int value1Count = 0;
        int value2 = 0;
        int value2Count = 0;
        int value3 = 0;
        int value3Count = 0;
        // Count # cards of each of the two values we care about.
        for (Card card : hand) {
            if (card.getValue() == value1) {
                value1Count++;
            } else if (value2 == 0) {
                value2 = card.getValue();
                value2Count++;
            } else if (card.getValue() == value2) {
                value2Count++;
            } else if (value3 == 0) {
                value3 = card.getValue();
                value3Count++;
            } else if (card.getValue() == value3) {
                value3Count++;
            } else {
                return false;
            }
        }
        // Check counts to verify if we have 3 for one of the counts. Else not a three of a kind.
        if (value1Count == 3 || value2Count == 3 || value3Count == 3) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Determines whether current hand is a two pair.
     *
     * @return boolean - true for two pair, false otherwise
     */
    public boolean isTwoPair() {
        /* A two pair hand only has three possible values in the deck. This
         method takes three values from the deck and counts how many of each.
         Two of the counts should be 2, to be a two pair.
         */
        int value1 = hand.get(0).getValue();
        int value1Count = 0;
        int value2 = 0;
        int value2Count = 0;
        int value3 = 0;
        int value3Count = 0;
        // Count # cards of each of the two values we care about.
        for (Card card : hand) {
            if (card.getValue() == value1) {
                value1Count++;
            } else if (value2 == 0) {
                value2 = card.getValue();
                value2Count++;
            } else if (card.getValue() == value2) {
                value2Count++;
            } else if (value3 == 0) {
                value3 = card.getValue();
                value3Count++;
            } else if (card.getValue() == value3) {
                value3Count++;
            } else {
                return false;
            }
        }
        // Check counts to verify if we have 2 for two of the counts. Else not a two pair.
        if ((value1Count == 2 && value2Count == 2)
            || (value1Count == 2 && value3Count == 2)
            || (value2Count == 2 && value3Count == 2)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Determines whether current hand is a pair.
     *
     * @return boolean - true for pair false otherwise
     */
    public boolean isPair() {
        /* A pair hand only has four possible values in the deck. This
         method takes four values from the deck and counts how many of each.
         One of the counts should be 2, to be a two pair.
         */
        int value1 = hand.get(0).getValue();
        int value1Count = 0;
        int value2 = 0;
        int value2Count = 0;
        int value3 = 0;
        int value3Count = 0;
        int value4 = 0;
        int value4Count = 0;
        // Count # cards of each of the two values we care about.
        for (Card card : hand) {
            if (card.getValue() == value1) {
                value1Count++;
            } else if (value2 == 0) {
                value2 = card.getValue();
                value2Count++;
            } else if (card.getValue() == value2) {
                value2Count++;
            } else if (value3 == 0) {
                value3 = card.getValue();
                value3Count++;
            } else if (card.getValue() == value3) {
                value3Count++;
            } else if (value4 == 0) {
                value4 = card.getValue();
                value4Count++;
            } else if (card.getValue() == value4) {
                value4Count++;
            } else {
                return false;
            }
        }
        // Check counts to verify if we have 2 for two of the counts. Else not a two pair.
        if (value1Count == 2 || value2Count == 2 || value3Count == 2 || value4Count == 2) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Allows hands to be sorted, best to worst.
     *
     * @param other - another Hand object
     * @return an int, signifying before, after, or equal
     */
    @Override
    public int compareTo(Hand other) {
        final int BEFORE = -1;
        final int EQUAL = 0;
        final int AFTER = 1;

        if (this.handRank > other.handRank) {
            return BEFORE;
        } else if (this.handRank < other.handRank) {
            return AFTER;
            // if same hand rank, compare high card
        } else {
            if (this.highCard().getValue() > other.highCard().getValue()) {
                return BEFORE;
            } else if (this.highCard().getValue() < other.highCard().getValue()) {
                return AFTER;
            } else {
                return EQUAL;
            }
        }
    }

    public ArrayList<Card> getHand() {
        return hand;
    }

    public void setHand(ArrayList<Card> hand) {
        this.hand = hand;
    }

    public int getHandRank() {
        return handRank;
    }

    public HandType getHandType() {
        return handType;
    }

}
