/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import java.net.URL;
import java.util.ResourceBundle;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.layout.AnchorPane;
import javafx.scene.text.Text;
import view.MultiPaneHolder;

/**
 * FXML Controller class
 *
 * @author Zhengri Fan
 */
public class MainPageController implements Initializable {

    @FXML
    private Text startText;

    @FXML
    private AnchorPane rootPane;

    private static MultiPaneHolder root;

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {

    }

    @FXML
    private void startGame() {
//        double opacity = 1.0;
//        double opaChange = 0.05;
//        long pauseSec = 100;
//        while (opacity > 0) {
//            root.getCurPane().setOpacity(opacity);
//            try {
//                Thread.sleep(pauseSec);
//            } catch (InterruptedException ex) {
//                Logger.getLogger(MainPageController.class.getName()).log(Level.SEVERE, null, ex);
//            }
//            opacity -= opaChange;
//        }
        root.setDisplayPane(MultiPaneHolder.GamePane.GameScreen);

    }

    public static void setRoot(MultiPaneHolder root) {
        MainPageController.root = root;
    }

}
