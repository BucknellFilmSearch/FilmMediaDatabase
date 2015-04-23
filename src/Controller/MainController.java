/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import TexasModel.AI;
import TexasModel.CallMoreException;
import TexasModel.Card;
import TexasModel.GameModel;
import TexasModel.GameUtil;
import TexasModel.NoMoneyException;
import TexasModel.Player;
import TexasModel.SixCardHandException;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.net.URL;
import java.util.ArrayList;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.animation.FadeTransition;
import javafx.animation.Interpolator;
import javafx.animation.KeyFrame;
import javafx.animation.KeyValue;
import javafx.animation.Timeline;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Group;
import javafx.scene.SnapshotParameters;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.control.TextField;
import javafx.scene.control.ToolBar;
import javafx.scene.effect.DropShadow;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.image.WritableImage;
import javafx.scene.input.DragEvent;
import javafx.scene.input.Dragboard;
import javafx.scene.input.MouseEvent;
import javafx.scene.input.TransferMode;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.StackPane;
import javafx.scene.text.Text;
import javafx.util.Duration;
import view.MultiPaneHolder;

/**
 * FXML Controller class
 *
 * @author Zhengri Fan
 */
public class MainController implements Initializable, ChangeListener<Number> {

    private GameModel themodel;
    private AIController2 aiControl0;
    private AIController2 aiControl1;
    private AIController2 aiControl2;
    // <editor-fold defaultstate="collapsed" desc="FXML">
    @FXML
    private AnchorPane basePane;

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
    private HBox cardsAfterWinning;

    @FXML
    private Label textPlayer1;

    @FXML
    private Label textPlayer2;

    @FXML
    private Label textPlayer3;

    @FXML
    private Label textPlayer4;

    @FXML
    private ToolBar backBox;
    // </editor-fold>

    @FXML
    private void handleButtonAction(ActionEvent event) throws NoMoneyException, SixCardHandException, CallMoreException, FileNotFoundException, InterruptedException {
        if (event.getSource() == this.btnCall) {
            closeRaiseChoices();
            //this.themodel.getPlayers().get(0).call();
            this.themodel.getCurrentPlayer().call();
            step();
            updateView();
        } else if (event.getSource() == this.btnRaise) {
            FadeTransition ft = new FadeTransition(Duration.millis(500), this.raiseGroup);
            ft.setFromValue(0);
            ft.setToValue(Double.MAX_VALUE);
            ft.play();
            this.raiseGroup.setDisable(false);

        } else if (event.getSource() == this.btnFold) {
            //System.out.println("Folded");
            this.themodel.getCurrentPlayer().fold();
            closeRaiseChoices();
            step();
            updateView();
        } else if (event.getSource() == this.raiseCancel) {
            closeRaiseChoices();

        } else if (event.getSource() == this.raiseOK) {
            try {
                this.themodel.getCurrentPlayer().raise(Double.parseDouble(this.textMoneyRaised.getText()));
            } catch (NumberFormatException numberFormatException) {
                this.textMoneyRaised.setText(Double.toString(this.sliderRaise.getMin()));
            }
            closeRaiseChoices();
            step();
            updateView();
        }
    }

    private void step() throws NoMoneyException, SixCardHandException, CallMoreException, FileNotFoundException, InterruptedException {

        if (!this.themodel.isIsEnd()) {
            this.themodel.getPlayerChoice();
            if (getAIaction()) {
                step();
                updateView();
            }
        } else {
            updateView();
        }
    }

    private boolean getAIaction() throws SixCardHandException {
        if (this.themodel.getCurrentPlayer() == this.themodel.getPlayers().get(1)) {
            this.aiControl0.performTurnAction();
            return true;
        } else if (this.themodel.getCurrentPlayer() == this.themodel.getPlayers().get(2)) {
            this.aiControl1.performTurnAction();
            return true;
        } else if (this.themodel.getCurrentPlayer() == this.themodel.getPlayers().get(3)) {
            this.aiControl2.performTurnAction();
            return true;
        }
        return false;
    }

    @SuppressWarnings("empty-statement")
    private void updateView() throws NoMoneyException, SixCardHandException, CallMoreException, FileNotFoundException {

        this.textPlayer1.setText(this.themodel.getPlayers().get(0).getName());
        if (this.themodel.isIsEnd()) {
            this.getBscBox().setDisable(true);
        }
        this.textPlayer2.setText(this.themodel.getPlayers().get(1).getActionperformed());
        this.textPlayer3.setText(this.themodel.getPlayers().get(2).getActionperformed());
        this.textPlayer4.setText(this.themodel.getPlayers().get(3).getActionperformed());
        if (this.themodel.getCurrentPlayer() != this.themodel.getPlayers().get(0)) {
            this.btnCall.setDisable(true);
            this.btnFold.setDisable(true);
            this.btnRaise.setDisable(true);
        } else {
            this.btnCall.setDisable(false);
            this.btnFold.setDisable(false);
            this.btnRaise.setDisable(false);
        }
        this.usrCard1.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPlayers().get(0).getHand().getHand().get(0)))));
        this.usrCard2.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPlayers().get(0).getHand().getHand().get(1)))));

        this.textCurMoney.setText(Double.toString(this.themodel.getPlayers().get(0).getMoney()));
        if (this.themodel.isIsFlop()) {
            this.cmnCard1.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPoolcards().get(0)))));
            this.cmnCard2.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPoolcards().get(1)))));
            this.cmnCard3.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPoolcards().get(2)))));
            //this.cmnCard2.setImage(new Image(GameUtil.cardpic(this.themodel.getPoolcards().get(1))));

        } else if (this.themodel.isIsTurnhand()) {
            this.cmnCard4.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPoolcards().get(3)))));
        } else if (this.themodel.isIsRiverhand()) {
            this.cmnCard5.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPoolcards().get(4)))));
        }
        this.sliderRaise.setMax(this.themodel.getPlayers().get(0).getMoney());
        this.textMoneyRaised.setText(Integer.toString((int) this.sliderRaise.getValue()));
        this.sliderRaise.setMin(this.themodel.getCallAmount() + 1);

        if (this.themodel.isIsEnd()) {
            this.cardsAfterWinning.setVisible(true);
            if (themodel.getPlayers().get(0).isIsWin()) {
                this.textPlayer1.setText("Win");
            }
            if (themodel.getPlayers().get(1).isIsWin()) {
                this.textPlayer2.setText("Win");
            }
            if (themodel.getPlayers().get(2).isIsWin()) {
                this.textPlayer3.setText("Win");
            }
            if (themodel.getPlayers().get(3).isIsWin()) {
                this.textPlayer4.setText("Win");
            }
        }
    }

    private void closeRaiseChoices() {
        this.raiseGroup.setOpacity(0.0);
        this.raiseGroup.setDisable(true);
    }

    @FXML
    private void card1to2Det(MouseEvent event) throws FileNotFoundException {
        System.out.println("onDragDetected");

        Dragboard db = this.usrCard1.startDragAndDrop(TransferMode.ANY);

        db.setDragView(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getCurrentPlayer().getHand().getHand().get(0)))));

        event.consume();

    }

    @FXML
    private void card1to2Over(DragEvent event) {
        System.out.println("onDragOver");

        event.consume();
    }

    @FXML
    private void card1to2Drop(DragEvent event) {
        System.out.println("onDragDropped");

        event.consume();
    }

    @FXML
    private void card1to2Exit(DragEvent event) {
        System.out.println("onDragExited");

        event.consume();
    }

    @FXML
    private void card1to2Done(DragEvent event) {
        System.out.println("onDragDone");

        event.consume();
    }

    @FXML
    private void highLightCard(MouseEvent event) throws FileNotFoundException {
        DropShadow ds = new DropShadow();
        ImageView card = (ImageView) event.getSource();
        card.setEffect(ds);

        this.switchCard();
    }

    @FXML
    private void clearCardEffect(MouseEvent event) {
        ImageView card = (ImageView) event.getSource();
        card.setEffect(null);
    }

    @FXML
    private void updateSlider() {
        double usrMoneyRaise = 0;
        try {
            usrMoneyRaise = Double.parseDouble(this.textMoneyRaised.getText());
        } catch (NumberFormatException numberFormatException) {
            this.textMoneyRaised.setText(Double.toString(this.sliderRaise.getMin()));
        }
        this.sliderRaise.setValue(usrMoneyRaise);
    }

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        try {
            AI dummyAI0 = new AI("0");
            AI dummyAI1 = new AI("1");
            AI dummyAI2 = new AI("2");
            ArrayList<Player> playerList = new ArrayList<>();
            playerList.add(new Player("new Player"));
            playerList.add(dummyAI0);
            playerList.add(dummyAI1);
            playerList.add(dummyAI2);
            this.themodel = new GameModel(1000, playerList);
            this.themodel.giveCards();
            aiControl0 = new AIController2(themodel, dummyAI0);
            aiControl1 = new AIController2(themodel, dummyAI1);
            aiControl2 = new AIController2(themodel, dummyAI2);
            updateView();
        } catch (SixCardHandException ex) {
            Logger.getLogger(MainController.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NoMoneyException ex) {
            Logger.getLogger(MainController.class.getName()).log(Level.SEVERE, null, ex);
        } catch (CallMoreException ex) {
            Logger.getLogger(MainController.class.getName()).log(Level.SEVERE, null, ex);
        } catch (FileNotFoundException ex) {
            Logger.getLogger(MainController.class.getName()).log(Level.SEVERE, null, ex);
        }
        this.sliderRaise.valueProperty().addListener(this);
        this.sliderRaise.setMin(0);
        this.sliderRaise.setBlockIncrement(1);

    }

    public void switchCard() throws FileNotFoundException {

        this.usrCard1.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getCurrentPlayer().getHand().getHand().get(1)))));
        this.usrCard2.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getCurrentPlayer().getHand().getHand().get(0)))));

        Card oldcard1 = this.themodel.getCurrentPlayer().getHand().getHand().get(0);
        Card oldcard2 = this.themodel.getCurrentPlayer().getHand().getHand().get(1);

        this.themodel.getCurrentPlayer().getHand().getHand().set(0, oldcard2);
        this.themodel.getCurrentPlayer().getHand().getHand().set(1, oldcard1);

    }

    @FXML
    private void backToStart() {
        MultiPaneHolder root = MainPageController.getRoot();
        WritableImage wi = new WritableImage(1280, 720);
        Image img1 = root.getCurPane().snapshot(new SnapshotParameters(), wi);
        ImageView imgView1 = new ImageView(img1);
        wi = new WritableImage(1280, 720);
        Image img2 = root.getPane(MultiPaneHolder.GamePane.StartScreen).snapshot(new SnapshotParameters(), wi);
        ImageView imgView2 = new ImageView(img2);
        imgView1.setTranslateX(0);
        imgView2.setTranslateY(0);
        ((StackPane) root.getPane(MultiPaneHolder.GamePane.TransitionGroup)).getChildren().add(imgView2);
        ((StackPane) root.getPane(MultiPaneHolder.GamePane.TransitionGroup)).getChildren().add(imgView1);
        root.setDisplayPane(MultiPaneHolder.GamePane.TransitionGroup);
        Timeline timeline = new Timeline();
        KeyValue kv = new KeyValue(imgView1.translateYProperty(), -720, Interpolator.EASE_BOTH);
        KeyFrame kf = new KeyFrame(Duration.seconds(1), kv);
        timeline.getKeyFrames().add(kf);
        timeline.setOnFinished(t -> {
            root.setDisplayPane(MultiPaneHolder.GamePane.StartScreen);
        });
        timeline.play();
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

    @Override
    public void changed(ObservableValue<? extends Number> observable, Number oldValue, Number newValue) {
        this.textMoneyRaised.setText(Integer.toString((int) newValue.doubleValue()));
    }

}
