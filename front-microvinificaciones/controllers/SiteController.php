<?php namespace app\controllers;
use Yii;
use app\models\Vinedo;
use yii\web\Controller;
class SiteController extends Controller {
    public function actions() { return [ "error" => [ "class" => "yii\web\ErrorAction", ], ]; }
    public function actionIndex() {
        $vinedos = Vinedo::find()->where(["sort" => "-created_at"])->all();
        return $this->render("index", ["vinedos" => $vinedos]);
    }
    public function actionLogin() { return $this->render("login"); }
    public function actionLogout() { Yii::$app->user->logout(); return $this->goHome(); }
}