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

    public boolean equals(AI ai) {
        if (ai.getName().equals(this.getName())) {
            return true;
        } else {
            return false;
        }
    }

}
