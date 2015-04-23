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
import TexasModel.Suite;

/**
 *
 * @author justi_000
 */
public class AIControllerDummy {

    private GameModel model;
    private AI ai;
    /* This value ranks the potential/value of the AI's hand. It is set by the methods of this class. */
    private int circumstantialRank;
    private String mostRecentDecision;

    public AIControllerDummy(GameModel model, AI ai) {
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
        // This ensures hand will redefine itself after any tests done in other methods.
        if (ai.getHand().getHand().size() == 5) {
            ai.getHand().defineHand();
        }
    }

    private void performBlindAction() {
        if (model.isAllCall()) {
            if (ai.getMoney() >= model.getCallAmount()) {
                ai.call();
                mostRecentDecision = "call";
            } else {
                ai.allin();
                mostRecentDecision = "allin";
            }
        } else {
            // AI has already called this amount or higher
            if (ai.isIsCall()) {
                ai.check();
                mostRecentDecision = "check";
            } else {
                // For calls and raises, have to check if they have enough.
                if (ai.getMoney() >= model.getCallAmount()) {
                    ai.call();
                    mostRecentDecision = "call";
                }
            }
        }
    }

    private void performFlopAction() {
        // initialize at rank of current hand, since this isn't included in tests
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
                int origValue1 = handCard1.getValue();
                Suite origSuite1 = handCard1.getSuite();
                handCard1.setSuite(deckCard1.getSuite());
                handCard1.setValue(deckCard1.getValue());
                ai.getHand().defineHand();
                circumstantialRank += ai.getHand().getHandRank();
                for (Card handCard2 : ai.getHand().getHand()) {
                    for (Card deckCard2 : testDeck.getDeck()) {
                        int origValue2 = handCard2.getValue();
                        Suite origSuite2 = handCard2.getSuite();
                        handCard2.setSuite(deckCard2.getSuite());
                        handCard2.setValue(deckCard2.getValue());
                        ai.getHand().defineHand();
                        circumstantialRank += ai.getHand().getHandRank();
                        handCard2.setSuite(origSuite2);
                        handCard2.setValue(origValue2);
                    }
                }
                handCard1.setSuite(origSuite1);
                handCard1.setValue(origValue1);
            }
        }
        if (ai.getMoney() < model.getCallAmount()) {
            ai.allin();
            mostRecentDecision = "allin";
        } else if (ai.getHand().getHandRank() == 23) {
            ai.allin();
            mostRecentDecision = "allin";
        } else if (ai.getHand().getHandRank() >= 20) {
            ai.raise((ai.getMoney() - model.getCallAmount()) / 2);
            mostRecentDecision = "raise";
        } else if (ai.getHand().getHandRank() >= 18) {
            ai.raise((ai.getMoney() - model.getCallAmount()) / 3);
            mostRecentDecision = "raise";
        } else if (circumstantialRank > 800000) {
            ai.raise((ai.getMoney() - model.getCallAmount()) / 8);
            mostRecentDecision = "raise";
        } else if (circumstantialRank < 800000 && circumstantialRank > 780000 && model.isAllCall()) {
            ai.call();
            mostRecentDecision = "call";
        } else if (circumstantialRank < 800000 && circumstantialRank > 780000 && ai.isIsCall()) {
            ai.check();
            mostRecentDecision = "check";
        } else {
            ai.fold();
            mostRecentDecision = "fold";
        }
    }

    private void performTurnhandAction() {
        // initialize at rank of current hand, since this isn't included in tests
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
         cases for what these could be using the test deck, replacing two cards
         at a time.
         */
        for (Card handCard1 : ai.getHand().getHand()) {
            for (Card deckCard1 : testDeck.getDeck()) {
                int origValue1 = handCard1.getValue();
                Suite origSuite1 = handCard1.getSuite();
                handCard1.setSuite(deckCard1.getSuite());
                handCard1.setValue(deckCard1.getValue());
                ai.getHand().defineHand();
                circumstantialRank += ai.getHand().getHandRank();
                handCard1.setSuite(origSuite1);
                handCard1.setValue(origValue1);
            }
        }
        if (ai.getHand().getHandRank() == 23) {
            ai.allin();
        } else if (ai.getHand().getHandRank() >= 20) {
            ai.raise(ai.getMoney() / 2);
        } else if (ai.getHand().getHandRank() >= 18) {
            ai.raise(ai.getMoney() / 3);
        } else if (circumstantialRank > 800000) {
            ai.raise(ai.getMoney() / 8);
            mostRecentDecision = "raise";
        } else if (circumstantialRank < 800000 && circumstantialRank > 780000 && model.isAllCall()) {
            ai.call();
            mostRecentDecision = "call";
        } else if (circumstantialRank < 800000 && circumstantialRank > 780000 && ai.isIsCall()) {
            ai.check();
            mostRecentDecision = "check";
        } else {
            ai.fold();
            mostRecentDecision = "fold";
        }
    }

    private void performRiverhandAction() {
        if (ai.getHand().getHandRank() == 23) {
            ai.allin();
        } else if (ai.getHand().getHandRank() >= 20) {
            ai.raise(ai.getMoney() / 2);
        } else if (ai.getHand().getHandRank() >= 18) {
            ai.raise(ai.getMoney() / 3);
        } else if (circumstantialRank > 800000) {
            ai.raise(ai.getMoney() / 8);
            mostRecentDecision = "raise";
        } else if (ai.getHand().getHandRank() >= 15 && model.isAllCall()) {
            ai.call();
            mostRecentDecision = "call";
        } else if (ai.getHand().getHandRank() >= 15 && ai.isIsCall()) {
            ai.check();
            mostRecentDecision = "check";
        } else {
            ai.fold();
            mostRecentDecision = "fold";
        }
    }

    /**
     * Determines if the AI controlled by this controller is a particular AI
     * instance.
     *
     * @param aiInstance
     * @return boolean - true or false. True, if the AI passed to the function
     * is the ai controlled by this controller. False otherwise.
     */
    public boolean hasThisAI(AI aiInstance) {
        if (ai.equals(aiInstance)) {
            return true;
        } else {
            return false;
        }
    }

    public AI getAi() {
        return ai;
    }

    public void setAi(AI ai) {
        this.ai = ai;
    }

    public int getCircumstantialRank() {
        return circumstantialRank;
    }

    public String getMostRecentDecision() {
        return mostRecentDecision;
    }

}
