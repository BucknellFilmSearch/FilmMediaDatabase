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
import static TexasModel.GameUtil.findTheBest;
import TexasModel.Hand;
import TexasModel.SixCardHandException;
import java.util.ArrayList;

/**
 *
 * @author justi_000
 */
public class AIController2 extends AIController {

    public AIController2(GameModel model, AI ai) {
        super(model, ai);
    }

    @Override
    protected void performBlindAction() {
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

    @Override
    protected void performFlopAction() throws SixCardHandException {
        // reset circumstantial rank
        circumstantialRank = ai.getHand().getHandRank();
        // Create testDeck to simulate drawing additional common cards from.
        Deck testDeck = new Deck();
        /* Remove cards that are already in AI's hand from the test deck. We already
         know that the AI won't be drawing these cards. No need to include them
         in our tests.
         */

        ArrayList<Card> sevenCardList = new ArrayList<>();
        for (Card card : ai.getHand().getHand()) {
            testDeck.removeCard(card);
            sevenCardList.add(card);
        }
        for (Card card : model.getPoolcards()) {
            testDeck.removeCard(card);
            sevenCardList.add(card);
        }

        /* Now, we know that two more cards will be turned over. Test all possible
         cases for what these could be using the test deck, getting the best hand
         with each addition and scoring the total.
         */
        int offset = 0;
        for (int index1 = 0; index1 < testDeck.getDeck().size(); index1++) {
            sevenCardList.add(testDeck.getDeck().get(index1));
            offset += 1;
            for (int index2 = offset; index2 < testDeck.getDeck().size(); index2++) {
                sevenCardList.add(testDeck.getDeck().get(index2));
                Hand bestHand = findTheBest(sevenCardList);
                circumstantialRank += bestHand.getHandRank();
                sevenCardList.remove(testDeck.getDeck().get(index2));
            }
            sevenCardList.remove(testDeck.getDeck().get(index1));
        }
        // DECISION MAKING CONSTANTS:
        int GREAT_MINOR_HAND_THRESHHOLD = 18000;
        int DECENT_MINOR_HAND_THRESHHOLD = 16000;

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
        } else if (circumstantialRank > GREAT_MINOR_HAND_THRESHHOLD) {
            ai.raise((ai.getMoney() - model.getCallAmount()) / 8);
            mostRecentDecision = "raise";
        } else if (circumstantialRank > DECENT_MINOR_HAND_THRESHHOLD && model.isAllCall()) {
            ai.call();
            mostRecentDecision = "call";
        } else if (circumstantialRank > DECENT_MINOR_HAND_THRESHHOLD && ai.isIsCall()) {
            ai.check();
            mostRecentDecision = "check";
        } else {
            ai.fold();
            mostRecentDecision = "fold";
        }

    }

    @Override
    protected void performTurnhandAction() throws SixCardHandException {
        // reset circumstantial rank
        circumstantialRank = ai.getHand().getHandRank();
        // Create testDeck to simulate drawing additional common cards from.
        Deck testDeck = new Deck();
        /* Remove cards that are already in AI's hand from the test deck. We already
         know that the AI won't be drawing these cards. No need to include them
         in our tests.
         */

        ArrayList<Card> sevenCardList = new ArrayList<>();
        for (Card card : ai.getHand().getHand()) {
            testDeck.removeCard(card);
            sevenCardList.add(card);
        }
        for (Card card : model.getPoolcards()) {
            testDeck.removeCard(card);
            sevenCardList.add(card);
        }

        /* Now, we know that two more cards will be turned over. Test all possible
         cases for what these could be using the test deck, getting the best hand
         with each addition and scoring the total.
         */
        for (Card deckCard1 : testDeck.getDeck()) {
            sevenCardList.add(deckCard1);
            Hand bestHand = findTheBest(sevenCardList);
            circumstantialRank += bestHand.getHandRank();
            sevenCardList.remove(deckCard1);
        }

        // DECISION MAKING CONSTANTS:
        int GREAT_MINOR_HAND_THRESHHOLD = 800;
        int DECENT_MINOR_HAND_THRESHHOLD = 750;

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
        } else if (circumstantialRank > GREAT_MINOR_HAND_THRESHHOLD) {
            ai.raise((ai.getMoney() - model.getCallAmount()) / 8);
            mostRecentDecision = "raise";
        } else if (circumstantialRank > DECENT_MINOR_HAND_THRESHHOLD && model.isAllCall()) {
            ai.call();
            mostRecentDecision = "call";
        } else if (circumstantialRank > DECENT_MINOR_HAND_THRESHHOLD && ai.isIsCall()) {
            ai.check();
            mostRecentDecision = "check";
        } else {
            ai.fold();
            mostRecentDecision = "fold";
        }
    }

    @Override
    protected void performRiverhandAction() {
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
        } else if (circumstantialRank > 14) {
            ai.raise((ai.getMoney() - model.getCallAmount()) / 8);
            mostRecentDecision = "raise";
        } else if (circumstantialRank < 14 && circumstantialRank > 8 && model.isAllCall()) {
            ai.call();
            mostRecentDecision = "call";
        } else if (circumstantialRank < 14 && circumstantialRank > 8 && ai.isIsCall()) {
            ai.check();
            mostRecentDecision = "check";
        } else {
            ai.fold();
            mostRecentDecision = "fold";
        }
    }

}
