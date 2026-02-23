<?php
use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;
use yii\helpers\ArrayHelper;
$this->title = "Nueva Muestra";
?>
<div class="muestra-create">
    <h1 class="text-center mb-4"><?= Html::encode($this->title) ?></h1>
    <?php $form = ActiveForm::begin(); ?>
    <div class="card mb-3"><div class="card-body">
        <?= $form->field($model, "vinedo_id")->dropDownList(ArrayHelper::map($vinedos, "id", "localidad"), ["prompt" => "Seleccionar Viñedo"]) ?>
        <?= $form->field($model, "variedad_uva") ?>
        <div class="row">
            <div class="col-6"><?= $form->field($model, "grados_brix") ?></div>
            <div class="col-6"><?= $form->field($model, "ph") ?></div>
        </div>
        <div class="row">
            <div class="col-6"><?= $form->field($model, "temperatura") ?></div>
            <div class="col-6"><?= $form->field($model, "peso_muestra") ?></div>
        </div>
        <?= $form->field($model, "observaciones")->textarea() ?>
    </div></div>
    <?= Html::submitButton("Guardar Muestra", ["class" => "btn btn-primary w-100 btn-lg"]) ?>
    <?php ActiveForm::end(); ?>
</div>