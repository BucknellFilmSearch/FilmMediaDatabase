/* *****************************************
 * CSCI205 - Software Engineering and Design
 * Spring 2015
 *
 * Name: Jiayu Huang, Zhengri Fan, Chengjunjie Ding
 * Date: April 22, 2015
 * Time: 5:30:00 PM
 *
 * Project: csci205
 * Package: CS205Final.Controller
 * File: Main Controller
 * Description:
 * The most importatn controller in our project, control the game logic.
 * ****************************************
 */
package Controller;

import TexasModel.AI;
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
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.control.TextField;
import javafx.scene.effect.DropShadow;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.image.WritableImage;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.StackPane;
import javafx.scene.text.Text;
import javafx.util.Duration;
import view.MultiPaneHolder;

/**
 * This class is the class that combined View & Controller initiating process.
 * Not very strict MVC but We made them seperately on our code logic to make V &
 * Model part not affect each other directly.
 *
 * @author Jiayu
 */
public class MainController implements Initializable, ChangeListener<Number> {

    private boolean Card1to2Drag = false;
    private boolean Card2to1Drag = false;

    private boolean inCard1 = false;
    private boolean inCard2 = false;

    private boolean Card1Re = false;
    private boolean Card2Re = false;

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
    private ImageView usrCard23;

    @FXML
    private ImageView usrCard22;

    @FXML
    private ImageView usrCard21;

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
    private Button btnBack;

    @FXML
    private Button btnAllIn;

    @FXML
    private Button btnNxtRound;

    @FXML
    private Button btnReset;
    // </editor-fold>

    @FXML
    /**
     * Handle the Button press by the users
     *
     * @see http://code.makery.ch/blog/javafx-dialogs-official/
     */
    private void handleButtonAction(ActionEvent event) throws SixCardHandException, FileNotFoundException, InterruptedException {
        try {
            if (event.getSource() == this.btnNxtRound) {
                closeRaiseChoices();
                this.reround();
                this.resetView();
            } else if (event.getSource() == this.btnReset) {
                closeRaiseChoices();
                this.reset();
                this.resetView();
            } else if (event.getSource() == this.btnAllIn) {
                closeRaiseChoices();
                this.themodel.getCurrentPlayer().allin();
                step();
                updateView();

            } else if (event.getSource() == this.btnCall) {
                closeRaiseChoices();
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
        } catch (NoMoneyException a) {
            Alert alert = new Alert(AlertType.ERROR);
            alert.setTitle("Error Dialog");
            alert.setHeaderText("You do not have enough money");
            alert.setContentText("You need more money");
            alert.showAndWait();
        }
    }

    /**
     * A step
     *
     * @throws NoMoneyException
     * @throws SixCardHandException
     * @throws FileNotFoundException
     * @throws InterruptedException
     */
    private void step() throws NoMoneyException, SixCardHandException, FileNotFoundException, InterruptedException {

        if (!this.themodel.isIsEnd()) {
            this.themodel.getPlayerChoice();
            updateView();
            if (getAIaction()) {
                ArrayList<Player> temp = new ArrayList<Player>();
                temp.add(this.themodel.getCurrentPlayer());
                temp.addAll(this.themodel.getPlayerthisRound());
                for (int i = 0; i < temp.size(); i++) {
                    if (temp.get(i) != this.themodel.getPlayers().get(0)) {
                        step();
                    }

                }
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

    private void updateView() throws NoMoneyException, SixCardHandException, FileNotFoundException {

        this.textPlayer1.setText(this.themodel.getPlayers().get(0).getName());
//        if (this.themodel.isIsEnd()) {
//            this.getBscBox().setDisable(true);
//        }
        this.textPlayer2.setText(this.themodel.getPlayers().get(1).getActionperformed());
        this.textPlayer3.setText(this.themodel.getPlayers().get(2).getActionperformed());
        this.textPlayer4.setText(this.themodel.getPlayers().get(3).getActionperformed());
        if (this.themodel.getCurrentPlayer() != this.themodel.getPlayers().get(0)) {
            this.btnCall.setDisable(true);
            this.btnFold.setDisable(true);
            this.btnRaise.setDisable(true);
            this.btnAllIn.setDisable(true);
        } else {
            this.btnCall.setDisable(false);
            this.btnFold.setDisable(false);
            this.btnRaise.setDisable(false);
            this.btnAllIn.setDisable(false);
        }
        this.usrCard1.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPlayers().get(0).getHand().getHand().get(0)))));
        this.usrCard2.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPlayers().get(0).getHand().getHand().get(1)))));

        this.textCurMoney.setText(Integer.toString((int) this.themodel.getPlayers().get(0).getMoney()));
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
            if (this.themodel.getPlayers().get(0).getHand().getHand().size() == 5) {
                this.cardsAfterWinning.setDisable(false);
                this.cardsAfterWinning.setOpacity(1.0);

                this.usrCard1.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPlayers().get(0).getHand().getHand().get(0)))));
                this.usrCard2.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPlayers().get(0).getHand().getHand().get(1)))));
                this.usrCard21.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPlayers().get(0).getHand().getHand().get(2)))));
                this.usrCard22.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPlayers().get(0).getHand().getHand().get(3)))));
                this.usrCard23.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPlayers().get(0).getHand().getHand().get(4)))));
            }
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

    private void reset() throws SixCardHandException, NoMoneyException, FileNotFoundException {
        AI dummyAI0 = new AI("0");
        AI dummyAI1 = new AI("1");
        AI dummyAI2 = new AI("2");
        ArrayList<Player> playerList = new ArrayList<>();
        playerList.add(new Player("new Player"));
        playerList.add(dummyAI0);
        playerList.add(dummyAI1);
        playerList.add(dummyAI2);
        this.themodel = new GameModel(0, playerList);
        this.themodel.giveCards();
        aiControl0 = new AIController2(themodel, dummyAI0);
        aiControl1 = new AIController2(themodel, dummyAI1);
        aiControl2 = new AIController2(themodel, dummyAI2);
        resetView();
        updateView();
        this.cardsAfterWinning.setOpacity(0);

    }

    private void resetView() {
        try {
            this.cmnCard1.setImage(new Image(new FileInputStream(GameUtil.cardPicBack())));
            this.cmnCard2.setImage(new Image(new FileInputStream(GameUtil.cardPicBack())));
            this.cmnCard3.setImage(new Image(new FileInputStream(GameUtil.cardPicBack())));
            this.cmnCard4.setImage(new Image(new FileInputStream(GameUtil.cardPicBack())));
            this.cmnCard5.setImage(new Image(new FileInputStream(GameUtil.cardPicBack())));
        } catch (FileNotFoundException ex) {
            Logger.getLogger(MainController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void reround() throws SixCardHandException, NoMoneyException, FileNotFoundException {
        if (this.themodel.isIsEnd()) {

            double money1 = this.themodel.getPlayers().get(0).getMoney();
            double money2 = this.themodel.getPlayers().get(1).getMoney();
            double money3 = this.themodel.getPlayers().get(2).getMoney();
            double money4 = this.themodel.getPlayers().get(3).getMoney();
            double pool = this.themodel.getMoneypool();
            resetView();
            AI dummyAI0 = new AI("0");
            AI dummyAI1 = new AI("1");
            AI dummyAI2 = new AI("2");
            ArrayList<Player> playerList = new ArrayList<>();
            playerList.add(new Player("new Player"));
            playerList.add(dummyAI0);
            playerList.add(dummyAI1);
            playerList.add(dummyAI2);
            this.themodel = new GameModel(pool, playerList);
            this.themodel.getPlayers().get(0).setMoney(money1);
            this.themodel.getPlayers().get(1).setMoney(money2);
            this.themodel.getPlayers().get(2).setMoney(money3);
            this.themodel.getPlayers().get(3).setMoney(money4);
            this.themodel.giveCards();
            aiControl0 = new AIController2(themodel, dummyAI0);
            aiControl1 = new AIController2(themodel, dummyAI1);
            aiControl2 = new AIController2(themodel, dummyAI2);

            updateView();
            this.cardsAfterWinning.setOpacity(0);

        }
    }

    private void closeRaiseChoices() {
        this.raiseGroup.setOpacity(0.0);
        this.raiseGroup.setDisable(true);
    }

    @FXML

    private void showBtnBack() {
        this.btnBack.setDisable(false);
        this.btnBack.setOpacity(1);
    }

    @FXML
    private void hideBtnBack() {
        this.btnBack.setDisable(true);
        this.btnBack.setOpacity(0);
    }

//    @FXML
//    private void card1to2Det(MouseEvent event) throws FileNotFoundException {
//        System.out.println("onDragDetected");
//
//        Dragboard db = this.usrCard1.startDragAndDrop(TransferMode.ANY);
//
//        db.setDragView(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getCurrentPlayer().getHand().getHand().get(0)))));
    @FXML
    private void card1to2Det(MouseEvent event) {
        //System.out.println("onDragDetected1");
        this.Card1to2Drag = true;
        event.consume();

    }

    @FXML
    private void card2to1Det(MouseEvent event) {
        //System.out.println("onDragDetected2");
        this.Card2to1Drag = true;
        event.consume();

    }

    @FXML
    private void Card1Released(MouseEvent event) throws FileNotFoundException {
        this.Card1Re = true;
    }

    @FXML
    private void Card2Released(MouseEvent event) throws FileNotFoundException {
        this.Card2Re = true;
    }

    @FXML
    private void highLightCard1(MouseEvent event) throws FileNotFoundException {
        DropShadow ds = new DropShadow();
        ImageView card = (ImageView) event.getSource();
        card.setEffect(ds);

        this.inCard1 = true;

        if (this.Card2to1Drag && this.inCard1 && this.Card2Re) {
            this.switchCard();
        }

        this.Card2to1Drag = false;
        this.Card2Re = false;
    }
//
//    @FXML
//    private void highLightNode(MouseEvent event) throws FileNotFoundException {
//        System.out.println("Entered");
////        Bloom bloom = new Bloom();
////        bloom.setThreshold(0.5);
//        ((Button) event.getSource()).setBackground(new Background());
//    }
//
//    @FXML
//    private void clearNodeEffect(MouseEvent event) {
//        ((Node) event.getSource()).setEffect(null);
//    }

    @FXML
    private void highLightCard2(MouseEvent event) throws FileNotFoundException {
        DropShadow ds = new DropShadow();
        ImageView card = (ImageView) event.getSource();
        card.setEffect(ds);

        this.inCard2 = true;

        if (this.Card1to2Drag && this.inCard2 && this.Card1Re) {
            this.switchCard();
        }

        this.Card1to2Drag = false;
        this.Card1Re = false;

    }

    @FXML
    private void clearCardEffect(MouseEvent event) {
        ImageView card = (ImageView) event.getSource();
        card.setEffect(null);
    }

    @FXML
    private void clearCardEffect1(MouseEvent event) {
        System.out.println("exit1");

        this.inCard1 = false;
        this.Card1Re = false;
        this.Card2to1Drag = false;
        this.Card2Re = false;
        ImageView card = (ImageView) event.getSource();
        card.setEffect(null);
    }

    @FXML
    private void clearCardEffect2(MouseEvent event) {
        System.out.println("exit2");

        this.inCard2 = false;
        this.Card1to2Drag = false;
        this.Card1Re = false;
        this.Card2Re = false;
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
            this.themodel = new GameModel(0, playerList);
            this.themodel.giveCards();
            aiControl0 = new AIController2(themodel, dummyAI0);
            aiControl1 = new AIController2(themodel, dummyAI1);
            aiControl2 = new AIController2(themodel, dummyAI2);
            updateView();
        } catch (SixCardHandException ex) {
            Logger.getLogger(MainController.class.getName()).log(Level.SEVERE, null, ex);
        } catch (NoMoneyException ex) {
            Logger.getLogger(MainController.class.getName()).log(Level.SEVERE, null, ex);
        } catch (FileNotFoundException ex) {
            Logger.getLogger(MainController.class.getName()).log(Level.SEVERE, null, ex);
        }
        this.sliderRaise.valueProperty().addListener(this);
        this.sliderRaise.setMin(0);
        this.sliderRaise.setBlockIncrement(1);

    }

    public void switchCard() throws FileNotFoundException {

        this.usrCard1.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPlayers().get(0).getHand().getHand().get(0)))));
        this.usrCard2.setImage(new Image(new FileInputStream(GameUtil.cardpic(this.themodel.getPlayers().get(0).getHand().getHand().get(1)))));

        Card oldcard1 = this.themodel.getPlayers().get(0).getHand().getHand().get(0);
        Card oldcard2 = this.themodel.getPlayers().get(0).getHand().getHand().get(1);

        this.themodel.getPlayers().get(0).getHand().getHand().set(0, oldcard2);
        this.themodel.getPlayers().get(0).getHand().getHand().set(1, oldcard1);

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
