/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import TexasModel.CallMoreException;
import TexasModel.GameModel;
import TexasModel.GameUtil;
import TexasModel.NoMoneyException;
import TexasModel.SixCardHandException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.net.URL;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Group;
import javafx.scene.control.Button;
import javafx.scene.control.Slider;
import javafx.scene.control.TextField;
import javafx.scene.effect.Bloom;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.HBox;
import javafx.scene.text.Text;

/**
 * FXML Controller class
 *
 * @author Zhengri Fan
 */
public class MainController implements Initializable {

    private GameModel themodel;
    // <editor-fold defaultstate="collapsed" desc="FXML">
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
    private Button btnStep;
    // </editor-fold>

    @FXML
    private void handleButtonAction(ActionEvent event) throws NoMoneyException, SixCardHandException, CallMoreException, FileNotFoundException {
        if (event.getSource() == this.btnCall) {
            closeRaiseChoices();
            //this.themodel.getPlayers().get(0).call();
            this.themodel.getCurrentPlayer().call();
            updateView();
        } else if (event.getSource() == this.btnRaise) {
            //System.out.println("Raised");
            this.raiseGroup.setOpacity(1.0);
            this.raiseGroup.setDisable(false);

        } else if (event.getSource() == this.btnFold) {
            //System.out.println("Folded");
            this.themodel.getCurrentPlayer().fold();

            closeRaiseChoices();
            updateView();
        } else if (event.getSource() == this.raiseCancel) {
            closeRaiseChoices();

        } else if (event.getSource() == this.raiseOK) {
            this.themodel.getCurrentPlayer().raise(Double.parseDouble(this.textMoneyRaised.getText()));
            closeRaiseChoices();
            updateView();
        }
    }

    @SuppressWarnings("empty-statement")
    private void updateView() throws NoMoneyException, SixCardHandException, CallMoreException, FileNotFoundException {
        if (this.themodel.isIsEnd()) {
            this.getBscBox().setDisable(true);
        }
//        if (this.themodel.getCurrentPlayer() != this.themodel.getCurrentPlayer()) {
//            this.btnCall.setDisable(true);
//            this.btnFold.setDisable(true);
//            this.btnRaise.setDisable(true);
//        } else {
//            this.btnCall.setDisable(false);
//            this.btnFold.setDisable(false);
//            this.btnRaise.setDisable(false);
//        }
        this.themodel.getPlayerChoice();
        this.textCurMoney.setText(Double.toString(this.themodel.getCurrentPlayer().getMoney()));
        if (this.themodel.isIsFlop()) {
            File f = new File(GameUtil.cardpic(this.themodel.getPoolcards().get(0)));
            this.cmnCard1.setImage(new Image(new FileInputStream(f)));
            //this.cmnCard2.setImage(new Image(GameUtil.cardpic(this.themodel.getPoolcards().get(1))));

        }

    }

    private void closeRaiseChoices() {
        this.raiseGroup.setOpacity(0.0);
        this.raiseGroup.setDisable(true);
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
        try {
            this.themodel = new GameModel(1000);
        } catch (SixCardHandException ex) {
            Logger.getLogger(MainController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public HBox getBscBox() {
        return bscBox;
    }

    public ImageView getTableImage() {
        return tableImage;
    }

    public ImageView getUsrCard1() {
        return usrCard1;
    }

    public ImageView getUsrCard2() {
        return usrCard2;
    }

    public ImageView getCmnCard1() {
        return cmnCard1;
    }

    public ImageView getCmnCard2() {
        return cmnCard2;
    }

    public ImageView getCmnCard3() {
        return cmnCard3;
    }

    public ImageView getCmnCard4() {
        return cmnCard4;
    }

    public ImageView getCmnCard5() {
        return cmnCard5;
    }

    public Button getBtnCall() {
        return btnCall;
    }

    public Button getBtnRaise() {
        return btnRaise;
    }

    public Button getBtnFold() {
        return btnFold;
    }

    public Slider getSliderRaise() {
        return sliderRaise;
    }

    public TextField getTextMoneyRaised() {
        return textMoneyRaised;
    }

    public Text getTextCurMoney() {
        return textCurMoney;
    }

    public Text getTextMoneyChange() {
        return textMoneyChange;
    }

    public Button getRaiseCancel() {
        return raiseCancel;
    }

    public Button getRaiseOK() {
        return raiseOK;
    }

    public Group getRaiseGroup() {
        return raiseGroup;
    }

}
