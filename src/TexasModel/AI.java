/* *****************************************
 * CSCI205 - Software Engineering and Design
 * Spring 2015
 *
 * Name: Justin Eyster
 * Date:
 *
 * Project: csci205_FinalProject
 * Package: TexasModel.AI
 * File: AI
 * Description:
 *
 * ****************************************
 */package TexasModel;

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

    public boolean equals(AI ai) {
        if (ai.getName().equals(this.getName())) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void allin() {
        if (this.getMoney() >= 1) {
            super.allin();
        } else {
            this.setAction(Action.FOLD);
        }

    }

}
