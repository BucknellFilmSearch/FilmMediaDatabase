/* *****************************************
 * CSCI205 - Software Engineering and Design
 * Spring 2015
 *
 * Name: Justin Eyster
 * Date:
 *
 * Project: csci205_FinalProject
 * Package: Controller.AIController
 * File: AIController
 * Description:
 *
 * ****************************************
 */package Controller;

import TexasModel.AI;
import TexasModel.Card;
import TexasModel.Deck;
import TexasModel.GameModel;
import static TexasModel.GameUtil.findTheBest;
import static TexasModel.GameUtil.findTheBestfromsix;
import TexasModel.Hand;
import TexasModel.SixCardHandException;
import java.util.ArrayList;

/**
 * The controller of the AI class, which reads information from the GameModel to
 * update the state of the AI. Uses inheritance so that controllers of multiple
 * difficulties can be made, but will still all have the same type, which is
 * AIController.
 *
 * This AI bets moderately by default, unless a different type is selected using
 * my AIType enum as a parameter.
 *
 * @author justi_000
 */
public class AIController {

    private GameModel model;
    private AI ai;
    /* This value ranks the potential/value of the AI's hand. It is set by the methods of this class. */
    private int circumstantialRank;
    private String mostRecentDecision;

    private AIType aiType;

    /* tracks consecutive raises in a phase so it doesn't get ridiculous,
     also serves to mask fact that AI may have a great hand.
     */
    private int consecutiveRaises = 0;
    private int MAX_CONSECUTIVE_RAISES = 2;

    // DECISION MAKING CONSTANTS:
    private int FLOP_GREAT_MINOR_HAND_THRESHHOLD = 18000;
    private int FLOP_DECENT_MINOR_HAND_THRESHHOLD = 16200;
    private int TURN_GREAT_MINOR_HAND_THRESHHOLD = 750;
    private int TURN_DECENT_MINOR_HAND_THRESHHOLD = 700;

    /**
     * Creates an AI that bets moderately, by default.
     *
     * @param model
     * @param ai
     */
    public AIController(GameModel model, AI ai) {
        this.model = model;
        this.ai = ai;
        this.circumstantialRank = ai.getHand().getHandRank();
        this.aiType = AIType.MODERATE;
    }

    /**
     * Allows the specification of an aiType, which affects its betting
     * behavior.
     *
     * @param model
     * @param ai
     * @param aitype
     */
    public AIController(GameModel model, AI ai, AIType aitype) {
        this.model = model;
        this.ai = ai;
        this.circumstantialRank = ai.getHand().getHandRank();
        this.aiType = aiType;
        if (aiType == AIType.LOOSE_HANDED) {
            this.FLOP_GREAT_MINOR_HAND_THRESHHOLD = 17800;
            this.FLOP_DECENT_MINOR_HAND_THRESHHOLD = 16000;
            this.TURN_GREAT_MINOR_HAND_THRESHHOLD = 734;
            this.TURN_DECENT_MINOR_HAND_THRESHHOLD = 688;
        } else if (aiType == AIType.TIGHT_HANDED) {
            this.FLOP_GREAT_MINOR_HAND_THRESHHOLD = 18200;
            this.FLOP_DECENT_MINOR_HAND_THRESHHOLD = 16400;
            this.TURN_GREAT_MINOR_HAND_THRESHHOLD = 766;
            this.TURN_DECENT_MINOR_HAND_THRESHHOLD = 716;
        }
    }

    /**
     * Forwards decision making process to appropriate method.
     *
     * @throws SixCardHandException
     */
    public void performTurnAction() throws SixCardHandException {
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

    /**
     * Performs AI blind action, pretty much just always calls.
     */
    protected void performBlindAction() {
        if (ai.getMoney() < model.getCallAmount()) {
            ai.fold();
        } else if (model.isAllCall()) {
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

    /**
     * Performs AI flop action by testing possible scenarios of two other cards
     * that could be turned over.
     *
     * @throws SixCardHandException
     */
    protected void performFlopAction() throws SixCardHandException {
        /* Create a tempprary hand so that we can manipulate a five card hand
         that includes the pool cards, even though the AI technically only holds two.
         */
        Hand tempAIHand = new Hand();
        // Create testDeck to simulate drawing additional common cards from.
        Deck testDeck = new Deck();
        /* Remove cards that are already in AI's hand from the test deck. We already
         know that the AI won't be drawing these cards. No need to include them
         in our tests.
         */

        /* Add pool cards to sevenCardList and the temp AI hand for simulations.
         Remove cards from testDeck.
         */
        ArrayList<Card> sevenCardList = new ArrayList<>();
        for (Card card : ai.getHand().getHand()) {
            testDeck.removeCard(card);
            sevenCardList.add(card);
            tempAIHand.addCard(card);
        }
        for (Card card : model.getPoolcards()) {
            testDeck.removeCard(card);
            sevenCardList.add(card);
            tempAIHand.addCard(card);
        }

        // reset circumstantial rank
        circumstantialRank = tempAIHand.getHandRank();

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

        if (ai.getMoney() < model.getCallAmount()) {
            ai.allin();
            mostRecentDecision = "allin";
            consecutiveRaises = 0;
        } else if (tempAIHand.getHandRank() == 23) {
            ai.allin();
            mostRecentDecision = "allin";
            consecutiveRaises = 0;
        } else if (tempAIHand.getHandRank() >= 20) {
            if (consecutiveRaises < MAX_CONSECUTIVE_RAISES) {
                ai.raise(Math.round((ai.getMoney() - model.getCallAmount()) / 2));
                mostRecentDecision = "raise";
                consecutiveRaises += 1;
            } else {
                ai.call();
            }
        } else if (tempAIHand.getHandRank() >= 18) {
            if (consecutiveRaises < MAX_CONSECUTIVE_RAISES) {
                ai.raise(Math.round((ai.getMoney() - model.getCallAmount()) / 3));
                mostRecentDecision = "raise";
                consecutiveRaises += 1;
            } else {
                ai.call();
            }
        } else if (circumstantialRank > FLOP_GREAT_MINOR_HAND_THRESHHOLD) {
            if (consecutiveRaises < MAX_CONSECUTIVE_RAISES) {
                ai.raise(Math.round((ai.getMoney() - model.getCallAmount()) / 8));
                mostRecentDecision = "raise";
                consecutiveRaises += 1;
            } else {
                ai.call();
            }
        } else if (circumstantialRank > FLOP_DECENT_MINOR_HAND_THRESHHOLD) {
            ai.call();
            mostRecentDecision = "call";
            consecutiveRaises = 0;
        } else {
            ai.fold();
            mostRecentDecision = "fold";
            consecutiveRaises = 0;
        }

    }

    /**
     * Performs AI turn hand action by testing the possible scenarios of the one
     * extra card that could be turned over.
     *
     * @throws SixCardHandException
     */
    protected void performTurnhandAction() throws SixCardHandException {
        /* Create a tempprary hand so that we can manipulate a five card hand
         that includes the pool cards, even though the AI technically only holds two.
         */
        Hand tempAIHand = new Hand();
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
        /* Find the best five card hand among AI hand and pool cards for use later.
         */
        tempAIHand = findTheBestfromsix(sevenCardList);
        // reset circumstantial rank
        circumstantialRank = tempAIHand.getHandRank();

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

        if (ai.getMoney() < model.getCallAmount()) {
            ai.allin();
            mostRecentDecision = "allin";
            consecutiveRaises = 0;
        } else if (tempAIHand.getHandRank() == 23) {
            ai.allin();
            mostRecentDecision = "allin";
            consecutiveRaises = 0;
        } else if (tempAIHand.getHandRank() >= 20) {
            if (consecutiveRaises < MAX_CONSECUTIVE_RAISES) {
                ai.raise(Math.round((ai.getMoney() - model.getCallAmount()) / 2));
                mostRecentDecision = "raise";
                consecutiveRaises += 1;
            } else {
                ai.call();
            }
        } else if (tempAIHand.getHandRank() >= 18) {
            if (consecutiveRaises < MAX_CONSECUTIVE_RAISES) {
                ai.raise(Math.round((ai.getMoney() - model.getCallAmount()) / 3));
                mostRecentDecision = "raise";
                consecutiveRaises += 1;
            } else {
                ai.call();
            }
        } else if (circumstantialRank > TURN_GREAT_MINOR_HAND_THRESHHOLD) {
            if (consecutiveRaises < MAX_CONSECUTIVE_RAISES) {
                ai.raise(Math.round((ai.getMoney() - model.getCallAmount()) / 8));
                mostRecentDecision = "raise";
                consecutiveRaises += 1;
            } else {
                ai.call();
            }
        } else if (circumstantialRank > TURN_DECENT_MINOR_HAND_THRESHHOLD) {
            ai.call();
            mostRecentDecision = "call";
            consecutiveRaises = 0;
        } else {
            ai.fold();
            mostRecentDecision = "fold";
            consecutiveRaises = 0;
        }
    }

    /**
     * Performs AI riverhand action by looking at AI's best hand and seeing how
     * strong it is.
     *
     * @throws SixCardHandException
     */
    protected void performRiverhandAction() throws SixCardHandException {
        /* Create a tempprary hand so that we can manipulate a five card hand
         that includes the pool cards, even though the AI technically only holds two.
         */
        Hand tempAIHand = new Hand();
        ArrayList<Card> sevenCardList = new ArrayList<>();
        for (Card card : ai.getHand().getHand()) {
            sevenCardList.add(card);
        }
        for (Card card : model.getPoolcards()) {
            sevenCardList.add(card);
        }
        // This is the best hand that the AI has in river hand round.
        tempAIHand = findTheBest(sevenCardList);

        if (ai.getMoney() < model.getCallAmount()) {
            ai.allin();
            mostRecentDecision = "allin";
            consecutiveRaises = 0;
        } else if (tempAIHand.getHandRank() == 23) {
            ai.allin();
            mostRecentDecision = "allin";
            consecutiveRaises = 0;
        } else if (tempAIHand.getHandRank() >= 20) {
            if (consecutiveRaises < MAX_CONSECUTIVE_RAISES) {
                ai.raise(Math.round((ai.getMoney() - model.getCallAmount()) / 2));
                mostRecentDecision = "raise";
                consecutiveRaises += 1;
            } else {
                ai.call();
            }
        } else if (tempAIHand.getHandRank() >= 18) {
            if (consecutiveRaises < MAX_CONSECUTIVE_RAISES) {
                ai.raise(Math.round((ai.getMoney() - model.getCallAmount()) / 3));
                mostRecentDecision = "raise";
                consecutiveRaises += 1;
            } else {
                ai.call();
            }
        } else if (tempAIHand.getHandRank() >= 14) {
            ai.call();
            mostRecentDecision = "call";
            consecutiveRaises = 0;
        } else {
            ai.fold();
            mostRecentDecision = "fold";
            consecutiveRaises = 0;
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
