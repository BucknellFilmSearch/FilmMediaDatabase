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

        root.setDisplayPane(MultiPaneHolder.GamePane.GameScreen);

    }

    public static void setRoot(MultiPaneHolder root) {
        MainPageController.root = root;
    }

}
