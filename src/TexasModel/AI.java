/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TexasModel;

/**
 *
 * @author justi_000
 */
public class AI extends Player {

    /**
     * Can initialize AI without name field (usually not the best option).
     */
    public AI() {
        super();
        this.setName("AI");
    }

    /**
     * Initializes AI with a certain String name.
     *
     * @param name
     */
    public AI(String name) {
        super();
        this.setName(name);
    }

// WE DECIDED TO IMPLEMENT THE FOLLOWING IN THE CONTROLLER:
    // WAS RUNNING INTO PROBLEMS WITH OBJECTS NOT BEING INSTATIATED
//    /**
//     * This is all of the decision making logic for the AI; Where the AI decides
//     * whether to raise, call, or fold.
//     *
//     * @param commonCards - the ArrayList of cards that are common to all
//     * players.
//     */
//    public void performTurnAction(ArrayList<Card> commonCards) {
//        Hand twoCardHand = this.getHand();
//        if (GameModel.isIsBlind()) {
//            blindAction();
//            // TO-DO insert boolean variable for flop stage
//        } else if (GameModel.isIsBlind() == false && GameModel.isIsRiverhand() == false && GameModel.isIsTurnhand()) {
//            flopAction(commonCards);
//        } else if (GameModel.isIsTurnhand()) {
//            turnhandAction(commonCards);
//        } else if (GameModel.isIsRiverhand()) {
//            riverhandAction(commonCards);
//        }
//    }
//
//    public void blindAction() {
//
//    }
//
//    public void flopAction(ArrayList<Card> commonCards) {
//
//    }
//
//    public void turnhandAction(ArrayList<Card> commonCards) {
//
//    }
//
//    public void riverhandAction(ArrayList<Card> commonCards) {
//
//    }
    public boolean equals(AI ai) {
        if (ai.getName().equals(this.getName())) {
            return true;
        } else {
            return false;
        }
    }

}
