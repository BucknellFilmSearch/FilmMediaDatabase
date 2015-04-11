/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package TexasModel;

import java.util.ArrayList;

/**
 *
 * @author huangjiayu
 */
public class GameUtil {

    //Without an effcient algorithm, I will hardcode 21 situation to find out the best
    //5 out of 7 21 possible hands in total
    public static Hand findTheBest(ArrayList<Card> cardlist) throws SixCardHandException {
        //0,1,2,3,4
        Hand temphand = new Hand();
        temphand.addCard(cardlist.get(0));
        temphand.addCard(cardlist.get(1));
        temphand.addCard(cardlist.get(2));
        temphand.addCard(cardlist.get(3));
        temphand.addCard(cardlist.get(4));
        //0,1,2,3,5
        Hand handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(5));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }
        //0,1,2,3,6
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(6));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //0,1,2,4,5
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(5));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //0,1,2,4,6
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(6));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //0,1,2,5,6
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(5));
        handtoCompare.addCard(cardlist.get(6));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //0,2,3,4,5
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(5));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //0,2,3,4,6
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(6));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //0,2,3,5,6
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(5));
        handtoCompare.addCard(cardlist.get(6));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //0,2,4,5,6
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(5));
        handtoCompare.addCard(cardlist.get(6));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //0,3,4,5,6
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(5));
        handtoCompare.addCard(cardlist.get(6));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //0,1,3,4,5
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(5));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //0,1,3,4,6
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(6));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //0,1,3,5,6
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(5));
        handtoCompare.addCard(cardlist.get(6));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //0,1,4,5,6
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(5));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //1,2,3,4,5
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(5));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //1,2,3,5,6
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(6));
        handtoCompare.addCard(cardlist.get(5));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //1,2,3,4,6
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(6));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //6,2,3,4,5
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(6));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(5));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //1,2,6,4,5
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(6));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(5));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        //1,6,3,4,5
        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(6));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(5));

        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }
        return temphand;

    }
}
