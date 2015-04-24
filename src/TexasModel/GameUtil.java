/* *****************************************
 * CSCI205 - Software Engineering and Design
 * Spring 2015
 *
 * Name: Jiayu Huang
 * Date: April 7, 2015
 * Time: 5:30:00 PM
 *
 * Project: csci205
 * Package: CS205Final.TexasModel
 * File: GameUtil
 * Description:
 *
 * ****************************************
 */
package TexasModel;

import java.io.File;
import java.util.ArrayList;

/**
 * A utility to do some work for the game model
 *
 * @author huangjiayu
 */
public class GameUtil {

    /**
     * Get Picture address for the card
     *
     * @return File
     */
    public static File cardpic(Card a) {
        String parentDir = "./res/View/cards/";
        parentDir += a.getValue();
        if (a.getSuite() == Suite.Clubs) {
            parentDir += "c";
        } else if (a.getSuite() == Suite.Diamonds) {
            parentDir += "d";
        } else if (a.getSuite() == Suite.Hearts) {
            parentDir += "h";
        } else if (a.getSuite() == Suite.Spades) {
            parentDir += "s";
        }
        parentDir += ".png";
        return new File(parentDir);
    }

    /**
     * The Back side of the card picture
     *
     * @return
     */
    public static File cardPicBack() {
        return new File("./res/View/cards/playing-card-back.png");
    }

    /**
     * Find the best combination of 5 from 6 cards
     *
     * @param cardlist
     * @return Hand
     * @throws SixCardHandException
     */
    public static Hand findTheBestfromsix(ArrayList<Card> cardlist) throws SixCardHandException {
        Hand temphand = new Hand();
        //0,1,2,3,4
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
        //0,1,3,4,5
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

        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(5));
        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(3));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(5));
        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        handtoCompare = new Hand();
        handtoCompare.addCard(cardlist.get(0));
        handtoCompare.addCard(cardlist.get(1));
        handtoCompare.addCard(cardlist.get(2));
        handtoCompare.addCard(cardlist.get(4));
        handtoCompare.addCard(cardlist.get(5));
        if (temphand.compareTo(handtoCompare) >= 0) {
            temphand = handtoCompare;
        }

        return temphand;
    }

    //Without an effcient algorithm, I will hardcode 21 situation to find out the best
    //5 out of 7 21 possible hands in total
    /**
     * Find the best 5 card combination out of 7
     *
     * @param cardlist
     * @return Hand
     * @throws SixCardHandException
     */
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
