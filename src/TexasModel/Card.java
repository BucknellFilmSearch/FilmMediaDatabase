/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TexasModel;

/**
 * Software representation of a playing card.
 *
 * @author justi_000
 */
public class Card {

    // the suite of the card
    private Suite suite;
    // the value of the card 2-14 (2-Ace)
    private int value;

    /**
     * Initializes the playing card with specified Suite enum type and int
     * value.
     *
     * The value card system is as follows: Cards 2-10 - their card number, Jack
     * - 11, Queen - 12, King - 13, Ace - 14.
     *
     * @param suite
     * @param value
     */
    public Card(Suite suite, int value) throws BadCardCreationException {
        this.suite = suite;
        this.value = value;
        if (this.value > 14 || this.value < 2) {
            throw new BadCardCreationException("Tried to create card with value outside correct range. Use 2-14.");

        }
    }

    /**
     * Initializes the playing card with the specified Suite enum type and
     * string value J, Q, K, or A
     *
     * @param suite
     * @param str
     */
    public Card(Suite suite, String str) throws BadCardCreationException {
        this.suite = suite;
        switch (str) {
            case "J":
                this.value = 11;
                break;
            case "Q":
                this.value = 12;
                break;
            case "K":
                this.value = 13;
                break;
            case "A":
                this.value = 14;
                break;
            default:
                throw new BadCardCreationException("Provided bad string to create card. Use J, Q, K, or A.");
        }
    }

    public Suite getSuite() {
        return suite;
    }

    public void setSuite(Suite suite) {
        this.suite = suite;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    /**
     * Basically a getter for value, but returns a string instead of an int, and
     * provides the jack, queen, king, and ace cards as a capital letter.
     *
     * @return The card value, as a string.
     */
    public String getStringValue() {
        if (this.value < 11) {
            return ("" + this.value);
        } else {
            if (this.value == 11) {
                return "J";
            } else if (this.value == 12) {
                return "Q";
            } else if (this.value == 13) {
                return "K";
            } else if (this.value == 15) {
                return "A";
            } else {
                return "error";
            }
        }
    }

}
