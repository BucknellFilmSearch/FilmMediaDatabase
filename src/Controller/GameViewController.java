/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import java.net.URL;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Group;
import javafx.scene.control.Button;
import javafx.scene.control.Slider;
import javafx.scene.control.TextField;
import javafx.scene.effect.Bloom;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.HBox;
import javafx.scene.text.Text;

/**
 * FXML Controller class
 *
 * @author Zhengri Fan
 */
public class GameViewController implements Initializable {

    @FXML
    private HBox bscBox;

    @FXML
    private ImageView tableImage;

    @FXML
    private ImageView usrCard1;

    @FXML
    private ImageView usrCard2;

    @FXML
    private ImageView cmnCard1;

    @FXML
    private ImageView cmnCard2;

    @FXML
    private ImageView cmnCard3;

    @FXML
    private ImageView cmnCard4;

    @FXML
    private ImageView cmnCard5;

    @FXML
    private Button btnCall;

    @FXML
    private Button btnRaise;

    @FXML
    private Button btnFold;

    @FXML
    private Slider sliderRaise;

    @FXML
    private TextField textMoneyRaised;

    @FXML
    private Text textCurMoney;

    @FXML
    private Text textMoneyChange;

    @FXML
    private Button raiseCancel;

    @FXML
    private Button raiseOK;

    @FXML
    private Group raiseGroup;

    @FXML
    private void handleButtonAction(ActionEvent event) {
        if (event.getSource() == this.btnCall) {
            System.out.println("Called");
        } else if (event.getSource() == this.btnRaise) {
            System.out.println("Raised");
            this.raiseGroup.setOpacity(1.0);
            this.raiseGroup.setDisable(false);
        } else if (event.getSource() == this.btnFold) {
            System.out.println("Folded");
        } else if (event.getSource() == this.raiseCancel) {
            this.raiseGroup.setOpacity(0.0);
            this.raiseGroup.setDisable(true);
        } else if (event.getSource() == this.raiseOK) {
            this.raiseGroup.setOpacity(0.0);
            this.raiseGroup.setDisable(true);
        }

    }

    @FXML
    private void highLightCard(MouseEvent event) {
        Bloom bloom = new Bloom();
        bloom.setThreshold(0.5);
        ImageView card = (ImageView) event.getSource();
        card.setEffect(bloom);
    }

    @FXML
    private void clearCardEffect(MouseEvent event) {
        ImageView card = (ImageView) event.getSource();
        card.setEffect(null);
    }

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
    }

}
