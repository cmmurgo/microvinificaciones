<?php namespace app\controllers;
use Yii;
use app\models\Muestra;
use app\models\Vinedo;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
class MuestraController extends Controller {
    public function actionIndex() {
        $muestras = Muestra::find()->where(["sort" => "-fecha_hora_muestreo"])->all();
        return $this->render("index", ["muestras" => $muestras]);
    }
    public function actionCreate() {
        $model = new Muestra();
        $model->setScenario(Muestra::SCENARIO_CREATE);
        if ($model->load(Yii::$app->request->post())) {
            $model->fecha_hora_muestreo = date("Y-m-d H:i:s");
            if ($model->save()) return $this->redirect(["view", "id" => $model->id]);
        }
        $vinedos = Vinedo::find()->all();
        return $this->render("create", ["model" => $model, "vinedos" => $vinedos]);
    }
    public function actionUpdate($id) {
        $model = $this->findModel($id);
        $model->setScenario(Muestra::SCENARIO_UPDATE);
        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(["view", "id" => $model->id]);
        }
        $vinedos = Vinedo::find()->all();
        return $this->render("update", ["model" => $model, "vinedos" => $vinedos]);
    }
    public function actionView($id) {
        return $this->render("view", ["model" => $this->findModel($id)]);
    }
    protected function findModel($id) {
        if (($model = Muestra::findOne($id)) !== null) return $model;
        throw new NotFoundHttpException("La página solicitada no existe.");
    }
}