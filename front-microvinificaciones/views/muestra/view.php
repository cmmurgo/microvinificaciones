<?php
use yii\bootstrap5\Html;
use yii\widgets\DetailView;
$this->title = "Detalle de Muestra #" . $model->id;
$this->params["breadcrumbs"][] = ["label" => "Muestras", "url" => ["index"]];
$this->params["breadcrumbs"][] = $this->title;
?>
<div class="muestra-view">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1><?= Html::encode($this->title) ?></h1>
        <p>
            <?= Html::a("Editar", ["update", "id" => $model->id], ["class" => "btn btn-primary"]) ?>
        </p>
    </div>

    <div class="card">
        <div class="card-body">
            <?= DetailView::widget([
                "model" => $model,
                "attributes" => [
                    [
                        "attribute" => "vinedo_id",
                        "label" => "Viñedo",
                        "value" => $model->vinedo->localidad ?? "N/A",
                    ],
                    "variedad_uva",
                    "grados_brix",
                    "ph",
                    "temperatura",
                    "peso_muestra",
                    "fecha_hora_muestreo",
                    "observaciones:ntext",
                ],
            ]) ?>
        </div>
    </div>
</div>