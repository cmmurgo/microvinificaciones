<?php
use yii\bootstrap5\Html;
use yii\widgets\DetailView;
$this->title = $model->localidad;
$this->params["breadcrumbs"][] = ["label" => "Viñedos", "url" => ["index"]];
$this->params["breadcrumbs"][] = $this->title;
?>
<div class="vinedo-view">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1><?= Html::encode($this->title) ?></h1>
        <p>
            <?= Html::a("Editar", ["update", "id" => $model->id], ["class" => "btn btn-primary"]) ?>
            <?= Html::a("Nueva Muestra", ["muestra/create", "vinedo_id" => $model->id], ["class" => "btn btn-success"]) ?>
        </p>
    </div>

    <div class="card mb-4">
        <div class="card-body">
            <?= DetailView::widget([
                "model" => $model,
                "attributes" => [
                    "sistema_conduccion",
                    "estado_sanitario",
                    "tipo_suelo",
                    "tipo_riego",
                    "provincia",
                    "localidad",
                    "latitud",
                    "longitud",
                    "observaciones:ntext",
                ],
            ]) ?>
        </div>
    </div>

    <h3>Muestras</h3>
    <div class="card">
        <div class="card-body p-0">
            <table class="table table-striped mb-0">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Variedad</th>
                        <th>Brix</th>
                        <th>pH</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($model->muestras)): ?>
                        <tr><td colspan="5" class="text-center text-muted">No hay muestras registradas.</td></tr>
                    <?php else: ?>
                        <?php foreach ($model->muestras as $muestra): ?>
                            <tr>
                                <td><?= $muestra->fecha_hora_muestreo ?></td>
                                <td><?= Html::encode($muestra->variedad_uva) ?></td>
                                <td><?= $muestra->grados_brix ?></td>
                                <td><?= $muestra->ph ?></td>
                                <td><?= Html::a("Ver", ["muestra/view", "id" => $muestra->id], ["class" => "btn btn-sm btn-outline-primary"]) ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>