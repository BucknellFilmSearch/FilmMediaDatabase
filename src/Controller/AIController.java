/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import TexasModel.AI;
import TexasModel.GameModel;
import TexasModel.SixCardHandException;

/**
 * This is the parent class for all of our AI controllers, so that all of our AI
 * controllers will have the same type and can be manipulated as such. Note: The
 * purpose of our AI controllers is to update the state of an AI using
 * information from the GameModel. This class never changes information in the
 * GameModel.
 *
 * @author justi_000
 */
public class AIController {

    protected GameModel model;
    protected AI ai;
    /* This value ranks the potential/value of the AI's hand. It is set by the methods of this class. */
    protected int circumstantialRank;
    protected String mostRecentDecision;

    /**
     * Uses info from the model to update the AI's state. Needs to be passed
     * both.
     *
     * @param model
     * @param ai
     */
    public AIController(GameModel model, AI ai) {
        this.model = model;
        this.ai = ai;
        this.circumstantialRank = ai.getHand().getHandRank();
    }

    /**
     * Forwards the decision making process to the proper function.
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
     * Default. Override in child classes.
     */
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

    /**
     * Default. Override in child classes.
     */
    protected void performFlopAction() throws SixCardHandException {
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

    /**
     * Default. Override in child classes.
     */
    protected void performTurnhandAction() throws SixCardHandException {
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

    /**
     * Default. Override in child classes.
     */
    protected void performRiverhandAction() {
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
