<?php
use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;
$this->title = "Editar Viñedo: " . $model->localidad;
$this->params["breadcrumbs"][] = ["label" => "Viñedos", "url" => ["index"]];
$this->params["breadcrumbs"][] = ["label" => $model->localidad, "url" => ["view", "id" => $model->id]];
$this->params["breadcrumbs"][] = "Editar";
?>
<div class="vinedo-update">
    <h1 class="text-center mb-4"><?= Html::encode($this->title) ?></h1>
    <?php $form = ActiveForm::begin(); ?>
    <div class="card mb-3"><div class="card-body">
        <?= $form->field($model, "sistema_conduccion") ?>
        <?= $form->field($model, "estado_sanitario") ?>
        <?= $form->field($model, "tipo_suelo") ?>
        <?= $form->field($model, "tipo_riego") ?>
        <?= $form->field($model, "provincia") ?>
        <?= $form->field($model, "localidad") ?>
        <div class="row">
            <div class="col-6"><?= $form->field($model, "latitud") ?></div>
            <div class="col-6"><?= $form->field($model, "longitud") ?></div>
        </div>
        <?= $form->field($model, "observaciones")->textarea() ?>
    </div></div>
    <?= Html::submitButton("Actualizar Viñedo", ["class" => "btn btn-primary w-100 btn-lg"]) ?>
    <?php ActiveForm::end(); ?>
</div>