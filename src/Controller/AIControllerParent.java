/* *****************************************
* CSCI205 - Software Engineering and Design
* Spring 2015
*
* Name: Justin Eyster
* Date: Can't convert the date to string, because it is not known which parts of the date variable are in use. Use ?date, ?time or ?datetime built-in, or ?string.<format> or ?string(format) built-in with this date.
* Time: Can't convert the date to string, because it is not known which parts of the date variable are in use. Use ?date, ?time or ?datetime built-in, or ?string.<format> or ?string(format) built-in with this date.
*
* Project: csci205_FinalProject
* Package: Controller.AIControllerParent
* File: AIControllerParent
* Description:
*
* ****************************************
*/package Controller;

import TexasModel.AI;
import TexasModel.GameModel;
import TexasModel.SixCardHandException;

/**
 *
 * @author justi_000
 */
public class AIControllerParent {

    protected GameModel model;
    protected AI ai;
    /* This value ranks the potential/value of the AI's hand. It is set by the methods of this class. */
    protected int circumstantialRank;
    protected String mostRecentDecision;

    public AIControllerParent(GameModel model, AI ai) {
        this.model = model;
        this.ai = ai;
        this.circumstantialRank = ai.getHand().getHandRank();
    }

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
