/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import TexasModel.AI;
import TexasModel.Card;
import TexasModel.Deck;
import TexasModel.GameModel;

/**
 *
 * @author justi_000
 */
public class AIController {

    private GameModel model;
    private AI ai;
    /* This value ranks the potential/value of the AI's hand. It is set by the methods of this class. */
    private int circumstantialRank;

    public AIController(GameModel model, AI ai) {
        this.model = model;
        this.ai = ai;
        this.circumstantialRank = ai.getHand().getHandRank();
    }

    public void performTurnAction() {
        if (model.isIsBlind()) {
            performBlindAction();
        } else if (model.isIsFlop()) {
            performFlopAction();
        } else if (model.isIsTurnhand()) {
            performTurnhandAction();
        } else if (model.isIsRiverhand()) {
            performRiverhandAction();
        } else {
            System.out.println("Error: told AI to make decision, but it is not Blind, Flop, Turn, or River hand.");
        }
    }

    public void performBlindAction() {
        if (model.isAllCall()) {
            if (ai.getMoney() >= model.getCallAmount()) {
                ai.call();
            } else {
                // In easier versions, perhaps just go all-in.
                ai.fold();
            }
        } else {
            // AI has already called this amount or higher
            if (ai.isIsCall()) {
                ai.check();
            } else {
                // For calls and raises, have to check if they have enough.
                if (ai.getMoney() >= model.getCallAmount()) {
                    ai.call();
                }
            }
        }
    }

    public void performFlopAction() {
        // initialize at rank of current hand, since this isn't included in tests
        int circumstantialRank = ai.getHand().getHandRank();
        boolean hasSpecialHand = false;
        // Create testDeck to simulate drawing additional common cards from.
        Deck testDeck = new Deck();
        // Check if AI already has a special hand, with two card hand + 3 common cards.
        if (ai.getHand().getHandRank() > 14) {
            hasSpecialHand = true;
        }
        /* Remove cards that are already in AI's hand from the test deck. We already
         know that the AI won't be drawing these cards. No need to include them
         in our tests.
         */
        for (Card card : ai.getHand().getHand()) {
            testDeck.removeCard(card);
        }
        /* Now, we know that two more cards will be turned over. Test all possible
         cases for what these could be using the test deck, replacing two cards
         at a time.
         */
        for (Card handCard1 : ai.getHand().getHand()) {
            for (Card deckCard1 : testDeck.getDeck()) {
                handCard1.setSuite(deckCard1.getSuite());
                handCard1.setValue(deckCard1.getValue());
            }
            for (Card handCard2 : ai.getHand().getHand()) {
                for (Card deckCard2 : testDeck.getDeck()) {
                    handCard2.setSuite(deckCard2.getSuite());
                    handCard2.setValue(deckCard2.getValue());
                    ai.getHand().defineHand();
                    circumstantialRank += ai.getHand().getHandRank();
                }
            }
        }
        if (circumstantialRank > 7000) {

        }
    }

    public void performTurnhandAction() {
        // initialize at rank of current hand, since this isn't included in tests
        int circumstantialRank = ai.getHand().getHandRank();
        boolean hasSpecialHand = false;
        // Create testDeck to simulate drawing additional common cards from.
        Deck testDeck = new Deck();
        // Check if AI already has a special hand, with two card hand + 3 common cards.
        if (ai.getHand().getHandRank() > 14) {
            hasSpecialHand = true;
        }
        /* Remove cards that are already in AI's hand from the test deck. We already
         know that the AI won't be drawing these cards. No need to include them
         in our tests.
         */
        for (Card card : ai.getHand().getHand()) {
            testDeck.removeCard(card);
        }
        /* Now, we know that one more card will be turned over. Test all possible
         cases for what these could be using the test deck, replacing one card
         at a time.
         */
        for (Card handCard1 : ai.getHand().getHand()) {
            for (Card deckCard1 : testDeck.getDeck()) {
                handCard1.setSuite(deckCard1.getSuite());
                handCard1.setValue(deckCard1.getValue());
                ai.getHand().defineHand();
                circumstantialRank += ai.getHand().getHandRank();
            }
        }
        if (circumstantialRank > 3500) {

        }
    }

    public void performRiverhandAction() {
        if (model.isAllCall()) {
            if (ai.getMoney() >= model.getCallAmount()) {
                ai.call();
            } else {
                // In easier versions, perhaps just go all-in.
                ai.fold();
            }
        } else {
            // AI has already called this amount or higher
            if (ai.isIsCall()) {
                ai.check();
            } else {
                // For calls and raises, have to check if they have enough.
                if (ai.getMoney() >= model.getCallAmount()) {
                    ai.call();
                }
            }
        }
    }

}
