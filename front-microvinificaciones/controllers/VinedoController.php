<?php namespace app\controllers;
use Yii;
use app\models\Vinedo;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
class VinedoController extends Controller {
    public function actionIndex() {
        $vinedos = Vinedo::find()->where(["sort" => "-created_at"])->all();
        return $this->render("index", ["vinedos" => $vinedos]);
    }
    public function actionCreate() {
        $model = new Vinedo();
        $model->setScenario(Vinedo::SCENARIO_CREATE);
        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(["view", "id" => $model->id]);
        }
        return $this->render("create", ["model" => $model]);
    }
    public function actionUpdate($id) {
        $model = $this->findModel($id);
        $model->setScenario(Vinedo::SCENARIO_UPDATE);
        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(["view", "id" => $model->id]);
        }
        return $this->render("update", ["model" => $model]);
    }
    public function actionView($id) {
        return $this->render("view", ["model" => $this->findModel($id)]);
    }
    protected function findModel($id) {
        if (($model = Vinedo::findOne($id)) !== null) return $model;
        throw new NotFoundHttpException("La página solicitada no existe.");
    }
}